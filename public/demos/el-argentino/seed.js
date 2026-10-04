(function () {
  window.DEMO_ID = 'el-argentino';
  window.DEMO_FAKE_WA = '5490000000000';
  window.DEMO_INFO = 'Demo con datos de ejemplo · Admin: usuario demo / clave demo';
  window.DEMO_SEED = function () {
    var I = window.DEMO_IMG;
    return {
      categorias: ['Café y desayuno', 'Minutas', 'Parrilla', 'Bebidas', 'Postres'],
      config: { whatsapp: '5490000000000', instagram: '', direccion: 'Av. de ejemplo 456' },
      platoDelDia: { nombre: 'Milanesa napolitana con papas', descripcion: 'Milanesa de ternera, jamón, queso y salsa, con papas fritas.', precio: 12500, imagen: I('🍽️', '#fde2c0'), insumos: [{ insumoId: 'i4', cantidad: 0.3 }], fecha: Date.now() },
      mesas: { m1: { numero: '1' }, m2: { numero: '2' }, m3: { numero: '3' }, m4: { numero: '4' } },
      chatbot: {
        saludo: '¡Hola! 👋 Soy el asistente de esta demo. Elegí una pregunta:',
        preguntas: {
          q1: { pregunta: '¿Cuál es el horario?', respuesta: 'Todos los días de 7 a 23 hs.' },
          q2: { pregunta: '¿Tienen menú para celíacos?', respuesta: 'Sí, consultá las opciones sin TACC con el mozo.' },
          q3: { pregunta: '¿Se puede reservar mesa?', respuesta: 'Sí, escribinos por WhatsApp con día, hora y cantidad de personas.' }
        }
      },
      insumos: {
        i1: { nombre: 'Medialunas', unidad: 'u', cantidad: 48, minimo: 24 },
        i2: { nombre: 'Café en grano', unidad: 'kg', cantidad: 6, minimo: 2 },
        i3: { nombre: 'Asado', unidad: 'kg', cantidad: 9, minimo: 10 },
        i4: { nombre: 'Papas', unidad: 'kg', cantidad: 20, minimo: 6 },
        i5: { nombre: 'Pan de sándwich', unidad: 'u', cantidad: 30, minimo: 12 }
      },
      productos: {
        c1: { nombre: 'Café con medialunas', categoria: 'Café y desayuno', descripcion: 'Café a elección con 2 medialunas.', precio: 4800, imagen: I('☕', '#ead7c3'), insumos: [{ insumoId: 'i2', cantidad: 0.02 }, { insumoId: 'i1', cantidad: 2 }] },
        c2: { nombre: 'Tostado de jamón y queso', categoria: 'Café y desayuno', descripcion: 'Pan de miga tostado, jamón cocido y queso.', precio: 5200, imagen: I('🥪', '#f6e3b4'), insumos: [{ insumoId: 'i5', cantidad: 2 }] },
        m1: { nombre: 'Milanesa con papas', categoria: 'Minutas', descripcion: 'Milanesa de ternera con papas fritas.', precio: 11000, imagen: I('🍖', '#f5cfa0'), insumos: [{ insumoId: 'i4', cantidad: 0.3 }] },
        m2: { nombre: 'Ravioles con salsa', categoria: 'Minutas', descripcion: 'Ravioles de ricota y verdura con salsa a elección.', precio: 10500, imagen: I('🍝', '#fbd5c0'), insumos: [] },
        p1: { nombre: 'Asado para uno', categoria: 'Parrilla', descripcion: 'Tira de asado con guarnición.', precio: 16500, imagen: I('🥩', '#f2b8a8'), insumos: [{ insumoId: 'i3', cantidad: 0.4 }, { insumoId: 'i4', cantidad: 0.2 }] },
        p2: { nombre: 'Choripán', categoria: 'Parrilla', descripcion: 'Chorizo a la parrilla en pan crocante.', precio: 5500, imagen: I('🌭', '#f5d0a0'), insumos: [{ insumoId: 'i5', cantidad: 1 }] },
        b1: { nombre: 'Gaseosa 500 ml', categoria: 'Bebidas', descripcion: 'Línea cola o lima-limón.', precio: 2400, imagen: I('🥤', '#cfe8ff'), insumos: [] },
        b2: { nombre: 'Vino de la casa (copa)', categoria: 'Bebidas', descripcion: 'Malbec.', precio: 3800, imagen: I('🍷', '#e6c3d4'), insumos: [] },
        d1: { nombre: 'Flan con dulce de leche', categoria: 'Postres', descripcion: 'Casero, con crema.', precio: 4500, imagen: I('🍮', '#fde7b0'), insumos: [] }
      },
      combos: {
        k1: { nombre: 'Desayuno completo', descripcion: 'Café, jugo de naranja, tostado y 2 medialunas.', precio: 8900, imagen: I('🥐', '#fde3b8'), insumos: [{ insumoId: 'i2', cantidad: 0.02 }, { insumoId: 'i1', cantidad: 2 }, { insumoId: 'i5', cantidad: 2 }] },
        k2: { nombre: 'Parrillada para 2', descripcion: 'Asado, chorizo, morcilla y ensalada.', precio: 34000, imagen: I('🔥', '#f6c7a8'), insumos: [{ insumoId: 'i3', cantidad: 0.8 }] }
      }
    };
  };
})();
