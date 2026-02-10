var express = require('express');
var router = express.Router();
var db = require('../database'); // Importante: Conexión a la BD

/* GET Home Page - Japan Style Data Loader */
router.get('/', function(req, res, next) {
  
  // 1. Consultar Atractivos (Para el Grid de fotos grandes)
  db.all("SELECT * FROM atractivos", [], (err, atractivos) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    // 2. Consultar Servicios (Para las píldoras de servicios)
    db.all("SELECT * FROM servicios", [], (err, servicios) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      // 3. Renderizar enviando TODOS los datos que pide el EJS
      res.render('index', { 
        title: 'Guárico TechTur',
        atractivos: atractivos, // <--- Aquí solucionamos el "not defined"
        servicios: servicios,   // <--- También necesario para la sección de abajo
        autores: [              // <--- Datos para el footer
            { nombre: 'Gutierrez, Carlos' },
            { nombre: 'Hidalgo, Luis' },
            { nombre: 'Cabrera, Javier' },
            { nombre: 'Sarmiento, Carlos' }
        ]
      });
    });
  });
});

module.exports = router;