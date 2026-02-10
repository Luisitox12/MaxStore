var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET Detalle de Servicio (Dinámico) */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    
    db.get("SELECT * FROM servicios WHERE id = ?", [id], (err, servicio) => {
        if (err) return next(err);
        if (!servicio) return res.status(404).send("Servicio no encontrado");

        // Renderizamos la vista de detalle
        res.render('servicio_detalle', { servicio: servicio });
    });
});

module.exports = router;