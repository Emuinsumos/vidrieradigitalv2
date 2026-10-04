// ====== EDITÁ SOLO ESTE ARCHIVO ======
export const CONFIG = {
  whatsapp: '5491135035050', // tu número con código de país, sin + ni espacios
  instagram: 'tu_vidrieradigital',
}

// demo: pegá la URL (https://...). Si queda vacío, la tarjeta dice "Demo próximamente"
export const PROYECTOS = [
  { n: 'Dulce Benjamín', c: 'Candy y golosinas', e: '🍬', bg: '#ff8fb1', d: 'Catálogo con categorías, carrito y pedido directo por WhatsApp.', t: ['Catálogo', 'Carrito', 'Panel admin'], demo: '/demos/dulce-benjamin/' },
  { n: 'Blanquería MyA', c: 'Blanquería', e: '🛏️', bg: '#8fc7ff', d: 'Productos con medidas y precio por medida.', t: ['Medidas', 'Precios', 'Panel admin'], demo: '/demos/blanqueria-mya/' },
  { n: 'El Argentino', c: 'Gastronomía', e: '☕', bg: '#d9a066', d: 'Carta digital para bar y café, con gestión gastronómica.', t: ['Carta', 'Pedidos', 'Gestión'], demo: '/demos/el-argentino/' },
  { n: "The Papa's Brothers", c: 'Gastronomía', e: '🍔', bg: '#ffb74d', d: 'Web de hamburguesería con carta y pedidos online.', t: ['Carta', 'Pedidos'], demo: '/demos/the-papas-brothers/' },
  { n: 'Muebles El Libertador', c: 'Mueblería', e: '🪑', bg: '#b08968', d: 'Catálogo de muebles con consulta directa por WhatsApp.', t: ['Catálogo', 'Consultas'], demo: '/demos/muebles-el-libertador/' },
  { n: 'Golo-Mas', c: 'Almacén y mayorista', e: '🛒', bg: '#7bd389', d: 'Precio mayorista y minorista, cuentas de cliente y stock con código de barras.', t: ['Mayor/menor', 'Clientes', 'Stock'], demo: '/demos/golo-mas/' },
  { n: 'DELMANA', c: 'Marcas y empresas', e: '🥖', bg: '#e9c46a', d: 'Web institucional con formulario de contacto y panel privado de mensajes.', t: ['Institucional', 'Formulario'], demo: '/demos/delmana/' },
]

export const PLANES = [
  {
    id: 'basica', nombre: 'Plan base', para: 'Para empezar a mostrar tu negocio',
    lanzamiento: 0, mensual: 25000,
    items: ['Catálogo de productos', 'Botón a WhatsApp y redes', 'Con tu logo y tus colores', 'Se ve bien en el celular'],
  },
  {
    id: 'premium', nombre: 'Plan Premium', para: 'Para vender y gestionar online', destacado: true,
    lanzamiento: 50000, mensual: 35000,
    items: ['Todo lo de base', 'Carrito y pedidos', 'Panel de administración', 'Cuentas de cliente y stock', 'Facturas y reportes en PDF'],
  },
  {
    id: 'empresas', nombre: 'Pack empresas', para: 'Full premium para fábricas y empresas',
    lanzamiento: 125000, mensual: 60000,
    items: ['Todo lo de la premium', 'Sistema de Gestión Interna', 'Producción, calidad y pañol', 'Accesos por operario', 'Datos y estadisticas es Realtime'],
  },
]

export const MAQUINAS = [
  { n: 'CNC 04', oee: 82, pzs: [44, 46, 45, 43, 0, 45, 47, 46], cpk: 1.58 },
  { n: 'CNC 11', oee: 71, pzs: [38, 40, 0, 0, 41, 39, 42, 40], cpk: 1.21 },
  { n: 'CNC 17', oee: 89, pzs: [48, 49, 50, 48, 49, 51, 50, 49], cpk: 1.74 },
]

export const INSUMOS = [
  { n: 'Inserto CNMG 120408', s: 14, min: 10 },
  { n: 'Refrigerante (bidón)', s: 6, min: 5 },
  { n: 'Guantes de seguridad', s: 9, min: 8 },
]
