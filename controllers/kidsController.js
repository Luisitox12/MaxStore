const db = require('../database');

// Obtener productos de la categoría accesorios
exports.listarKids = (req, res) => {
    console.log("Fetching products for Ropa kids category"); // Debugging log
    db.all(`SELECT p.* FROM productos p

            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['Ropa infantil'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }
        res.render('ropakids', { productos });
    });
};