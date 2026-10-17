import { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { onValue, push, ref, remove, update } from 'firebase/database'
import { auth, db } from '../firebase.js'
import './admin.css'

const RAIZ = 'vitrinaClientes/clientes'
const PLANES = ['Básica', 'Premium', 'Pack empresas', 'Otro']
const ESTADOS = ['activo', 'demo', 'pausado']
const VACIO = { nombre: '', sitio: '', numero: '', cobro: '', monto: '', plan: 'Básica', estado: 'activo', firebase: '', repo: '', notas: '' }

const pad = (n) => String(n).padStart(2, '0')
const aISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const deISO = (s) => {
  const [y, m, d] = (s || '').split('-').map(Number)
  return y ? new Date(y, m - 1, d) : null
}
const hoy = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
const diasHasta = (iso) => {
  const d = deISO(iso)
  return d ? Math.round((d - hoy()) / 864e5) : null
}
const sumarMes = (iso) => {
  const d = deISO(iso) || hoy()
  const dia = d.getDate()
  const r = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  const ultimo = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate()
  r.setDate(Math.min(dia, ultimo))
  return aISO(r)
}
const fechaCorta = (iso) => {
  const d = deISO(iso)
  return d ? d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Sin fecha'
}
const plata = (n) => (n ? '$' + Number(n).toLocaleString('es-AR') : '—')

// Número argentino → formato wa.me (54 9 + área + número). Cargalo con código de área y sin 15.
const numWA = (n) => {
  let d = String(n || '').replace(/\D/g, '').replace(/^0+/, '')
  if (!d) return ''
  if (d.startsWith('54')) return d
  return '549' + d
}
const semaforo = (c) => {
  if (c.estado === 'pausado') return { k: 'gris', t: 'Pausado' }
  const d = diasHasta(c.cobro)
  if (d === null) return { k: 'gris', t: 'Sin fecha' }
  if (d < 0) return { k: 'rojo', t: `Vencido hace ${-d} d` }
  if (d === 0) return { k: 'rojo', t: 'Cobra hoy' }
  if (d <= 7) return { k: 'amarillo', t: `En ${d} d` }
  return { k: 'verde', t: `En ${d} d` }
}

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [cargando, setCargando] = useState(false)
  const entrar = async (e) => {
    e.preventDefault()
    setErr('')
    setCargando(true)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass)
    } catch {
      setErr('Usuario o contraseña incorrectos.')
    }
    setCargando(false)
  }
  return (
    <div className="adm adm-login">
      <form onSubmit={entrar} className="adm-caja">
        <h1>Panel de clientes</h1>
        <p>Acceso privado</p>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" required />
        {err && <small className="adm-err">{err}</small>}
        <button className="adm-btn main" disabled={cargando}>{cargando ? 'Entrando…' : 'Entrar'}</button>
        <a href="#/" className="adm-volver">← Volver a la web</a>
      </form>
    </div>
  )
}

function Formulario({ inicial, onGuardar, onCancelar }) {
  const [f, setF] = useState({ ...VACIO, ...inicial })
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))
  const enviar = (e) => {
    e.preventDefault()
    onGuardar({ ...f, monto: f.monto === '' ? '' : Number(f.monto) })
  }
  return (
    <div className="adm-modal" onClick={onCancelar}>
      <form className="adm-form" onClick={(e) => e.stopPropagation()} onSubmit={enviar}>
        <h2>{inicial?.id ? 'Editar cliente' : 'Nuevo cliente'}</h2>
        <label>Nombre del cliente<input value={f.nombre} onChange={set('nombre')} required /></label>
        <label>Sitio de la página<input value={f.sitio} onChange={set('sitio')} placeholder="https://cliente.vercel.app" /></label>
        <label>Número (con código de área, sin 0 ni 15)<input value={f.numero} onChange={set('numero')} inputMode="tel" placeholder="1112345678" /></label>
        <div className="adm-fila">
          <label>Próximo cobro<input type="date" value={f.cobro} onChange={set('cobro')} /></label>
          <label>Monto mensual<input type="number" min="0" value={f.monto} onChange={set('monto')} placeholder="25000" /></label>
        </div>
        <div className="adm-fila">
          <label>Plan<select value={f.plan} onChange={set('plan')}>{PLANES.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label>Estado<select value={f.estado} onChange={set('estado')}>{ESTADOS.map((p) => <option key={p}>{p}</option>)}</select></label>
        </div>
        <label>Firebase donde está alojado<input value={f.firebase} onChange={set('firebase')} placeholder="chino-a425c · prefijo vrb/" /></label>
        <label>Repo de GitHub<input value={f.repo} onChange={set('repo')} placeholder="Emuinsumos/vrb" /></label>
        <label>Notas<textarea rows="3" value={f.notas} onChange={set('notas')} /></label>
        <div className="adm-acciones">
          <button type="button" className="adm-btn" onClick={onCancelar}>Cancelar</button>
          <button className="adm-btn main">Guardar</button>
        </div>
      </form>
    </div>
  )
}

