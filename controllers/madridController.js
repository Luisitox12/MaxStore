const db = require('../database');


exports.listarMadrid = (req, res) => {
    console.log("Fetching products for Ropa madrid category"); 
    db.all(`SELECT p.* FROM productos p

            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['Real Madrid'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }
            
        // Guardar el precio original
        productos.forEach(producto => {
            producto.precio_original = producto.precio; 
            producto.precio *= 0.5; 
        });

        res.render('ropamadrid', { productos });
    });
};