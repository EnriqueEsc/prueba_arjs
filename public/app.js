document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector('a-scene');
    const boton = document.querySelector('#mi-boton');
    const textoEstado = document.querySelector('#texto-estado');

    const modelos = [
        './3d_models/biblio.glb',
        './3d_models/Juego monos.glb' 
    ];
    let indiceActual = 0;
    let modeloActual = null; 

    // Función para inyectar el modelo en una lat/lon específica
    function inyectarModeloEnUbicacion(latitud, longitud) {
        if (modeloActual !== null) {
            scene.removeChild(modeloActual);
        }

        const nuevoModelo = document.createElement('a-entity');
        nuevoModelo.setAttribute('gltf-model', `url(${modelos[indiceActual]})`);
        
        // Empieza con una escala pequeña por si el modelo es gigante
        nuevoModelo.setAttribute('scale', '0.05 0.05 0.05'); 
        
        // Colocamos el modelo en las coordenadas calculadas
        nuevoModelo.setAttribute('gps-entity-place', `latitude: ${latitud}; longitude: ${longitud};`);

        scene.appendChild(nuevoModelo);
        modeloActual = nuevoModelo;
        
        textoEstado.innerText = "¡Modelo proyectado a 15m de ti!";
    }

    // 1. OBTENEMOS TU UBICACIÓN ACTUAL
    if ('geolocation' in navigator) {
        textoEstado.innerText = "Calculando tu posición GPS...";
        
        navigator.geolocation.getCurrentPosition((position) => {
            const miLatitud = position.coords.latitude;
            const miLongitud = position.coords.longitude;
            
            // 2. MAGIA: Sumamos ~15 metros hacia el norte a tu latitud
            // 0.00015 grados de latitud son aproximadamente 15-18 metros
            const latitudDestino = miLatitud + 0.00015;
            const longitudDestino = miLongitud; // Misma longitud (recto hacia el norte)

            console.log(`Tu posición: ${miLatitud}, ${miLongitud}`);
            console.log(`Destino del modelo: ${latitudDestino}, ${longitudDestino}`);

            // 3. Cargamos el modelo allí
            inyectarModeloEnUbicacion(latitudDestino, longitudDestino);
            
        }, (error) => {
            textoEstado.innerText = "Error de GPS: Asegúrate de dar permisos.";
            console.error(error);
        }, {
            enableHighAccuracy: true, // Forzamos al celular a usar la máxima precisión
            maximumAge: 0
        });
    } else {
        textoEstado.innerText = "Tu navegador no soporta GPS.";
    }

    // Lógica del botón (ahora necesitamos la última lat/lon calculada para no perder la posición)
    boton.addEventListener('click', () => {
        if (modeloActual) {
            // Extraemos las coordenadas del modelo actual para poner el nuevo en el mismo lugar
            const gpsAnterior = modeloActual.getAttribute('gps-entity-place');
            
            indiceActual = (indiceActual + 1) % modelos.length;
            
            scene.removeChild(modeloActual);
            
            const nuevoModelo = document.createElement('a-entity');
            nuevoModelo.setAttribute('gltf-model', `url(${modelos[indiceActual]})`);
            nuevoModelo.setAttribute('scale', '0.05 0.05 0.05'); // Mantén la escala pequeña
            nuevoModelo.setAttribute('gps-entity-place', gpsAnterior); // Reutilizamos las coordenadas
            
            scene.appendChild(nuevoModelo);
            modeloActual = nuevoModelo;
            
            boton.innerText = "Cambiar Modelo (" + (indiceActual + 1) + "/" + modelos.length + ")";
        }
    });
});