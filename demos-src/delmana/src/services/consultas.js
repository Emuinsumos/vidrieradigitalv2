// Demo: guarda las consultas en el navegador de cada visitante (sin Firebase).
const KEY = 'demo:delmana:v1'
const hace = (h) => Date.now() - h * 3600000
const SEMILLA = [
  { id: 'd1', fecha: hace(2), nombre: 'Laura Giménez', empresa: 'Rotisería El Buen Sabor', telefono: '1155550101', email: 'laura@ejemplo.com', mensaje: 'Hola, quisiera saber precios por caja para mi rotisería y si hacen entregas en zona oeste.', leido: false },
  { id: 'd2', fecha: hace(30), nombre: 'Martín Acosta', empresa: 'Cocina de Martín', telefono: '1155550102', email: 'martin@ejemplo.com', mensaje: 'Buenas, ¿qué presentaciones tienen disponibles? Necesito para un evento.', leido: true },
  { id: 'd3', fecha: hace(75), nombre: 'Sofía Rinaldi', empresa: '', telefono: '1155550103', email: 'sofia@ejemplo.com', mensaje: 'Consulta por compra mayorista, gracias.', leido: false }
]
const subs = new Set()
const leer = () => { try { const v = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(v)) return v } catch {} return SEMILLA.map((x) => ({ ...x })) }
const guardar = (l) => { try { localStorage.setItem(KEY, JSON.stringify(l)) } catch {} subs.forEach((f) => f()) }
export const reiniciar = () => { try { localStorage.removeItem(KEY) } catch {} }
export const enviarConsulta = async (d) => {
  guardar([{ id: 'c' + Date.now().toString(36), fecha: Date.now(), nombre: d.nombre, empresa: d.empresa, telefono: d.telefono, email: d.email, mensaje: d.mensaje, leido: false }, ...leer()])
}
export const escucharConsultas = (dir, cb) => {
  const emitir = () => cb(leer().sort((a, b) => (dir === 'asc' ? a.fecha - b.fecha : b.fecha - a.fecha)).map((x) => ({ ...x, fecha: { toDate: () => new Date(x.fecha) } })))
  subs.add(emitir); emitir()
  return () => subs.delete(emitir)
}
export const marcarLeida = async (id) => guardar(leer().map((x) => (x.id === id ? { ...x, leido: true } : x)))
export const eliminarConsulta = async (id) => guardar(leer().filter((x) => x.id !== id))
