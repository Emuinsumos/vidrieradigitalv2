import { useEffect, useState } from 'react'
// Demo: el PIN del panel es 1234 (en la web real es un usuario de Firebase Auth).
export const PIN_DEMO = '1234'
const KEY = 'demo:delmana:auth'
const subs = new Set()
const estado = () => { try { return localStorage.getItem(KEY) === '1' ? { email: 'demo' } : null } catch { return null } }
export default function useAuth() {
  const [user, setUser] = useState(undefined)
  useEffect(() => { const f = () => setUser(estado()); subs.add(f); f(); return () => subs.delete(f) }, [])
  const login = async (pin) => {
    if (pin !== PIN_DEMO) throw new Error('pin')
    try { localStorage.setItem(KEY, '1') } catch {}
    subs.forEach((f) => f())
  }
  const logout = async () => { try { localStorage.removeItem(KEY) } catch {} subs.forEach((f) => f()) }
  return { user, login, logout }
}
