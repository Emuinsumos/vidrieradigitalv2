import useAuth from '../hooks/useAuth.js'
import Login from '../components/Login.jsx'
import PrivateContact from '../components/PrivateContact.jsx'
export default function Contacto() {
  const { user, login, logout } = useAuth()
  if (user === undefined) return <p className="p-10 text-center">Cargando…</p>
  return user ? <PrivateContact onLogout={logout} /> : <Login onLogin={login} />
}
