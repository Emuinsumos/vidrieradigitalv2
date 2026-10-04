(function () {
  window.DEMO_ID = 'dulce-benjamin';
  window.DEMO_INFO = 'Demo con datos de ejemplo · Admin: usuario demo / clave demo';
  window.DEMO_SEED = function () {
  var I = window.DEMO_IMG;
  return {
    categorias: ['Cajitas 3D', 'Candy bar', 'Combos dulces', 'Cotillón'],
    config: { whatsapp: '', instagram: '', logo: '' },
    chatbot: { saludo: '¡Hola! 👋 Soy el asistente de esta demo. ¿En qué te puedo ayudar?' },
    productos: {
      p1: { nombre: 'Cajita 3D cumpleaños', categoria: 'Cajitas 3D', descripcion: 'Cajita personalizada con golosinas a elección.', imagenes: [I('🎁', '#fde2ee')], agotado: false, variantes: [{ cantidad: 10, precio: 12000 }, { cantidad: 20, precio: 22000 }] },
      p2: { nombre: 'Cajita 3D comunión', categoria: 'Cajitas 3D', descripcion: 'Diseño en tonos pastel con tu nombre.', imagenes: [I('🕊️', '#e8f1ff')], agotado: false, variantes: [{ cantidad: 10, precio: 13500 }, { cantidad: 20, precio: 25000 }] },
      p3: { nombre: 'Candy bar completo', categoria: 'Candy bar', descripcion: 'Mesa dulce con 12 variedades de golosinas.', imagenes: [I('🍭', '#ffe9c7')], agotado: false, variantes: [{ cantidad: 1, precio: 45000 }] },
      p4: { nombre: 'Frascos de golosinas', categoria: 'Candy bar', descripcion: 'Frascos decorados para tu mesa.', imagenes: [I('🍬', '#ffd9e6')], agotado: false, variantes: [{ cantidad: 3, precio: 9000 }, { cantidad: 6, precio: 16000 }] },
      p5: { nombre: 'Combo dulce mini', categoria: 'Combos dulces', descripcion: 'Bolsita con chocolates y gomitas.', imagenes: [I('🍫', '#e9dcd2')], agotado: false, variantes: [{ cantidad: 10, precio: 8000 }, { cantidad: 30, precio: 21000 }] },
      p6: { nombre: 'Combo dulce premium', categoria: 'Combos dulces', descripcion: 'Caja con bombones y alfajores.', imagenes: [I('🍪', '#fff1c9')], agotado: true, variantes: [{ cantidad: 1, precio: 7500 }] },
      p7: { nombre: 'Globos metalizados', categoria: 'Cotillón', descripcion: 'Pack de globos para decorar.', imagenes: [I('🎈', '#ffd8d2')], agotado: false, variantes: [{ cantidad: 5, precio: 4500 }, { cantidad: 10, precio: 8000 }] },
      p8: { nombre: 'Gorros y antifaces', categoria: 'Cotillón', descripcion: 'Kit de cotillón para 10 invitados.', imagenes: [I('🎉', '#e4f7e6')], agotado: false, variantes: [{ cantidad: 10, precio: 6000 }] }
    },
    clientes: { c1: { nombre: 'Cliente de ejemplo', telefono: '1100000000' } }
  };
};
})();
