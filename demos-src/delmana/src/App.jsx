import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Contacto from './pages/Contacto.jsx'
import { PIN_DEMO } from './hooks/useAuth.js'
import { reiniciar } from './services/consultas.js'

const esPanel = () => window.location.hash === '#/contacto'

function DemoBar({ panel }) {
  if (window.top !== window.self) return null
  const btn = { background: '#c8102e', color: '#fff', border: 0, borderRadius: 999, padding: '5px 12px', font: '600 12px system-ui', cursor: 'pointer', textDecoration: 'none' }
  return (
    <div style={{ position: 'fixed', left: '50%', bottom: 12, transform: 'translateX(-50%)', zIndex: 99999, background: '#10234a', color: '#fff', font: '500 13px system-ui,sans-serif', padding: '9px 14px', borderRadius: 999, display: 'flex', gap: 10, alignItems: 'center', boxShadow: '0 6px 24px #0006', maxWidth: '94vw', flexWrap: 'wrap', justifyContent: 'center' }}>
      <span>Demo con datos de ejemplo{panel ? ` · PIN: ${PIN_DEMO}` : ''}</span>
      {panel
        ? <a href="#/" style={btn}>Ver la web</a>
        : <a href="#/contacto" style={btn}>Ver panel de mensajes</a>}
      <button style={{ ...btn, background: '#3a4f7a' }} onClick={() => { reiniciar(); try { localStorage.removeItem('demo:delmana:auth') } catch {} window.location.hash = '#/'; window.location.reload() }}>Reiniciar</button>
      <a href="../../" style={{ color: '#cfe0ff', fontSize: 12 }}>Volver a la vitrina</a>
    </div>
  )
}

export default function App() {
  const [panel, setPanel] = useState(esPanel())
  useEffect(() => {
    const f = () => setPanel(esPanel())
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return (<>{panel ? <Contacto /> : <Home />}<DemoBar panel={panel} /></>)
}
