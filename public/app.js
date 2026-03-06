document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleccionamos el marcador por su ID
    const marker = document.querySelector('#mi-marcador');

    // 2. Creamos una nueva entidad de A-Frame
    const modeloPersonalizado = document.createElement('a-entity');

    // 3. Le indicamos la ruta del archivo .glb
    // Asegúrate de cambiar 'tu-modelo.glb' por el nombre exacto de tu archivo
    modeloPersonalizado.setAttribute('gltf-model', 'url(./3d_models/Juego monos.glb)');

    // 4. Ajustes cruciales: Escala, Posición y Rotación
    // Nota: Los archivos .glb suelen venir con escalas extremas (muy gigantes o microscópicos).
    // Si no ves tu modelo a la primera, juega con estos valores.
    modeloPersonalizado.setAttribute('scale', '0.5 0.5 0.5'); // Mitad de su tamaño original
    modeloPersonalizado.setAttribute('position', '0 0 0'); // Centrado en el marcador
    modeloPersonalizado.setAttribute('rotation', '90 0 0'); // Rotación en grados (X Y Z)

    // 5. Añadimos el modelo al marcador
    marker.appendChild(modeloPersonalizado);
    
    console.log("¡Modelo inyectado con JS!");
});