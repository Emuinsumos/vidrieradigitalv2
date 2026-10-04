(function () {
  window.DEMO_ID = 'golo-mas';
  window.DEMO_FAKE_WA = '5490000000000';
  window.DEMO_INFO = 'Demo con datos de ejemplo · Admin: demo / demo · Cliente: 1001 / demo';
  window.DEMO_SEED = function () {
    var I = window.DEMO_IMG;
    var P = function (id, nombre, categoria, min, may, cant, cb, stock, e, bg, extra) {
      var o = { id: id, nombre: nombre, categoria: categoria, imagen: I(e, bg), precioMinorista: min, precioMayorista: may, cantMinMayorista: cant, codigoBarras: cb, stock: stock, agotado: false, destacado: false };
      for (var k in (extra || {})) o[k] = extra[k];
      return o;
    };
    var now = Date.now();
    return {
      config: {
        adminUser: 'demo', adminPass: 'demo', whatsapp: '5490000000000', instagram: '',
        mapsQuery: 'Obelisco, Buenos Aires, Argentina'
      },
      categorias: {
        k1: { nombre: 'Almacén' }, k2: { nombre: 'Bebidas' }, k3: { nombre: 'Limpieza' }, k4: { nombre: 'Golosinas' }
      },
      productos: {
        g1: P('g1', 'Aceite de girasol 900 ml', 'Almacén', 2600, 2350, 6, '7790000000011', 48, '🛢️', '#fff3c4', { destacado: true }),
        g2: P('g2', 'Arroz largo fino 1 kg', 'Almacén', 1500, 1320, 10, '7790000000028', 120, '🍚', '#f4f1e8'),
        g3: P('g3', 'Fideos tallarín 500 g', 'Almacén', 1100, 950, 12, '7790000000035', 90, '🍝', '#ffe9b8'),
        g4: P('g4', 'Azúcar 1 kg', 'Almacén', 1300, 1150, 10, '7790000000042', 70, '🍬', '#f7f7f7', { destacado: true }),
        g5: P('g5', 'Yerba mate 1 kg', 'Almacén', 4800, 4300, 6, '7790000000059', 36, '🧉', '#dcefd0'),
        g6: P('g6', 'Gaseosa cola 2,25 L', 'Bebidas', 3200, 2850, 6, '7790000000066', 4, '🥤', '#ffd6d6'),
        g7: P('g7', 'Agua mineral 2 L', 'Bebidas', 1400, 1200, 6, '7790000000073', 60, '💧', '#d6ecff'),
        g8: P('g8', 'Lavandina 1 L', 'Limpieza', 1200, 1000, 12, '7790000000080', 40, '🧴', '#e2e8f0'),
        g9: P('g9', 'Detergente 750 ml', 'Limpieza', 2100, 1850, 6, '7790000000097', 3, '🧼', '#d9f5e5'),
        g10: P('g10', 'Galletitas surtidas', 'Golosinas', 1700, 1500, 10, '7790000000103', 80, '🍪', '#fde3b8')
      },
      combos: {
        b1: { id: 'b1', nombre: 'Combo desayuno', imagen: I('☕', '#f3e2cf'), precioCombo: 9200, componentes: [
          { productId: 'g5', nombre: 'Yerba mate 1 kg', cantidad: 1 }, { productId: 'g4', nombre: 'Azúcar 1 kg', cantidad: 1 }, { productId: 'g10', nombre: 'Galletitas surtidas', cantidad: 2 }] },
        b2: { id: 'b2', nombre: 'Combo almacén básico', imagen: I('🧺', '#e7f0d9'), precioCombo: 11500, componentes: [
          { productId: 'g2', nombre: 'Arroz largo fino 1 kg', cantidad: 2 }, { productId: 'g3', nombre: 'Fideos tallarín 500 g', cantidad: 2 }, { productId: 'g1', nombre: 'Aceite de girasol 900 ml', cantidad: 1 }] }
      },
      clientes: {
        c1: { numero: '1001', password: 'demo', nombre: 'Cliente de ejemplo', telefono: '1100000000', direccion: 'Calle de ejemplo 123', cuil: '', descuento: '5' }
      },
      pedidos: {
        o1: { id: 'o1', clienteId: 'c1', clienteNombre: 'Cliente de ejemplo', items: [{ id: 'g2', nombre: 'Arroz largo fino 1 kg', cantidad: 10, precioUnit: 1254, subtotal: 12540, esCombo: false, componentes: null }], total: 12540, estado: 'entregado', fecha: new Date(now - 3 * 86400000).toISOString() },
        o2: { id: 'o2', clienteId: 'c1', clienteNombre: 'Cliente de ejemplo', items: [{ id: 'g1', nombre: 'Aceite de girasol 900 ml', cantidad: 6, precioUnit: 2233, subtotal: 13398, esCombo: false, componentes: null }], total: 13398, estado: 'recibido', fecha: new Date(now - 3600000).toISOString() }
      }
    };
  };
})();
