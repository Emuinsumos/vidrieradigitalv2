// Revisa fechas de cobro en Firebase y avisa por ntfy. Corre en GitHub Actions.
// Secrets necesarios: NTFY_TOPIC, ADMIN_EMAIL, ADMIN_PASSWORD, FIREBASE_API_KEY
const DB_URL = 'https://chino-a425c-default-rtdb.firebaseio.com'
const ADMIN_URL = 'https://tuvidrieradigital.vercel.app/#/admin'
const AVISAR_EN = [3, 1, 0] // días antes del cobro (0 = hoy). Los vencidos avisan todos los días.

const hoyAR = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' })
const utc = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

async function tokenAdmin() {
  const r = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, returnSecureToken: true }),
    }
  )
  const j = await r.json()
  if (!r.ok) throw new Error('Login Firebase falló: ' + (j.error?.message || r.status))
  return j.idToken
}

async function avisar(titulo, mensaje, prioridad, tags) {
  const r = await fetch('https://ntfy.sh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: process.env.NTFY_TOPIC, title: titulo, message: mensaje, priority: prioridad, tags, click: ADMIN_URL }),
  })
  if (!r.ok) throw new Error('ntfy falló: ' + r.status)
}

async function main() {
  if (process.env.TEST === 'true') {
    await avisar('Prueba de alertas', 'Si ves esto, ntfy funciona.', 3, ['white_check_mark'])
    console.log('Prueba enviada')
    return
  }

  const token = await tokenAdmin()
  const r = await fetch(`${DB_URL}/vitrinaClientes/clientes.json?auth=${token}`)
  if (!r.ok) throw new Error('Lectura de la base falló: ' + r.status)
  const datos = (await r.json()) || {}

  const hoy = utc(hoyAR())
  const vencidos = []
  const proximos = []
  for (const c of Object.values(datos)) {
    if (c.estado !== 'activo' || !c.cobro) continue
    const dias = Math.round((utc(c.cobro) - hoy) / 864e5)
    if (dias < 0) vencidos.push(`${c.nombre} (hace ${-dias} d)`)
    else if (AVISAR_EN.includes(dias)) proximos.push(dias === 0 ? `${c.nombre} (hoy)` : `${c.nombre} (en ${dias} d)`)
  }

  if (!vencidos.length && !proximos.length) {
    console.log('Nada para avisar hoy')
    return
  }
  const lineas = []
  if (vencidos.length) lineas.push('Vencidos: ' + vencidos.join(', '))
  if (proximos.length) lineas.push('Por cobrar: ' + proximos.join(', '))
  await avisar(vencidos.length ? 'Cobros vencidos' : 'Se acercan cobros', lineas.join('\n'), vencidos.length ? 4 : 3, vencidos.length ? ['rotating_light'] : ['moneybag'])
  console.log('Aviso enviado:', lineas.join(' | '))
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
