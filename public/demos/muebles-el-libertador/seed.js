(function () {
  window.DEMO_ID = 'muebles-el-libertador';
  window.DEMO_FAKE_WA = '5490000000000';
  window.DEMO_INFO = 'Demo con datos de ejemplo · Admin: usuario demo / clave demo';
  window.DEMO_SEED = function () {
    var I = window.DEMO_IMG;
    var V = function (medida, color, precio, ancho, alto, prof, material, acabado, entrega, disp) {
      return { medida: medida, color: color, codigo: '', codigoBarras: '', precio: precio, disponible: disp !== false, ancho: ancho, alto: alto, profundidad: prof, material: material, acabado: acabado, tiempoEntrega: entrega };
    };
    return {
      categorias: ['Living & Sofás', 'Comedor & Mesas', 'Dormitorio', 'Oficina & Escritorios'],
      medidas: ['2 cuerpos', '3 cuerpos', '1.60 x 0.80 m', '1.80 x 0.90 m', 'Queen', 'King', '120 cm', '140 cm'],
      colores: [
        { nombre: 'Roble', codigo: '#C49A6C' }, { nombre: 'Nogal', codigo: '#6B4A32' },
        { nombre: 'Blanco', codigo: '#F5F1EA' }, { nombre: 'Gris', codigo: '#8E9099' }
      ],
      tablaMedidas: {},
      config: { whatsapp: '5490000000000', instagram: '', logo: '' },
      chatbot: { saludo: '¡Hola! 👋 Soy el asistente de esta demo. ¿En qué puedo ayudarte hoy?' },
      productos: {
        m1: { nombre: 'Sofá Nórdico', categoria: 'Living & Sofás', descripcion: 'Sofá de líneas simples, tapizado en lino y patas de madera.', video: '', destacado: true, imagenes: [I('🛋️', '#efe3d2')],
          medidas: [V('2 cuerpos', 'Gris', 520000, 160, 85, 85, 'Paraíso', 'Lino', 'Entrega inmediata'), V('3 cuerpos', 'Gris', 680000, 210, 85, 85, 'Paraíso', 'Lino', '15 a 20 días'), V('3 cuerpos', 'Blanco', 690000, 210, 85, 85, 'Paraíso', 'Lino', '15 a 20 días', false)] },
        m2: { nombre: 'Mesa de comedor Sierra', categoria: 'Comedor & Mesas', descripcion: 'Mesa rectangular de madera maciza con lustre natural.', video: '', destacado: true, imagenes: [I('🪵', '#e8d5b9')],
          medidas: [V('1.60 x 0.80 m', 'Roble', 410000, 160, 76, 80, 'Roble', 'Lustre Natural', '15 a 20 días'), V('1.80 x 0.90 m', 'Roble', 470000, 180, 76, 90, 'Roble', 'Lustre Natural', '15 a 20 días'), V('1.80 x 0.90 m', 'Nogal', 490000, 180, 76, 90, 'Roble', 'Tabaco', '15 a 20 días')] },
        m3: { nombre: 'Silla Tulipán', categoria: 'Comedor & Mesas', descripcion: 'Silla con asiento tapizado, ideal para comedor.', video: '', destacado: false, imagenes: [I('🪑', '#ecdcc6')],
          medidas: [V('Única', 'Roble', 95000, 45, 90, 50, 'Guatambú', 'Pana', 'Entrega inmediata')] },
        m4: { nombre: 'Cama Aurora con respaldo', categoria: 'Dormitorio', descripcion: 'Cama con respaldo tapizado y base de madera reforzada.', video: '', destacado: true, imagenes: [I('🛏️', '#e9e1f0')],
          medidas: [V('Queen', 'Gris', 540000, 160, 110, 205, 'Pino', 'Pana', '15 a 20 días'), V('King', 'Gris', 620000, 200, 110, 205, 'Pino', 'Pana', '15 a 20 días')] },
        m5: { nombre: 'Placard Roma 2 puertas', categoria: 'Dormitorio', descripcion: 'Placard de MDF laqueado con interior organizado.', video: '', destacado: false, imagenes: [I('🚪', '#f1ede6')],
          medidas: [V('120 cm', 'Blanco', 380000, 120, 200, 50, 'MDF Laqueado', 'Laca Blanca', 'Entrega inmediata'), V('140 cm', 'Blanco', 430000, 140, 200, 50, 'MDF Laqueado', 'Laca Blanca', '15 a 20 días')] },
        m6: { nombre: 'Escritorio Oficina Plus', categoria: 'Oficina & Escritorios', descripcion: 'Escritorio con cajonera y pasacables.', video: '', destacado: false, imagenes: [I('🖥️', '#dfe8ee')],
          medidas: [V('120 cm', 'Nogal', 245000, 120, 75, 60, 'MDF Laqueado', 'Melamina Blanca', 'Entrega inmediata'), V('140 cm', 'Nogal', 285000, 140, 75, 60, 'MDF Laqueado', 'Melamina Blanca', 'Entrega inmediata')] }
      },
      clientes: { c1: { nombre: 'Cliente de ejemplo', telefono: '1100000000' } }
    };
  };
})();
