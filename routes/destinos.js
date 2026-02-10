var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET Detalle de Destino (Dinámico) */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    
    // Buscamos el lugar específico por ID
    db.get("SELECT * FROM atractivos WHERE id = ?", [id], (err, lugar) => {
        if (err) return next(err);
        if (!lugar) return res.status(404).send("Destino no encontrado");

        // Renderizamos la nueva vista 'destino.ejs'
        res.render('destino', { lugar: lugar });
    });
});

module.exports = router;