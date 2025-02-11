const db = require('../database');

// Obtener productos de la categoría accesorios
exports.listarBarca = (req, res) => {
    console.log("Fetching products for Ropa Barca category"); // Debugging log

    db.all(`SELECT p.* FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['FC Barcelona'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }

        // Guardar el precio original
        productos.forEach(producto => {
            producto.precio_original = producto.precio; // Guardar precio original
            producto.precio *= 0.5; // Aplicar descuento
        });


        res.render('ropabarca', { productos });
    });
};
