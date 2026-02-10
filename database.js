const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'gtt_turismo.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    else console.log('--> BD Guárico TechTur Conectada');
});

db.serialize(() => {
    // LIMPIEZA
    db.run("DROP TABLE IF EXISTS atractivos");
    db.run("DROP TABLE IF EXISTS servicios");
    db.run("DROP TABLE IF EXISTS reportes");

    // TABLA 1: ATRACTIVOS
    db.run(`CREATE TABLE atractivos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT, tipo TEXT, descripcion TEXT, historia TEXT, tips TEXT, estado_ruta TEXT, coordenadas TEXT, imagen TEXT, imagen_secundaria TEXT
    )`);

    // TABLA 2: SERVICIOS (Expandida)
    db.run(`CREATE TABLE servicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT, 
        categoria TEXT, 
        contacto TEXT, 
        promocion TEXT, 
        descripcion TEXT,  -- Nuevo: Detalle del servicio
        horario TEXT,      -- Nuevo: 8:00 AM - 9:00 PM
        direccion TEXT,    -- Nuevo: Ubicación exacta
        mapa_url TEXT,     -- Nuevo: Link Google Maps
        imagen TEXT,
        imagen_extra TEXT  -- Nuevo: Foto del plato/habitación
    )`);
    
    db.run(`CREATE TABLE reportes (id INTEGER PRIMARY KEY, mensaje TEXT)`);

    // --- SEEDING (Datos) ---
    // 1. ATRACTIVOS (Los mismos de antes)
    const stmtAtractivos = db.prepare("INSERT INTO atractivos (nombre, tipo, descripcion, historia, tips, estado_ruta, coordenadas, imagen, imagen_secundaria) VALUES (?,?,?,?,?,?,?,?,?)");
    stmtAtractivos.run("Balneario El Castrero", "Naturaleza", "Aguas cristalinas.", "Historia del balneario...", "Llevar repelente.", "Habilitada", "https://goo.gl/maps/Castrero", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/El_Castrero.jpg/800px-El_Castrero.jpg", "https://mapio.net/images-p/12975326.jpg");
    stmtAtractivos.run("Monumento Sanjuanote", "Patrimonio", "El San Juan más alto.", "Historia del monumento...", "Ir al atardecer.", "Habilitada", "https://goo.gl/maps/Sanjuanote", "https://upload.wikimedia.org/wikipedia/commons/2/22/Sanjuanote.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/San_Juan_de_los_Morros.jpg/1280px-San_Juan_de_los_Morros.jpg");
    stmtAtractivos.run("Aguas Termales", "Salud", "Piscinas sulfurosas.", "Historia termal...", "Llevar traje baño viejo.", "Precaución", "https://goo.gl/maps/Termales", "https://hotelandes.com/wp-content/uploads/2017/04/aguas-termales.jpg", "https://hotelandes.com/wp-content/uploads/2017/04/aguas-termales.jpg");
    stmtAtractivos.finalize();

    // 2. SERVICIOS (Datos Nuevos Completos)
    const stmtServicios = db.prepare("INSERT INTO servicios (nombre, categoria, contacto, promocion, descripcion, horario, direccion, mapa_url, imagen, imagen_extra) VALUES (?,?,?,?,?,?,?,?,?,?)");
    
    // HOTEL LOS MORROS
    stmtServicios.run(
        "Hotel Los Morros", "Hospedaje", "0246-5551234", "10% OFF Turistas", 
        "Disfruta de la mejor estadía en el corazón de San Juan. Habitaciones con aire acondicionado, Wi-Fi de alta velocidad y desayuno criollo incluido.",
        "Recepción 24 Horas",
        "Av. Bolívar, frente a la Plaza Bolívar.",
        "https://goo.gl/maps/Hotel",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467790695.jpg?k=23075c3f915743407981328052150935574301646d755452d334515570530737&o=&hp=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/9e/2b/habitacion-doble.jpg?w=700&h=-1&s=1"
    );

    // RESTAURANTE EL LLANO
    stmtServicios.run(
        "Restaurante El Llano", "Gastronomía", "0414-1234567", "Jugo Gratis", 
        "La auténtica carne en vara llanera. Especialidad en cachapas con queso de mano y sancocho de res. Ambiente familiar con música en vivo los fines de semana.",
        "11:00 AM - 10:00 PM",
        "Calle Mellado, cruce con Av. Miranda.",
        "https://goo.gl/maps/Restaurante",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Carne_en_vara.jpg/1280px-Carne_en_vara.jpg",
        "https://pbs.twimg.com/media/D4z_5wWW4AA5j-_.jpg"
    );

    // TRANSPORTE
    stmtServicios.run(
        "Ruta Express Castrero", "Transporte", "0412-9876543", "Salida c/30min", 
        "Servicio de transporte rústico seguro y confiable para subir al balneario El Castrero. Conductores certificados y vehículos revisados.",
        "7:00 AM - 5:00 PM",
        "Terminal de Pasajeros, Andén 4.",
        "https://goo.gl/maps/Terminal",
        "https://upload.wikimedia.org/wikipedia/commons/2/27/Jeep_Wrangler_YJ_Rio_Grande_ar.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/27/Jeep_Wrangler_YJ_Rio_Grande_ar.jpg"
    );
    
    stmtServicios.finalize();
});

module.exports = db;