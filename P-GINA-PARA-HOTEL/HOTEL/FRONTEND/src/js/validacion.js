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
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Validaciones previas
    if (nombreInput.value.trim().length < 3) {
        setError(nombreInput, 'Nombre demasiado corto');
        return;
    }
    setSuccess(nombreInput);

    // 2. Preparar los datos
    const habitacionSelect = tipoHabitacionInput.options[tipoHabitacionInput.selectedIndex];
    const datosReserva = {
        nombre: nombreInput.value,
        entrada: fechaEntradaInput.value,
        salida: fechaSalidaInput.value,
        personas: numPersonasInput.value,
        habitacion: habitacionSelect.text,
        total: document.getElementById('total-precio').innerText,
        fechaSolicitud: new Date().toISOString(),
        estado: 'pendiente'
    };

    try {
        console.log("Guardando en Firestore... ☁️");
        
        // 3. SE GUARDAN EN FIRESTORE (Colección 'reservas')
        const docRef = await window.addDoc(window.collection(window.db, "reservas"), datosReserva);
        console.log("Reserva guardada con ID: ", docRef.id);

        // 4. PREPARAR WHATSAPP
        const mensaje = `Hola Hotel Paradiso! 🌴%0A` +
                        `He solicitado una reserva:%0A` +
                        `*Folio:* ${docRef.id.substring(0,6)}%0A` +
                        `*Nombre:* ${datosReserva.nombre}%0A` +
                        `*Habitación:* ${datosReserva.habitacion}%0A` +
                        `*Total:* ${datosReserva.total}`;

        const urlWhatsapp = `https://wa.me/522282214830?text=${mensaje}`;

        // 5. REDIRIGIR A CONFIRMACIÓN (Punto 14)
        const queryParams = new URLSearchParams({
            nombre: datosReserva.nombre,
            habitacion: datosReserva.habitacion,
            entrada: datosReserva.entrada,
            salida: datosReserva.salida,
            total: datosReserva.total
        }).toString();

        // Abrir WhatsApp en pestaña nueva
        window.open(urlWhatsapp, '_blank');
        
        // Ir a confirmación en la misma pestaña
        window.location.href = `confirmacion.html?${queryParams}`;

    } catch (error) {
        console.error("Error al guardar en Cloud Firestore:", error);
        alert("Hubo un error al procesar tu reserva en la nube. Intenta de nuevo.");
    }
});

    console.log("Sistema del Hotel Paradiso Operativo 🛡️");
});