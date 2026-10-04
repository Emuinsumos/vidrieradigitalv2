import { useEffect, useState } from 'react'
import { CONFIG, PROYECTOS, PLANES, MAQUINAS, INSUMOS } from './data.js'

const wa = (t) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`
const $ = (n) => '$' + n.toLocaleString('es-AR')

function Escaparate() {
  const lista = PROYECTOS.filter((p) => p.demo)
  const [i, setI] = useState(0)
  const act = lista[i]
  return (
    <div className="esc">
      <div className="tel">
        <span className="notch" aria-hidden="true" />
        <div className="pantalla">
          <iframe key={act.demo} src={act.demo + '?embed'} title={'Demo de ' + act.n} loading="lazy" />
        </div>
      </div>
      <p className="esc-t">Es una web real. Tocá, scrolleá y probala.</p>
      <div className="esc-tabs" role="group" aria-label="Elegir demo">
        {lista.map((p, k) => (
          <button key={p.n} aria-pressed={k === i} onClick={() => setI(k)}>{p.e} {p.n}</button>
        ))}
      </div>
      <a className="esc-abrir" href={act.demo} target="_blank" rel="noopener">Abrir {act.n} en pantalla completa</a>
    </div>
  )
}

function Hero() {
  return (
    <header className="hero hero2">
      <div className="toldo" aria-hidden="true" />
      <div className="wrap">
        <nav>
          <a className="logo" href="#">vidriera<b>digital</b></a>
          <div>
            <a className="link" href="#demos">Demos</a>
            <a className="link" href="#premium">Para fábricas</a>
            <a className="link" href="#precios">Precios</a>
            <a className="link" href="#contacto">Contacto</a>
          </div>
        </nav>
        <div className="h2grid">
          <div>
            <span className="pill"><i /> Páginas web para comercios y fábricas</span>
            <h1>Tu negocio, abierto <span className="hl">las 24 horas.</span></h1>
            <p className="lead">Catálogos, tiendas y sistemas de gestión a medida, con tu logo y tus colores. No te lo contamos: mirá a la derecha, son webs reales funcionando.</p>
            <div className="btns">
              <a className="btn main" href={wa('Hola! Vi la vidriera y quiero una página para mi negocio.')} target="_blank" rel="noopener">Quiero la mía</a>
              <a className="btn ghost" href="#precios">Ver planes y precios</a>
            </div>
            <div className="stats">
              <div><strong>{PROYECTOS.length}</strong>webs funcionando</div>
              <div><strong>24/7</strong>tu negocio siempre abierto</div>
              <div><strong>A medida</strong>con tu marca</div>
            </div>
          </div>
          <Escaparate />
        </div>
      </div>
    </header>
  )
}

function Marquesina() {
  const t = ['Gastronomía', 'Mueblerías', 'Blanquerías', 'Almacenes', 'Distribuidoras', 'Candy bar', 'Fábricas', 'Marcas']
  const fila = [...t, ...t].map((x, k) => <span key={k}>{x} <b>✦</b></span>)
  return <div className="marq" aria-hidden="true"><div>{fila}{fila}</div></div>
}

function FlotanteWA() {
  return <a className="flota" href={wa('Hola! Quiero consultar por una página web.')} target="_blank" rel="noopener">Escribinos</a>
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.card,.step,section h2,.mod,.paso,.ba-col,.flu,.rol')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    els.forEach((el) => { el.classList.add('rv'); io.observe(el) })
    return () => io.disconnect()
  }, [])
}

function Demos() {
  const rubros = ['Todos', ...new Set(PROYECTOS.map((p) => p.c))]
  const [activo, setActivo] = useState('Todos')
  const lista = PROYECTOS.filter((p) => activo === 'Todos' || p.c === activo)
  return (
    <section id="demos">
      <div className="wrap">
        <h2>Mirá cómo quedan</h2>
        <p className="sub">Elegí un rubro y abrí la demo. Cada una se adapta a tu marca, tus productos y tu forma de vender.</p>
        <div className="filters" role="group" aria-label="Filtrar por rubro">
          {rubros.map((r) => (
            <button key={r} className="chip" aria-pressed={r === activo} onClick={() => setActivo(r)}>{r}</button>
          ))}
        </div>
        <div className="grid">
          {lista.map((p) => (
            <article className="card" key={p.n}>
              <div className="shot" style={{ background: p.bg }} aria-hidden="true">{p.e}</div>
              <div className="body">
                <span className="tag">{p.c}</span>
                <h3>{p.n}</h3>
                <p>{p.d}</p>
                <div className="tools">{p.t.map((x) => <span key={x}>{x}</span>)}</div>
                {p.demo
                  ? <a className="btn go" href={p.demo} target="_blank" rel="noopener">Ver demo</a>
                  : <span className="btn off">Demo próximamente</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SigDemo() {
  const [tab, setTab] = useState('prod')
  const [mi, setMi] = useState(0)
  const [stock, setStock] = useState(INSUMOS.map((i) => i.s))
  const m = MAQUINAS[mi]
  const max = Math.max(...m.pzs, 1)
  const cpkOk = m.cpk >= 1.33
  const entregar = (i) => setStock((s) => s.map((v, k) => (k === i && v > 0 ? v - 1 : v)))
  return (
    <div className="demo" aria-label="Demo del sistema con datos de ejemplo">
      <div className="demo-bar">
        <span>Sistema de Gestión Interna</span>
        <small>datos de ejemplo</small>
      </div>
      <div className="demo-tabs" role="tablist">
        {[['prod', 'Producción'], ['cal', 'Calidad'], ['pan', 'Pañol']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab !== 'pan' && (
        <div className="demo-maq">
          {MAQUINAS.map((x, i) => (
            <button key={x.n} aria-pressed={i === mi} onClick={() => setMi(i)}>{x.n}</button>
          ))}
        </div>
      )}
      {tab === 'prod' && (
        <div className="demo-body">
          <div className="big"><strong>{m.oee}%</strong><span>OEE del turno</span></div>
          <div className="bars" aria-label="Piezas por hora">
            {m.pzs.map((v, i) => (
              <div key={i} className="bar-col">
                <div className={'bar' + (v === 0 ? ' stop' : '')} style={{ height: v === 0 ? 6 : (v / max) * 100 + '%' }} />
                <small>{v === 0 ? 'parada' : v}</small>
              </div>
            ))}
          </div>
          <p className="hint">Las horas con parada no cuentan contra el rendimiento.</p>
        </div>
      )}
      {tab === 'cal' && (
        <div className="demo-body">
          <div className="big"><strong className={cpkOk ? 'ok' : 'bad'}>{m.cpk.toFixed(2)}</strong><span>Cpk histórico</span></div>
          <p className={'verdict ' + (cpkOk ? 'ok' : 'bad')}>{cpkOk ? 'Proceso capaz' : 'Proceso a revisar'}</p>
          <p className="hint">Cada pieza queda registrada con su número y se puede descargar el certificado en PDF.</p>
        </div>
      )}
      {tab === 'pan' && (
        <div className="demo-body">
          {INSUMOS.map((x, i) => (
            <div className="row" key={x.n}>
              <div>
                <b>{x.n}</b>
                <small className={stock[i] <= x.min ? 'bad' : ''}>
                  Stock {stock[i]} · mínimo {x.min}{stock[i] <= x.min ? ' · stock bajo' : ''}
                </small>
              </div>
              <button className="mini" onClick={() => entregar(i)} disabled={stock[i] === 0}>Entregar 1</button>
            </div>
          ))}
          <p className="hint">Al entregar un pedido, el stock se descuenta solo.</p>
        </div>
      )}
    </div>
  )
}

const IC = {
  prod: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  cal: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12l2.5 2.5L15.5 10',
  traz: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-5-5',
  rep: 'M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6',
  pan: 'M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10',
  man: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  des: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13',
  usr: 'M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1 M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M20 20v-1a4 4 0 0 0-3-3.9 M16 4.2a3.5 3.5 0 0 1 0 6.6',
}
const Ico = ({ k }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={IC[k]} /></svg>
)
const MODULOS = [
  ['prod', 'Producción y OEE', 'Piezas por hora, paradas y rendimiento por máquina y por turno, con reporte semanal descargable.'],
  ['cal', 'Calidad y Cpk', 'Planillas por pieza con tolerancias, gráfico de variación y Cpk histórico por máquina.'],
  ['traz', 'Trazabilidad', 'Buscá cualquier pieza por su número y mirá quién la midió, cuándo y con qué resultado.'],
  ['rep', 'Certificados en PDF', 'Certificado de calidad por pieza, listo para descargar y mandar a tu cliente.'],
  ['pan', 'Pañol y stock', 'Stock por insumo con mínimo y alerta, y descuento automático al entregar el pedido.'],
  ['man', 'Mantenimiento', 'Registro y seguimiento de mantenimiento por máquina, separado de producción.'],
  ['des', 'Descartes y scrap', 'Scrap, pendientes y fundición con número de pieza y motivo obligatorio.'],
  ['usr', 'Usuarios y permisos', 'Cada operario entra con su PIN y ve solo su área: pañol, producción, calidad o mantenimiento.'],
]
const ANTES = ['Planillas en papel que se pierden o llegan tarde', 'Cpk calculado a mano o en Excel', 'Pedidos al pañol por radio o en persona', 'No se sabe qué pieza se midió ni quién la midió', 'Paradas y descartes sin motivo registrado']
const DESPUES = ['Todo se carga desde el celular, en tiempo real', 'Cpk y gráficos de variación automáticos', 'Pedidos de pañol y stock con alerta de mínimo', 'Trazabilidad por número de pieza, con operario y fecha', 'Motivos obligatorios en paradas y descartes']
const PASOS = [
  ['Relevamiento', 'Vemos tus máquinas, piezas, turnos y cómo trabajás hoy.'],
  ['Configuración', 'Cargamos tus máquinas, plantillas de calidad, insumos y operarios.'],
  ['Capacitación', 'Enseñamos al equipo a usarlo desde el celular, en el piso de planta.'],
  ['Puesta en marcha', 'Arrancamos y ajustamos sobre la marcha con lo que vaya surgiendo.'],
]
const FAQ = [
  ['¿Hay que instalar algo?', 'No. Se usa desde el navegador del celular, la tablet o la PC.'],
  ['¿Se adapta a mi planta?', 'Sí. Cargamos tus máquinas, piezas y operarios, y lo que falte se desarrolla a medida.'],
  ['¿Mis datos quedan separados de otras empresas?', 'Sí. Cada empresa tiene su propio espacio de datos, separado del resto.'],
  ['¿Qué pasa después de la puesta en marcha?', 'Seguís con el abono mensual, que incluye soporte y mejoras.'],
]

const TURNOS = ['Mañana', 'Tarde', 'Noche']
const ESTADO = { prod: 'En producción', parada: 'Detenida', mant: 'En mantenimiento' }
function armarPlanta(t) {
  return Array.from({ length: 20 }, (_, i) => {
    const v = (i * 37 + t * 11) % 100
    const estado = v < 8 ? 'parada' : v < 14 ? 'mant' : 'prod'
    const prod = estado === 'prod'
    return { n: 'CNC ' + String(i + 1).padStart(2, '0'), estado, oee: prod ? 62 + ((i * 13 + t * 7) % 34) : 0, pzs: prod ? 280 + ((i * 53 + t * 29) % 260) : 0, cpk: 1.28 + ((i * 17 + t * 5) % 90) / 100 }
  })
}

function Planta() {
  const [t, setT] = useState(0)
  const [sel, setSel] = useState(0)
  const ms = armarPlanta(t)
  const m = ms[sel]
  const enProd = ms.filter((x) => x.estado === 'prod')
  const oee = Math.round(enProd.reduce((a, x) => a + x.oee, 0) / (enProd.length || 1))
  const pzs = ms.reduce((a, x) => a + x.pzs, 0)
  const cpk = (ms.reduce((a, x) => a + x.cpk, 0) / ms.length).toFixed(2)
  const alertas = [
    ...ms.filter((x) => x.estado === 'parada').map((x) => [x.n + ' detenida', 'bad']),
    ...enProd.filter((x) => x.cpk < 1.33).map((x) => [x.n + ': Cpk ' + x.cpk.toFixed(2) + ', por debajo de 1,33', 'warn']),
    ['Pañol: inserto CNMG 120408 bajo el mínimo', 'warn'],
  ].slice(0, 5)
  return (
    <div className="wrap">
      <div className="tab">
        <div className="tab-top">
          <div><h3>Tablero de planta</h3><small>Datos de ejemplo · tocá una máquina</small></div>
          <div className="turnos" role="group" aria-label="Turno">
            {TURNOS.map((x, k) => (<button key={x} aria-pressed={k === t} onClick={() => setT(k)}>{x}</button>))}
          </div>
        </div>
        <div className="kpis">
          <div><strong>{oee}%</strong>OEE de planta</div>
          <div><strong>{pzs.toLocaleString('es-AR')}</strong>piezas del turno</div>
          <div><strong>{enProd.length}/20</strong>máquinas produciendo</div>
          <div><strong>{cpk.replace('.', ',')}</strong>Cpk promedio</div>
        </div>
        <div className="tab-grid">
          <div className="maqs">
            {ms.map((x, i) => (
              <button key={x.n} className={'mq ' + x.estado} aria-pressed={i === sel} onClick={() => setSel(i)}>
                <b>{x.n}</b><span>{x.estado === 'prod' ? x.oee + '%' : x.estado === 'parada' ? 'Parada' : 'Mant.'}</span>
              </button>
            ))}
          </div>
          <div className="tab-side">
            <div className="det">
              <h4>{m.n}</h4>
              <span className={'est ' + m.estado}>{ESTADO[m.estado]}</span>
              <dl><div><dt>OEE</dt><dd>{m.estado === 'prod' ? m.oee + '%' : '—'}</dd></div><div><dt>Piezas</dt><dd>{m.pzs || '—'}</dd></div><div><dt>Cpk</dt><dd className={m.cpk < 1.33 ? 'bad' : 'ok'}>{m.cpk.toFixed(2).replace('.', ',')}</dd></div></dl>
            </div>
            <div className="alertas"><h4>Alertas</h4>{alertas.map(([x, c]) => (<p key={x} className={c}>{x}</p>))}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FLUJO = [
  ['El operario carga', 'Piezas, mediciones y pedidos de pañol, desde el celular y en su máquina.'],
  ['El sistema calcula', 'OEE, Cpk, stock y alertas, al instante y sin planillas.'],
  ['Cada área ve lo suyo', 'Calidad, pañol y mantenimiento entran con su propio acceso.'],
  ['Gerencia decide', 'Tablero de planta, reportes semanales y trazabilidad por pieza.'],
]
const ROLES = [
  ['Operario', 'Carga piezas, mediciones y pedidos al pañol desde su máquina.'],
  ['Calidad', 'Arma plantillas, revisa planillas, controla el Cpk y emite certificados.'],
  ['Pañol', 'Atiende pedidos y controla el stock con alertas de mínimo.'],
  ['Mantenimiento', 'Registra y sigue el mantenimiento de cada máquina.'],
  ['Gerencia', 'Ve el tablero de planta, los reportes y la trazabilidad completa.'],
]
function Roles() {
  return (
    <section id="roles">
      <div className="wrap">
        <h2>Una herramienta para cada rol</h2>
        <p className="sub">La información circula sola, de la máquina a la gerencia, y cada persona ve lo que necesita.</p>
        <div className="flujo">
          {FLUJO.map(([t, d], k) => (<div className="flu" key={t}><span>{k + 1}</span><h3>{t}</h3><p>{d}</p></div>))}
        </div>
        <div className="roles">
          {ROLES.map(([t, d]) => (<article className="rol" key={t}><h3>{t}</h3><p>{d}</p></article>))}
        </div>
      </div>
    </section>
  )
}

function Premium() {
  const pack = PLANES.find((x) => x.id === 'empresas')
  const consulta = wa('Hola! Me interesa el Sistema de Gestión Interna para mi fábrica. Quiero una demo guiada.')
  return (
    <>
      <section id="premium" className="dark">
        <div className="wrap prem">
          <div>
            <span className="badge">Línea premium para fábricas</span>
            <h2>Sistema de Gestión Interna</h2>
            <p className="sub">Controlá producción, calidad, pañol y mantenimiento de tu planta desde el celular, sin papeles ni planillas sueltas. Nació en una planta metalmecánica real y se usa en el piso de planta todos los días.</p>
            <div className="emp-prueba">
              <div><strong>20</strong>máquinas</div>
              <div><strong>3</strong>turnos por día</div>
              <div><strong>8</strong>módulos integrados</div>
            </div>
            <div className="btns">
              <a className="btn main" href={consulta} target="_blank" rel="noopener">Pedir demo guiada</a>
              <a className="btn ghost" href="#precios">Ver Pack empresas</a>
            </div>
          </div>
          <div>
            <p className="demo-intro">Probalo acá mismo: cambiá de máquina, de pestaña y entregá un insumo.</p>
            <SigDemo />
          </div>
        </div>
        <Planta />
      </section>

      <section id="modulos" className="alt">
        <div className="wrap">
          <h2>Todo lo que controla tu planta</h2>
          <p className="sub">Ocho módulos que trabajan juntos y comparten los mismos datos.</p>
          <div className="mods">
            {MODULOS.map(([k, t, d]) => (
              <article className="mod" key={k}><span className="mod-ic"><Ico k={k} /></span><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
          <div className="ba">
            <div className="ba-col antes"><h3>Hoy, con papel y Excel</h3><ul>{ANTES.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="ba-col despues"><h3>Con el sistema</h3><ul>{DESPUES.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <Roles />

      <section id="implementacion" className="dark">
        <div className="wrap">
          <h2>Cómo lo ponemos en marcha</h2>
          <div className="pasos">
            {PASOS.map(([t, d]) => (<div className="paso" key={t}><h3>{t}</h3><p>{d}</p></div>))}
          </div>
          <div className="faq">
            {FAQ.map(([q, r]) => (<details key={q}><summary>{q}</summary><p>{r}</p></details>))}
          </div>
          <div className="emp-cta">
            <div>
              <h3>Pack empresas</h3>
              <p>Lanzamiento {$(pack.lanzamiento)} + {$(pack.mensual)}/mes. Incluye tu web, el sistema de gestión y soporte prioritario.</p>
            </div>
            <a className="btn main" href={consulta} target="_blank" rel="noopener">Pedir demo guiada</a>
          </div>
        </div>
      </section>
    </>
  )
}

function IconoPlanes() {
  return (
    <svg className="precios-icono" viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true">
      <g stroke="#ff6b57" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 24 L13 10 H51 L56 24 Z" />
        <path d="M8 24 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0" />
        <path d="M13 31 V54 H51 V31" />
        <circle cx="32" cy="42" r="4.2" />
        <circle cx="32" cy="42" r="8" strokeWidth="3.4" strokeDasharray="3.1 3.14" />
      </g>
    </svg>
  )
}

function Precios() {
  return (
    <section id="precios" className="precios">
      <div className="wrap">
        <header className="precios-head">
          <IconoPlanes />
          <h2>Planes y precios</h2>
          <p className="sub">Un costo de lanzamiento (en la básica no hay) y un abono mensual. Precios en pesos argentinos.</p>
        </header>
        <div className="plans">
          {PLANES.map((p) => (
            <article key={p.id} className={'plan' + (p.destacado ? ' feat' : '')}>
              {p.destacado && <span className="placa">El más elegido</span>}
              <h3>{p.nombre}</h3>
              <p className="tag">{p.para}</p>
              <div className="price">
                <strong>{$(p.mensual)}</strong><span>/mes</span>
              </div>
              <p className="launch">{p.lanzamiento === 0 ? 'Sin costo de lanzamiento' : `Lanzamiento ${$(p.lanzamiento)} (pago único)`}</p>
              <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={'btn ' + (p.destacado ? 'main' : 'go')} href={wa(`Hola! Me interesa el plan ${p.nombre}.`)} target="_blank" rel="noopener">Elegir este plan</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pasos() {
  const s = [
    ['Nos contás tu negocio', 'Rubro, productos y cómo vendés hoy.'],
    ['Armamos tu demo', 'La ves funcionando con tu logo antes de decidir.'],
    ['Ajustamos y publicamos', 'Corregimos lo que haga falta y sale al aire.'],
    ['Te acompañamos', 'Cambios y mejoras cuando las necesites.'],
  ]
  return (
    <section className="alt">
      <div className="wrap">
        <h2>Cómo trabajamos</h2>
        <div className="steps">
          {s.map(([t, d]) => (<div className="step" key={t}><h3>{t}</h3><p>{d}</p></div>))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Hero />
      <Marquesina />
      <Demos />
      <Premium />
      <Precios />
      <Pasos />
      <footer id="contacto">
        <div className="wrap">
          <h2>¿Charlamos sobre tu proyecto?</h2>
          <p>Escribinos y te respondemos con una propuesta.</p>
          <div className="btns">
            <a className="btn main" href={wa('Hola! Quiero consultar por una página web.')} target="_blank" rel="noopener">Escribir por WhatsApp</a>
            <a className="btn ghost" href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener">Ver Instagram</a>
          </div>
          <small>© {new Date().getFullYear()} Vidriera Digital</small>
        </div>
      </footer>
      <FlotanteWA />
    </>
  )
}
