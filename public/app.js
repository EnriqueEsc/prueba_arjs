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
        nuevoModelo.setAttribute('scale', '10 10 10'); 
        
        // Colocamos el modelo en las coordenadas calculadas
        nuevoModelo.setAttribute('gps-entity-place', `latitude: ${latitud}; longitude: ${longitud};`);

        scene.appendChild(nuevoModelo);
        modeloActual = nuevoModelo;
        
        textoEstado.innerText = "¡Modelo proyectado a 15m de ti!";
    }
    
    // 1. DEFINIMOS LAS COORDENADAS FIJAS
    const latitudFija = 19.28154568552579;
    const longitudFija = -99.67775975950951;

    textoEstado.innerText = "Cargando modelo en la ubicación asignada...";
    console.log(`Destino del modelo fijado en: ${latitudFija}, ${longitudFija}`);

    // 2. Cargamos el modelo directamente ahí
    inyectarModeloEnUbicacion(latitudFija, longitudFija);
    textoEstado.innerText = "¡Modelo anclado en posición fija!";

    // Opcional: Solo si quieres verificar que el GPS del usuario está activo,
    // puedes dejar un "listener" en segundo plano, pero ya no lo usamos para mover el modelo.
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
            (position) => {
                console.log(`Tu posición actual: ${position.coords.latitude}, ${position.coords.longitude}`);
                // Aquí podrías calcular la distancia entre el usuario y el modelo si quisieras
            }, 
            (error) => console.error("Error GPS:", error),
            { enableHighAccuracy: true }
        );
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
            nuevoModelo.setAttribute('scale', '10 10 10'); // Mantén la escala pequeña
            nuevoModelo.setAttribute('gps-entity-place', gpsAnterior); // Reutilizamos las coordenadas
            
            scene.appendChild(nuevoModelo);
            modeloActual = nuevoModelo;
            
            boton.innerText = "Cambiar Modelo (" + (indiceActual + 1) + "/" + modelos.length + ")";
        }
    });
});