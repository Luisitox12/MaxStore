// CatalogoController.js
const db = require('../database');

exports.listarCatalogo = (req, res) => {
    // Obtener productos con sus categorías
    db.all(`SELECT p.*, c.nombre AS categoria_nombre FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id`, [], (err, productos) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        // Agrupar productos por categoría
        const catalogo = {};
        productos.forEach(producto => {
            const categoria = producto.categoria_nombre || 'Sin categoría';
            if (!catalogo[categoria]) {
                catalogo[categoria] = [];
            }
            catalogo[categoria].push(producto);
        });

        // Pasar la variable catalogo a la vista
        res.render('catalogo', { title: 'The CombiShop', catalogo });
    });
};