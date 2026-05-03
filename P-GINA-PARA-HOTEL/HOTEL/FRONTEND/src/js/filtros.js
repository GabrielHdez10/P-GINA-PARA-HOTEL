document.addEventListener('DOMContentLoaded', () => {
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroPrecio = document.getElementById('filtro-precio');
    const tarjetas = document.querySelectorAll('.habitacion-card');

    const filtrarHabitaciones = () => {
        const tipoSeleccionado = filtroTipo.value;
        const precioSeleccionado = filtroPrecio.value;

        tarjetas.forEach(tarjeta => {
            const tipo = tarjeta.getAttribute('data-tipo');
            const precio = parseInt(tarjeta.getAttribute('data-precio'));

            let coincideTipo = (tipoSeleccionado === 'todos' || tipo === tipoSeleccionado);
            let coincidePrecio = true;

            if (precioSeleccionado === 'bajo') {
                coincidePrecio = (precio < 1800);
            } else if (precioSeleccionado === 'alto') {
                coincidePrecio = (precio >= 1800);
            }

            if (coincideTipo && coincidePrecio) {
                tarjeta.style.display = 'block';
                // Opcional: añadir una pequeña animación de Tailwind
                tarjeta.classList.add('animate-fade-in'); 
            } else {
                tarjeta.style.display = 'none';
            }
        });
    };

    filtroTipo.addEventListener('change', filtrarHabitaciones);
    filtroPrecio.addEventListener('change', filtrarHabitaciones);
});