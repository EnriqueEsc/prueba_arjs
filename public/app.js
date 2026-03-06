document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleccionamos el marcador y el botón
    const marker = document.querySelector('#mi-marcador');
    const boton = document.querySelector('#mi-boton'); // Asegúrate de que el ID coincida con tu HTML

    // 2. Creamos una lista con las rutas de tus modelos
    // Cambia "Otro modelo.glb" por el nombre real de tu segundo archivo
    const modelos = [
        './3d_models/Juego monos.glb',
        './3d_models/biblio.glb' 
    ];
    let indiceActual = 0; // Esta variable nos dirá qué modelo estamos mostrando

    // 3. Creamos la entidad de A-Frame
    const modeloPersonalizado = document.createElement('a-entity');

    // 4. Cargamos el modelo inicial (el índice 0) y sus ajustes
    modeloPersonalizado.setAttribute('gltf-model', `url(${modelos[indiceActual]})`);
    modeloPersonalizado.setAttribute('scale', '0.5 0.5 0.5'); 
    modeloPersonalizado.setAttribute('position', '0 0 0'); 
    modeloPersonalizado.setAttribute('rotation', '-90 0 0'); 

    // 5. Añadimos el modelo al marcador
    marker.appendChild(modeloPersonalizado);
    console.log("¡Modelo inicial inyectado!");

    // 6. Lógica del botón para cambiar el modelo
    boton.addEventListener('click', () => {
        // Sumamos 1 al índice. El operador % hace que vuelva a 0 cuando llega al final de la lista
        indiceActual = (indiceActual + 1) % modelos.length;
        
        // Actualizamos la ruta del modelo en la entidad
        modeloPersonalizado.setAttribute('gltf-model', `url(${modelos[indiceActual]})`);
        modeloPersonalizado.setAttribute('scale', '0.5 0.5 0.5'); 
        modeloPersonalizado.setAttribute('position', '0 0 0'); 
        modeloPersonalizado.setAttribute('rotation', '-90 0 0'); 
        
        // Opcional: Cambiar el texto del botón para dar retroalimentación
        boton.innerText = "Cambiar Modelo (" + (indiceActual + 1) + "/" + modelos.length + ")";
        
        console.log(`Modelo cambiado a: ${nuevaRuta}`);
    });
});