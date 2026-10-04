(function () {
  window.DEMO_ID = 'the-papas-brothers';
  window.DEMO_FAKE_WA = '5490000000000';
  window.DEMO_INFO = 'Demo con datos de ejemplo · Admin: usuario demo / clave demo';
  window.DEMO_SEED = function () {
    var I = window.DEMO_IMG;
    return {
      contadorPedidos: 0,
      categorias: ['Hamburguesas', 'Papas', 'Bebidas', 'Postres'],
      config: { whatsapp: '5490000000000', instagram: '', direccion: 'Calle de ejemplo 123', alias: 'demo.alias.mp', qrPago: '' },
      chatbot: {
        saludo: '¡Hola! 👋 Soy el asistente de esta demo. Elegí una pregunta:',
        preguntas: {
          q1: { pregunta: '¿Hacen delivery?', respuesta: 'Sí, hacemos delivery en la zona. Cargá tu dirección al hacer el pedido.' },
          q2: { pregunta: '¿Qué medios de pago aceptan?', respuesta: 'Efectivo, transferencia y QR.' },
          q3: { pregunta: '¿Cuál es el horario?', respuesta: 'Todos los días de 20 a 00 hs.' }
        }
      },
      insumos: {
        i1: { nombre: 'Pan de hamburguesa', unidad: 'u', cantidad: 60, minimo: 20 },
        i2: { nombre: 'Medallón de carne', unidad: 'u', cantidad: 45, minimo: 20 },
        i3: { nombre: 'Queso cheddar (feta)', unidad: 'u', cantidad: 12, minimo: 15 },
        i4: { nombre: 'Papas', unidad: 'kg', cantidad: 25, minimo: 8 }
      },
      productos: {
        h1: { nombre: 'Clásica', categoria: 'Hamburguesas', descripcion: 'Medallón de carne, lechuga, tomate y aderezo de la casa.', precio: 8500, imagen: I('🍔', '#f5d9a8'), destacado: true, insumos: [{ insumoId: 'i1', cantidad: 1 }, { insumoId: 'i2', cantidad: 1 }] },
        h2: { nombre: 'Cheddar doble', categoria: 'Hamburguesas', descripcion: 'Doble medallón, doble cheddar y cebolla caramelizada.', precio: 11500, imagen: I('🧀', '#ffe08a'), destacado: true, insumos: [{ insumoId: 'i1', cantidad: 1 }, { insumoId: 'i2', cantidad: 2 }, { insumoId: 'i3', cantidad: 2 }] },
        h3: { nombre: 'Bacon BBQ', categoria: 'Hamburguesas', descripcion: 'Panceta crocante, salsa barbacoa y cheddar.', precio: 10500, imagen: I('🥓', '#f2c1a0'), destacado: false, insumos: [{ insumoId: 'i1', cantidad: 1 }, { insumoId: 'i2', cantidad: 1 }, { insumoId: 'i3', cantidad: 1 }] },
        p1: { nombre: 'Papas fritas', categoria: 'Papas', descripcion: 'Porción grande, crocantes.', precio: 4500, imagen: I('🍟', '#fde68a'), destacado: false, insumos: [{ insumoId: 'i4', cantidad: 0.3 }] },
        p2: { nombre: 'Papas con cheddar', categoria: 'Papas', descripcion: 'Con cheddar fundido y panceta.', precio: 6500, imagen: I('🧀', '#fcd9a0'), destacado: false, insumos: [{ insumoId: 'i4', cantidad: 0.3 }, { insumoId: 'i3', cantidad: 2 }] },
        b1: { nombre: 'Gaseosa 500 ml', categoria: 'Bebidas', descripcion: 'Línea cola, a elección.', precio: 2200, imagen: I('🥤', '#cfe8ff'), destacado: false, insumos: [] },
        b2: { nombre: 'Cerveza artesanal', categoria: 'Bebidas', descripcion: 'Rubia, 473 ml.', precio: 4000, imagen: I('🍺', '#fde9a9'), destacado: false, insumos: [] },
        d1: { nombre: 'Brownie con helado', categoria: 'Postres', descripcion: 'Brownie tibio con bocha de crema americana.', precio: 5500, imagen: I('🍫', '#e1cdbf'), destacado: false, insumos: [] }
      },
      combos: {
        c1: { nombre: 'Combo Clásica', descripcion: 'Clásica + papas fritas + gaseosa.', precio: 14000, imagen: I('🍔', '#f5d9a8'), insumos: [{ insumoId: 'i1', cantidad: 1 }, { insumoId: 'i2', cantidad: 1 }, { insumoId: 'i4', cantidad: 0.3 }] },
        c2: { nombre: 'Combo Brothers x2', descripcion: '2 Cheddar doble + papas con cheddar + 2 gaseosas.', precio: 32000, imagen: I('🔥', '#ffd9b8'), insumos: [{ insumoId: 'i1', cantidad: 2 }, { insumoId: 'i2', cantidad: 4 }, { insumoId: 'i3', cantidad: 5 }, { insumoId: 'i4', cantidad: 0.3 }] }
      }
    };
  };
})();
