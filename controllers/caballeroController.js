const db = require('../database');

// Obtener productos de la categoría accesorios
exports.listarCaballero = (req, res) => {
    console.log("Fetching products for Ropa Caballeros category"); // Debugging log
    db.all(`SELECT p.* FROM productos p

            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['Ropa Caballeros'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }
        res.render('ropacaballero', { productos });
    });
};
