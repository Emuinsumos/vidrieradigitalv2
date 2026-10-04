import { useState } from 'react'
import { enviarConsulta } from '../services/consultas.js'
const empty = { nombre: '', empresa: '', telefono: '', email: '', mensaje: '' }
const inp = 'w-full rounded-xl border border-trigo bg-white px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-acento'
export default function ContactForm() {
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  const [status, setStatus] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const validar = () => {
    const e = {}
    if (f.nombre.trim().length < 2) e.nombre = 'Ingresá tu nombre.'
    if (f.telefono.replace(/\D/g, '').length < 8) e.telefono = 'Ingresá un teléfono válido.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Ingresá un email válido.'
    if (f.mensaje.trim().length < 5) e.mensaje = 'Escribí tu consulta.'
    return e
  }
  const submit = async (ev) => {
    ev.preventDefault()
    const e = validar(); setErr(e); setStatus(null)
    if (Object.keys(e).length) return
    setStatus('loading')
    try { await enviarConsulta(f); setF(empty); setStatus('ok') } catch { setStatus('error') }
  }
  const field = (k, label, { type = 'text', mode, area } = {}) => (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {area ? <textarea rows="4" className={inp} value={f[k]} onChange={set(k)} maxLength={2000} /> : <input type={type} inputMode={mode} className={inp} value={f[k]} onChange={set(k)} maxLength={100} />}
      {err[k] && <span className="text-sm text-acento">{err[k]}</span>}
    </label>
  )
  return (
    <section id="consulta" className="section max-w-2xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center">¿Tenés una consulta?</h2>
      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        {field('nombre', 'Nombre')}
        {field('empresa', 'Empresa / Comercio')}
        {field('telefono', 'Teléfono', { type: 'tel', mode: 'tel' })}
        {field('email', 'Email', { type: 'email', mode: 'email' })}
        {field('mensaje', 'Mensaje', { area: true })}
        <button disabled={status === 'loading'} className="btn btn-primary w-full disabled:opacity-60">{status === 'loading' ? 'Enviando…' : 'Enviar consulta'}</button>
        {status === 'ok' && <p className="text-green-700 font-semibold text-center">Consulta enviada correctamente.</p>}
        {status === 'error' && <p className="text-acento font-semibold text-center">No pudimos enviar tu consulta. Intentá nuevamente.</p>}
      </form>
    </section>
  )
}