function Panel({ user }) {
  const [datos, setDatos] = useState(null)
  const [editando, setEditando] = useState(null)
  const [filtro, setFiltro] = useState('todos')
  const [q, setQ] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const off = onValue(
      ref(db, RAIZ),
      (s) => setDatos(s.val() || {}),
      () => setError('No se pudo leer la base. Revisá las reglas de Firebase y que tu email esté autorizado.')
    )
    return off
  }, [])

  const lista = useMemo(() => {
    const arr = Object.entries(datos || {}).map(([id, c]) => ({ ...c, id }))
    arr.sort((a, b) => (a.cobro || '9999').localeCompare(b.cobro || '9999'))
    return arr
  }, [datos])

  const resumen = useMemo(() => {
    const r = { vencidos: 0, semana: 0, activos: 0, mensual: 0 }
    lista.forEach((c) => {
      if (c.estado === 'activo') {
        r.activos++
        r.mensual += Number(c.monto) || 0
      }
      const s = semaforo(c).k
      if (s === 'rojo') r.vencidos++
      if (s === 'amarillo') r.semana++
    })
    return r
  }, [lista])

  const visibles = lista.filter((c) => {
    const s = semaforo(c).k
    const okF = filtro === 'todos' || (filtro === 'urgentes' ? s === 'rojo' || s === 'amarillo' : c.estado === filtro)
    const t = q.trim().toLowerCase()
    const okQ = !t || [c.nombre, c.sitio, c.firebase, c.repo].some((x) => (x || '').toLowerCase().includes(t))
    return okF && okQ
  })

  const guardar = async (f) => {
    const { id, ...resto } = f
    try {
      if (id) await update(ref(db, `${RAIZ}/${id}`), resto)
      else await push(ref(db, RAIZ), resto)
      setEditando(null)
    } catch {
      setError('No se pudo guardar. Revisá las reglas de Firebase.')
    }
  }
  const borrar = async (c) => {
    if (!window.confirm(`¿Borrar a ${c.nombre}? No se puede deshacer.`)) return
    await remove(ref(db, `${RAIZ}/${c.id}`))
  }
  const pagado = async (c) => {
    if (!window.confirm(`¿Marcar pagado a ${c.nombre}? El próximo cobro pasa al ${fechaCorta(sumarMes(c.cobro))}.`)) return
    await push(ref(db, `${RAIZ}/${c.id}/pagos`), { fecha: aISO(hoy()), monto: Number(c.monto) || 0, periodo: c.cobro || '' })
    await update(ref(db, `${RAIZ}/${c.id}`), { cobro: sumarMes(c.cobro) })
  }
  const cobrarWA = (c) => {
    const msg = `Hola ${c.nombre}! Te escribo de Vidriera Digital. Te recuerdo que el ${fechaCorta(c.cobro)} vence el servicio mensual de tu página${c.monto ? ' (' + plata(c.monto) + ')' : ''}. Cualquier duda me avisás. ¡Gracias!`
    window.open(`https://wa.me/${numWA(c.numero)}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <div className="adm">
      <header className="adm-top">
        <div>
          <h1>Clientes</h1>
          <small>{user.email}</small>
        </div>
        <div className="adm-acciones">
          <a className="adm-btn" href="#/">Ver web</a>
          <button className="adm-btn" onClick={() => signOut(auth)}>Salir</button>
        </div>
      </header>

      {error && <p className="adm-aviso rojo">{error}</p>}
      {(resumen.vencidos > 0 || resumen.semana > 0) && (
        <p className={'adm-aviso ' + (resumen.vencidos ? 'rojo' : 'amarillo')}>
          {resumen.vencidos > 0 && <b>{resumen.vencidos} vencido{resumen.vencidos > 1 ? 's' : ''}</b>}
          {resumen.vencidos > 0 && resumen.semana > 0 && ' · '}
          {resumen.semana > 0 && <b>{resumen.semana} vence{resumen.semana > 1 ? 'n' : ''} esta semana</b>}
        </p>
      )}

      <div className="adm-kpis">
        <div><strong>{resumen.activos}</strong>activos</div>
        <div><strong>{plata(resumen.mensual)}</strong>por mes</div>
        <div><strong>{lista.length}</strong>en total</div>
      </div>

      <div className="adm-barra">
        <input placeholder="Buscar cliente, sitio o firebase…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="adm-btn main" onClick={() => setEditando({})}>+ Nuevo</button>
      </div>
      <div className="adm-filtros">
        {['todos', 'urgentes', ...ESTADOS].map((x) => (
          <button key={x} aria-pressed={filtro === x} onClick={() => setFiltro(x)}>{x}</button>
        ))}
      </div>

      {datos === null && !error && <p className="adm-vacio">Cargando…</p>}
      {datos && visibles.length === 0 && <p className="adm-vacio">{lista.length ? 'Nada con ese filtro.' : 'Todavía no cargaste clientes. Tocá "+ Nuevo".'}</p>}

      <div className="adm-lista">
        {visibles.map((c) => {
          const s = semaforo(c)
          const pagos = Object.values(c.pagos || {}).sort((a, b) => b.fecha.localeCompare(a.fecha))
          return (
            <article key={c.id} className={'adm-card ' + s.k}>
              <div className="adm-card-top">
                <div>
                  <h3>{c.nombre}</h3>
                  <span className="adm-meta">{c.plan} · {c.estado}</span>
                </div>
                <span className={'adm-sem ' + s.k}>{s.t}</span>
              </div>
              <dl>
                <div><dt>Cobro</dt><dd>{fechaCorta(c.cobro)} · {plata(c.monto)}</dd></div>
                <div><dt>Sitio</dt><dd>{c.sitio ? <a href={c.sitio} target="_blank" rel="noopener">{c.sitio.replace(/^https?:\/\//, '')}</a> : '—'}</dd></div>
                <div><dt>Número</dt><dd>{c.numero || '—'}</dd></div>
                <div><dt>Firebase</dt><dd>{c.firebase || '—'}</dd></div>
                {c.repo && <div><dt>Repo</dt><dd>{c.repo}</dd></div>}
                {c.notas && <div><dt>Notas</dt><dd>{c.notas}</dd></div>}
                {pagos.length > 0 && <div><dt>Último pago</dt><dd>{fechaCorta(pagos[0].fecha)} · {plata(pagos[0].monto)} ({pagos.length} en total)</dd></div>}
              </dl>
              <div className="adm-acciones">
                <button className="adm-btn main" onClick={() => pagado(c)}>Marcar pagado</button>
                <button className="adm-btn" onClick={() => cobrarWA(c)} disabled={!c.numero}>Cobrar por WhatsApp</button>
                <button className="adm-btn" onClick={() => setEditando(c)}>Editar</button>
                <button className="adm-btn peligro" onClick={() => borrar(c)}>Borrar</button>
              </div>
            </article>
          )
        })}
      </div>

      {editando && <Formulario inicial={editando} onGuardar={guardar} onCancelar={() => setEditando(null)} />}
    </div>
  )
}

export default function Clientes() {
  const [user, setUser] = useState(undefined)
  useEffect(() => onAuthStateChanged(auth, setUser), [])
  if (user === undefined) return <div className="adm"><p className="adm-vacio">Cargando…</p></div>
  return user ? <Panel user={user} /> : <Login />
}
