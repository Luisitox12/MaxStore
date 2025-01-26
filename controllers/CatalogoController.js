exports.listarCatalogo = (req, res) => {
    // Aquí iría la lógica para obtener los productos, por ejemplo, desde una base de datos
    const catalogo = [
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 },
    ];
    
    res.render('catalogo', { title: 'The CombiShop', catalogo });
  };