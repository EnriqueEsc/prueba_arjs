document.addEventListener("DOMContentLoaded", () => {
    const marker = document.querySelector('#mi-marcador');
    const boton = document.querySelector('#mi-boton');

    const modelos = [
        './3d_models/Juego monos.glb',
        './3d_models/biblio.glb' 
    ];
    let indiceActual = 0;
    
    // Usaremos esta variable para saber cuál es el modelo que está en pantalla
    let modeloActual = null; 

    // Creamos una función encargada de hacer todo el trabajo sucio
    function cargarModelo(indice) {
        // 1. Si ya existe un modelo en pantalla, lo borramos primero
        if (modeloActual !== null) {
            marker.removeChild(modeloActual);
        }

        // 2. Creamos una entidad 3D totalmente nueva
        const nuevoModelo = document.createElement('a-entity');
        
        // 3. Le asignamos la ruta del modelo correspondiente
        nuevoModelo.setAttribute('gltf-model', `url(${modelos[indice]})`);
        
        // ¡OJO AQUÍ! Podrías necesitar escalas diferentes para cada modelo
        nuevoModelo.setAttribute('scale', '0.5 0.5 0.5'); 
        nuevoModelo.setAttribute('position', '0 0 0'); 
        nuevoModelo.setAttribute('rotation', '-90 0 0'); 

        // 4. Añadimos el nuevo modelo al marcador
        marker.appendChild(nuevoModelo);
        
        // 5. Guardamos la referencia para poder borrarlo la próxima vez
        modeloActual = nuevoModelo;
    }

    // Inicializamos la app cargando el primer modelo (índice 0)
    cargarModelo(indiceActual);
    console.log("¡Modelo inicial cargado!");

    // Lógica del botón
    boton.addEventListener('click', () => {
        // Calculamos el siguiente índice
        indiceActual = (indiceActual + 1) % modelos.length;
        
        // Llamamos a la función para que destruya el viejo y cree el nuevo
        cargarModelo(indiceActual);
        
        boton.innerText = "Cambiar Modelo (" + (indiceActual + 1) + "/" + modelos.length + ")";
        console.log(`Modelo cambiado a: ${modelos[indiceActual]}`);
    });
});