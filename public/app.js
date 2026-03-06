document.addEventListener("DOMContentLoaded", () => {
    // 1. Ya no buscamos el marcador, buscamos la escena completa
    const scene = document.querySelector('a-scene');
    const boton = document.querySelector('#mi-boton');
    const textoEstado = document.querySelector('#texto-estado');

    const modelos = [
        './3d_models/biblio.glb',
        './3d_models/Juego monos.glb' 
    ];
    let indiceActual = 0;
    let modeloActual = null; 

    // 2. Coordenadas donde quieres que aparezca el edificio
    // IMPORTANTE: Cambia esto por las coordenadas exactas de donde vayas a estar parado
    const latitudDestino = 19.2833; 
    const longitudDestino = -99.6500;

    function cargarModelo(indice) {
        if (modeloActual !== null) {
            scene.removeChild(modeloActual);
        }

        const nuevoModelo = document.createElement('a-entity');
        nuevoModelo.setAttribute('gltf-model', `url(${modelos[indice]})`);
        
        // La escala dependerá de cómo exportaste tu .glb, 1 1 1 es el tamaño real
        nuevoModelo.setAttribute('scale', '1 1 1'); 
        
        // 3. LA MAGIA: En lugar de 'position', usamos 'gps-entity-place'
        nuevoModelo.setAttribute('gps-entity-place', `latitude: ${latitudDestino}; longitude: ${longitudDestino};`);

        // Añadimos el modelo a la escena principal
        scene.appendChild(nuevoModelo);
        modeloActual = nuevoModelo;
        
        textoEstado.innerText = "¡Edificio proyectado en el mapa!";
    }

    // Cargamos el primer modelo
    cargarModelo(indiceActual);

    // Lógica del botón para cambiar de edificio
    boton.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % modelos.length;
        cargarModelo(indiceActual);
        boton.innerText = "Cambiar Edificio (" + (indiceActual + 1) + "/" + modelos.length + ")";
    });
});