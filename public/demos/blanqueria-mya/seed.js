(function () {
  window.DEMO_ID = 'blanqueria-mya';
  window.DEMO_INFO = 'Demo con datos de ejemplo · Admin: usuario demo / clave demo';
  window.DEMO_SEED = function () {
    var I = window.DEMO_IMG;
    var M = function (medida, color, codigo, precio, bg, e, disp) {
      return { medida: medida, color: color, codigo: codigo, codigoBarras: '', precio: precio, disponible: disp !== false, imagenes: [I(e, bg)] };
    };
    return {
      categorias: ['Sábanas', 'Acolchados', 'Toallas', 'Almohadas'],
      medidas: [
        { nombre: 'Individual', mostrarFiltro: true }, { nombre: '2 plazas', mostrarFiltro: true },
        { nombre: 'Queen', mostrarFiltro: true }, { nombre: 'King', mostrarFiltro: true },
        { nombre: 'Única', mostrarFiltro: false }
      ],
      colores: [
        { nombre: 'Blanco', codigo: '#FFFFFF', esColor: true }, { nombre: 'Gris', codigo: '#9CA3AF', esColor: true },
        { nombre: 'Celeste', codigo: '#93C5FD', esColor: true }, { nombre: 'Rosa', codigo: '#F9A8D4', esColor: true },
        { nombre: 'Beige', codigo: '#D6C4A8', esColor: true }
      ],
      tablaMedidas: {},
      config: { whatsapp: '', instagram: '', logo: '' },
      chatbot: {
        saludo: '¡Hola! 👋 Soy el asistente de esta demo. ¿En qué puedo ayudarte hoy?',
        preguntas: {
          q1: { pregunta: '¿Qué medidas tienen?', respuesta: 'Te muestro la tabla de medidas 👇', accion: 'medidas', accionValor: '' },
          q2: { pregunta: 'Quiero armar un presupuesto', respuesta: 'Te abro el cotizador ahora mismo 👇', accion: 'abrir_presupuesto', accionValor: '' },
          q3: { pregunta: '¿Hacen envíos?', respuesta: 'Coordinamos la entrega según tu zona. Contanos dónde estás y te confirmamos.', accion: '', accionValor: '' }
        }
      },
      productos: {
        p1: { nombre: 'Juego de sábanas algodón', categoria: 'Sábanas', descripcion: 'Sábanas de algodón suave, 144 hilos.', video: '', destacado: true, imagenes: [I('🛏️', '#e0ecff')],
          medidas: [M('Individual', 'Celeste', 'SAB-I-CE', 18500, '#e0ecff', '🛏️'), M('2 plazas', 'Celeste', 'SAB-2-CE', 24500, '#e0ecff', '🛏️'), M('Queen', 'Gris', 'SAB-Q-GR', 29500, '#e5e7eb', '🛏️'), M('King', 'Gris', 'SAB-K-GR', 33500, '#e5e7eb', '🛏️', false)] },
        p2: { nombre: 'Sábanas lisas premium', categoria: 'Sábanas', descripcion: 'Tacto sedoso, no se pelan.', video: '', destacado: false, imagenes: [I('🌙', '#f3e8ff')],
          medidas: [M('2 plazas', 'Blanco', 'PRE-2-BL', 38000, '#f8fafc', '🌙'), M('Queen', 'Blanco', 'PRE-Q-BL', 44000, '#f8fafc', '🌙')] },
        p3: { nombre: 'Acolchado reversible', categoria: 'Acolchados', descripcion: 'Liviano y abrigado, dos caras.', video: '', destacado: true, imagenes: [I('🧶', '#ffe4e6')],
          medidas: [M('2 plazas', 'Rosa', 'ACO-2-RO', 52000, '#ffe4e6', '🧶'), M('Queen', 'Beige', 'ACO-Q-BE', 61000, '#efe7da', '🧶'), M('King', 'Beige', 'ACO-K-BE', 68000, '#efe7da', '🧶')] },
        p4: { nombre: 'Frazada polar', categoria: 'Acolchados', descripcion: 'Ideal para el invierno.', video: '', destacado: false, imagenes: [I('❄️', '#dbeafe')],
          medidas: [M('Individual', 'Gris', 'FRA-I-GR', 21000, '#e5e7eb', '❄️'), M('2 plazas', 'Gris', 'FRA-2-GR', 32000, '#e5e7eb', '❄️')] },
        p5: { nombre: 'Toallón de algodón', categoria: 'Toallas', descripcion: 'Alta absorción, 420 g/m².', video: '', destacado: false, imagenes: [I('🛁', '#cffafe')],
          medidas: [M('Única', 'Blanco', 'TOA-U-BL', 14000, '#f8fafc', '🛁'), M('Única', 'Celeste', 'TOA-U-CE', 14000, '#e0f2fe', '🛁'), M('Única', 'Beige', 'TOA-U-BE', 14000, '#efe7da', '🛁')] },
        p6: { nombre: 'Almohada de fibra', categoria: 'Almohadas', descripcion: 'Firmeza media, lavable.', video: '', destacado: false, imagenes: [I('☁️', '#f1f5f9')],
          medidas: [M('Única', 'Blanco', 'ALM-U-BL', 9500, '#f8fafc', '☁️')] }
      },
      clientes: { c1: { nombre: 'Cliente de ejemplo', telefono: '1100000000' } }
    };
  };
})();
