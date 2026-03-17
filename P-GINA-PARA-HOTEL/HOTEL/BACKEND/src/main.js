window.onload = function() {
    console.log("¡JavaScript cargado correctamente! 🚀");

    const container = document.getElementById('slider-container');
    const next = document.getElementById('nextBtn');
    const prev = document.getElementById('prevBtn');
    const imgs = container.querySelectorAll('img');
    
    let index = 0;

    if (!container || imgs.length === 0) {
        console.error("No se encontró el contenedor o las imágenes. Revisa los IDs en el HTML.");
        return;
    }

    next.addEventListener('click', () => {
        index = (index + 1) % imgs.length;
        container.style.transform = `translateX(-${index * 100}%)`;
        console.log("Cambiando a imagen:", index);
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + imgs.length) % imgs.length;
        container.style.transform = `translateX(-${index * 100}%)`;
        console.log("Regresando a imagen:", index);
    });
};