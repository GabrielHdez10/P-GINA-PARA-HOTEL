window.onload = function() {
    console.log("¡JavaScript cargado correctamente! 🚀");

    const container = document.getElementById('slider-container');
    const next = document.getElementById('nextBtn');
    const prev = document.getElementById('prevBtn');

    if (!container || !next || !prev) {
        console.error("No se encontró el slider o sus botones. Revisa los IDs en el HTML.");
        return;
    }

    const imgs = container.querySelectorAll('img');

    if (imgs.length === 0) {
        console.error("No se encontraron imágenes dentro del slider.");
        return;
    }

    let index = 0;

    next.addEventListener('click', () => {
        index = (index + 1) % imgs.length;
        container.style.transform = `translateX(-${index * 100}%)`;
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + imgs.length) % imgs.length;
        container.style.transform = `translateX(-${index * 100}%)`;
    });
};