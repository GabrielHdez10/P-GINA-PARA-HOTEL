document.addEventListener('DOMContentLoaded', () => {
    // 1. REFERENCIAS AL DOM
    const form = document.getElementById('reservationForm');
    const nombreInput = document.getElementById('nombre');
    const fechaEntradaInput = document.getElementById('fechaEntrada');
    const fechaSalidaInput = document.getElementById('fechaSalida');
    const numPersonasInput = document.getElementById('numPersonas');
    const tipoHabitacionInput = document.getElementById('tipoHabitacion');
    const contenedorCosto = document.getElementById('detalle-costo');

    // 2. PRECIOS POR HABITACIÓN
    const precios = {
        'suite_paradiso': 2500,
        'doble_lujo': 1800,
        'estudio_paz': 1500
    };

    // 3. FUNCIÓN DE CÁLCULO DINÁMICO
    const calcularCostoTotal = () => {
        const entrada = fechaEntradaInput.value;
        const salida = fechaSalidaInput.value;
        const tipo = tipoHabitacionInput.value;

        if (entrada && salida && tipo) {
            const f1 = new Date(entrada + 'T00:00:00'); 
            const f2 = new Date(salida + 'T00:00:00');
            
            const diferencia = f2 - f1;
            const noches = Math.floor(diferencia / (1000 * 60 * 60 * 24));

            if (noches > 0) {
                const total = noches * precios[tipo];
                document.getElementById('resumen-noches').innerText = `${noches} ${noches === 1 ? 'noche' : 'noches'}`;
                document.getElementById('total-precio').innerText = `$${total.toLocaleString('es-MX')}.00`;
                contenedorCosto.classList.remove('hidden');
            } else {
                contenedorCosto.classList.add('hidden');
            }
        }
    };

    // 4. EVENTOS PARA CÁLCULO
    fechaEntradaInput.addEventListener('change', calcularCostoTotal);
    fechaSalidaInput.addEventListener('change', calcularCostoTotal);
    tipoHabitacionInput.addEventListener('change', calcularCostoTotal);

    // 5. LÓGICA DE VALIDACIÓN (Punto 11)
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        let errorDisplay = inputControl.querySelector('.error-message');
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.className = 'error-message text-red-500 text-[10px] mt-1 font-bold uppercase';
            inputControl.appendChild(errorDisplay);
        }
        errorDisplay.innerText = message;
        element.classList.add('border-red-500');
    };

    const setSuccess = element => {
        const errorDisplay = element.parentElement.querySelector('.error-message');
        if (errorDisplay) errorDisplay.remove();
        element.classList.remove('border-red-500');
    };

    // --- EVENTO SUBMIT ACTUALIZADO PARA WHATSAPP ---
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Ejecutamos la validación (Punto 11)
        let isValid = true; 
        if (nombreInput.value.trim().length < 3) {
            setError(nombreInput, 'Nombre demasiado corto');
            isValid = false;
        } else { 
            setSuccess(nombreInput); 
        }

        if (isValid) {
            // 1. CAPTURAR DATOS PARA EL MENSAJE
            const nombre = nombreInput.value;
            const entrada = fechaEntradaInput.value;
            const salida = fechaSalidaInput.value;
            const personas = numPersonasInput.value;
            const habitacion = tipoHabitacionInput.options[tipoHabitacionInput.selectedIndex].text;
            const total = document.getElementById('total-precio').innerText;

            // 2. FORMATEAR EL MENSAJE (UTF-8 para que WhatsApp entienda espacios y emojis)
            const mensaje = `Hola Hotel Paradiso! %0A` +
                            `Quisiera realizar una reserva:%0A` +
                            `*Nombre:* ${nombre}%0A` +
                            `*Habitación:* ${habitacion}%0A` +
                            `*Entrada:* ${entrada}%0A` +
                            `*Salida:* ${salida}%0A` +
                            `*Personas:* ${personas}%0A` +
                            `*Total estimado:* ${total}`;

            const telefono = "522282214830";
            const url = `https://wa.me/${telefono}?text=${mensaje}`;

            // 3. REDIRECCIÓN
            console.log("Redirigiendo a WhatsApp... 🚀");
            window.open(url, '_blank');
        }
    });

    console.log("Sistema del Hotel Paradiso Operativo 🛡️");
});