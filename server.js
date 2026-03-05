const express = require('express');
const path = require('path');
const app = express();

// Render asigna un puerto en las variables de entorno, o usamos el 3000 localmente
const PORT = process.env.PORT || 3000;

// Servir la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor de AR corriendo en el puerto ${PORT}`);
});