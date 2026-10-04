import { useState } from 'react'
export default function Login({ onLogin }) {
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    try { await onLogin(pin) } catch { setErr('PIN incorrecto.') }
    setBusy(false)
  }
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <form onSubmit={submit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center space-y-4">
        <h1 className="font-display text-3xl font-bold">Acceso privado</h1>
        <p className="text-cafe/70">Esta sección está protegida.</p>
        <input type="password" inputMode="numeric" autoComplete="current-password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)}
          className="w-full rounded-xl border border-trigo px-4 py-3.5 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-acento" />
        {err && <p className="text-acento">{err}</p>}
        <button disabled={busy || !pin} className="btn btn-primary w-full disabled:opacity-60">Ingresar</button>
      </form>
    </main>
  )
}
