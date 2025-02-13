const db = require('../database');


exports.listarCaballero = (req, res) => {
    console.log("Fetching products for Ropa Caballeros category"); 
    db.all(`SELECT p.* FROM productos p

            JOIN categorias c ON p.categoria_id = c.id
            WHERE c.nombre = ?`, ['Ropa Caballeros'], (err, productos) => {

        if (err) {
            return res.status(500).send('Error al obtener productos');
        }
        res.render('ropacaballero', { productos });
    });
};
