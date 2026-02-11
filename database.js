const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'gtt_turismo.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    else console.log('--> BD GTT (FUSIÓN FINAL: Textos + GPS) Conectada');
});

db.serialize(() => {
    // 1. LIMPIEZA
    db.run("DROP TABLE IF EXISTS atractivos");
    db.run("DROP TABLE IF EXISTS servicios");
    db.run("DROP TABLE IF EXISTS reportes");

    // 2. CREAR TABLAS (AQUÍ AGREGAMOS LAS COLUMNAS lat Y lng)
    db.run(`CREATE TABLE atractivos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT, tipo TEXT, descripcion TEXT, historia TEXT, tips TEXT, estado_ruta TEXT, 
        lat REAL, lng REAL, imagen TEXT, imagen_secundaria TEXT
    )`);

    db.run(`CREATE TABLE servicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT, categoria TEXT, contacto TEXT, promocion TEXT, descripcion TEXT, horario TEXT, direccion TEXT, 
        lat REAL, lng REAL, imagen TEXT, imagen_extra TEXT
    )`);
    
    db.run(`CREATE TABLE reportes (id INTEGER PRIMARY KEY, mensaje TEXT)`);

    // --- 3. SEEDING: ATRACTIVOS TURÍSTICOS ---
    const stmtAtractivos = db.prepare("INSERT INTO atractivos (nombre, tipo, descripcion, historia, tips, estado_ruta, lat, lng, imagen, imagen_secundaria) VALUES (?,?,?,?,?,?,?,?,?,?)");
    
    // 1. LOS MORROS (9.9166, -67.3980)
    stmtAtractivos.run(
        "Mon. Natural Arístides Rojas", "Naturaleza / Icono", "Los famosos Morros de San Juan.", 
        "Formaciones geológicas de roca caliza arrecifal de hace 80 millones de años. Son el emblema del estado Guárico.",
        "Ideal para fotos panorámicas. | Escalada con equipos.", "Habilitada", 
        9.9166, -67.3980, 
        "/images/morros.jpg", "/images/morros.jpg"
    );

    // 2. MIRADOR TEOBALDO MIERES (9.9056, -67.3553)
    stmtAtractivos.run(
        "Mirador Teobaldo Mieres", "Vista Panorámica", "Hogar de la Beata Candelaria.", 
        "Punto más alto de la ciudad urbana. Alberga el monumento a la Beata Madre Candelaria (24m).", 
        "Entrada libre. | Clima ventoso.", "Habilitada", 
        9.9056, -67.3553, 
        "/images/mirador.jpg", "/images/mirador.jpg"
    );

    // 3. PICO PLATILLÓN (9.8700, -67.5100)
    stmtAtractivos.run(
        "Pico Platillón", "Montaña / Aventura", "La cumbre más alta de Guárico.", 
        "Reserva de selva nublada vital para la hidrografía. Contrasta con el calor del llano.", 
        "Acceso solo en 4x4. | Requiere permiso.", "Solo 4x4", 
        9.8700, -67.5100, 
        "/images/platillon.jpg", "/images/platillon.jpg"
    );

    // 4. EL CASTRERO (9.9480, -67.3230)
    stmtAtractivos.run(
        "Balneario El Castrero", "Naturaleza", "Aguas cristalinas de manantial.", 
        "El balneario clásico de los sanjuaneros. Sus aguas bajan directamente de la montaña.",
        "Lleva repelente. | Evita el vidrio.", "Habilitada", 
        9.9480, -67.3230, 
        "/images/castrero.jpg", "/images/castrero.jpg"
    );

    // 5. SANJUANOTE (9.9125, -67.3591)
    stmtAtractivos.run(
        "Monumento Sanjuanote", "Patrimonio", "El Coloso de Guárico (19.8m).", 
        "Construido en 1935, es el San Juan Bautista más alto de Venezuela.",
        "Estacionamiento disponible.", "Habilitada", 
        9.9125, -67.3591, 
        "/images/sanjuanote.jpg", "/images/sanjuanote.jpg"
    );
    stmtAtractivos.finalize();

    // --- 4. SEEDING: SERVICIOS (TUS COMPAÑEROS + GPS) ---
    const stmtServicios = db.prepare("INSERT INTO servicios (nombre, categoria, contacto, promocion, descripcion, horario, direccion, lat, lng, imagen, imagen_extra) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    
    // 1. SABOR Y SAZÓN EXPRESS (Casco Central: 9.9100, -67.3550)
    stmtServicios.run(
        "Sabor y Sazón Express", "Pizzería / Rápida", "0414-1234567", "Refresco Gratis", 
        "Punto de encuentro favorito. Pizzas artesanales y la mejor comida rápida.",
        "11:00 AM - 10:00 PM", "Casco Central.", 
        9.9100, -67.3550, 
        "/images/sabor.jpg", "/images/sabor.jpg"
    );

    // 2. POLLO A LA BROSTER MI COMIDA (Av Bolívar: 9.9090, -67.3560)
    stmtServicios.run(
        "Pollo a la Broster Mi Comida", "Comida Rápida", "0412-1234567", "Combo Familiar", 
        "Sabor tradicional en San Juan. Pollo crujiente y jugoso.",
        "11:00 AM - 10:00 PM", "Av. Bolívar / Centro.", 
        9.9090, -67.3560, 
        "/images/broster_micomida.jpg", "/images/broster_micomida.jpg"
    );

    // 3. TROPIPIZZA (Calle Mellado: 9.9105, -67.3580)
    stmtServicios.run(
        "Tropipizza", "Pizzería", "0246-4310000", "Refresco 2L", 
        "Pizzería emblemática. Masa gruesa, full ingredientes y ambiente familiar.",
        "12:00 PM - 11:00 PM", "Calle Mellado / Centro.", 
        9.9105, -67.3580, 
        "/images/tropipizza.jpg", "/images/tropipizza.jpg"
    );

    // 4. REST. EL CABALLO ESPAÑOL (Av Los Llanos: 9.9000, -67.3500)
    stmtServicios.run(
        "Rest. El Caballo Español", "Internacional", "0246-4318888", "Paella Domingos", 
        "Un rincón de España en el llano. Paellas y mariscos frescos.",
        "12:00 PM - 10:00 PM", "Av. Los Llanos.", 
        9.9000, -67.3500, 
        "/images/caballo.jpg", "/images/caballo.jpg"
    );

    // 5. ASOBROSTE (Zona Centro: 9.9110, -67.3570)
    stmtServicios.run(
        "Asobroste", "Comida Rápida", "0414-9999999", "Pollo + Papas", 
        "La asociación del buen sabor. Pollo frito clásico.",
        "10:00 AM - 9:00 PM", "Zona Centro.", 
        9.9110, -67.3570, 
        "/images/asobroste.jpg", "/images/asobroste.jpg"
    );
    
    stmtServicios.finalize();
});

module.exports = db;