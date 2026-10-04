import { useEffect, useState } from 'react'
import { eliminarConsulta, escucharConsultas, marcarLeida } from '../services/consultas.js'
import { waLink } from '../config/site.js'
export default function PrivateContact({ onLogout }) {
  const [items, setItems] = useState([])
  const [dir, setDir] = useState('desc')
  const [open, setOpen] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => escucharConsultas(dir, setItems, () => setError('No se pudieron cargar los mensajes.')), [dir])
  const fecha = (m) => (m.fecha?.toDate ? m.fecha.toDate().toLocaleString('es-AR') : '—')
  const borrar = (id) => window.confirm('¿Eliminar este mensaje?') && eliminarConsulta(id)
  return (
    <main className="max-w-3xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="font-display text-3xl font-bold">Mensajes recibidos</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline !py-2" onClick={() => setDir(dir === 'desc' ? 'asc' : 'desc')}>{dir === 'desc' ? 'Más nuevos' : 'Más viejos'}</button>
          <button className="btn btn-outline !py-2" onClick={onLogout}>Salir</button>
        </div>
      </div>
      {error && <p className="mt-4 text-acento">{error}</p>}
      {!items.length && !error && <p className="mt-10 text-center text-cafe/60">Todavía no hay mensajes.</p>}
      <div className="mt-6 space-y-4">
        {items.map((m) => (
          <article key={m.id} className="bg-white rounded-2xl shadow p-5">
            <div className="flex justify-between gap-2">
              <h2 className="font-bold text-lg">{m.nombre}</h2>
              <span className="text-sm whitespace-nowrap">{m.leido ? '⚪ Leído' : '🟢 Nuevo'}</span>
            </div>
            <p className="text-sm text-cafe/70">{m.empresa || 'Sin empresa'} · {m.telefono} · {m.email}</p>
            <p className="text-sm text-cafe/50">{fecha(m)}</p>
            <p className={`mt-3 ${open === m.id ? '' : 'line-clamp-2'}`}>{m.mensaje}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn btn-outline !py-2 !px-4 text-sm" onClick={() => setOpen(open === m.id ? null : m.id)}>{open === m.id ? 'Ver menos' : 'Ver completo'}</button>
              {!m.leido && <button className="btn btn-outline !py-2 !px-4 text-sm" onClick={() => marcarLeida(m.id)}>Marcar como leído</button>}
              <a className="btn btn-primary !py-2 !px-4 text-sm" target="_blank" rel="noreferrer" href={waLink(m.telefono, `Hola ${m.nombre}, te escribimos de Delmana por tu consulta.`)}>Abrir WhatsApp</a>
              <button className="btn !py-2 !px-4 text-sm text-acento" onClick={() => borrar(m.id)}>Eliminar</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
