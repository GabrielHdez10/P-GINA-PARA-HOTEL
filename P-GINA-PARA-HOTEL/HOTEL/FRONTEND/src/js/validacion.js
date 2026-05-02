// Esperar a que el DOM esté completamente cargado para evitar errores de referencia
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Referencias a los elementos del DOM en reserva.html
    const form = document.getElementById('reservationForm');
    const nombreInput = document.getElementById('nombre');
    const fechaEntradaInput = document.getElementById('fechaEntrada');
    const fechaSalidaInput = document.getElementById('fechaSalida');
    const numPersonasInput = document.getElementById('numPersonas');
    const tipoHabitacionInput = document.getElementById('tipoHabitacion');

    // Configuración de fechas para validación
    const hoy = new Date();
    // Resetear horas para comparar solo fechas (YYYY-MM-DD)
    hoy.setHours(0, 0, 0, 0); 

    // Establecer la fecha mínima de entrada como "hoy" directamente en el HTML
    // Esto mejora la UX al bloquear fechas pasadas en el calendario nativo
    const hoyISO = hoy.toISOString().split('T')[0];
    fechaEntradaInput.setAttribute('min', hoyISO);

    // --- FUNCIONES DE UTILIDAD ---

    // Función para mostrar errores visuales usando Tailwind clases
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        // Buscar si ya existe un mensaje de error para no duplicarlo
        let errorDisplay = inputControl.parentElement.querySelector('.error-message');
        
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.className = 'error-message text-red-500 text-[10px] mt-2 pl-6 font-semibold uppercase tracking-widest';
            inputControl.parentElement.appendChild(errorDisplay);
        }
        
        errorDisplay.innerText = message;
        element.classList.add('border-red-500', 'ring-2', 'ring-red-100');
        element.classList.remove('border-gray-200', 'focus:ring-amber-200', 'focus:border-amber-400');
    };

    // Función para limpiar errores visuales
    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.parentElement.querySelector('.error-message');
        
        if (errorDisplay) {
            errorDisplay.remove();
        }
        
        element.classList.remove('border-red-500', 'ring-2', 'ring-red-100');
        element.classList.add('border-gray-200', 'focus:ring-amber-200', 'focus:border-amber-400');
    };

    // --- LÓGICA DE VALIDACIÓN PRINCIPAL ---

    const validateInputs = () => {
        // Obtener valores y limpiar espacios en blanco
        const nombreValue = nombreInput.value.trim();
        const fechaEntradaValue = fechaEntradaInput.value;
        const fechaSalidaValue = fechaSalidaInput.value;
        const numPersonasValue = numPersonasInput.value;
        const tipoHabitacionValue = tipoHabitacionInput.value;

        let isFormValid = true;

        // 1. Validación del Nombre
        if (nombreValue === '') {
            setError(nombreInput, 'El nombre es obligatorio');
            isFormValid = false;
        } else if (nombreValue.length < 3) {
            setError(nombreInput, 'El nombre debe tener al menos 3 caracteres');
            isFormValid = false;
        } else {
            setSuccess(nombreInput);
        }

        // 2. Validación de Fechas (Lógica de Negocio Compleja)
        if (fechaEntradaValue === '') {
            setError(fechaEntradaInput, 'Selecciona fecha de entrada');
            isFormValid = false;
        } else {
            const dateEntrada = new Date(fechaEntradaValue + 'T00:00:00'); // Forzar hora local
            if (dateEntrada < hoy) {
                setError(fechaEntradaInput, 'La fecha no puede ser en el pasado');
                isFormValid = false;
            } else {
                setSuccess(fechaEntradaInput);
            }
        }

        if (fechaSalidaValue === '') {
            setError(fechaSalidaInput, 'Selecciona fecha de salida');
            isFormValid = false;
        } else {
            const dateEntrada = new Date(fechaEntradaValue + 'T00:00:00');
            const dateSalida = new Date(fechaSalidaValue + 'T00:00:00');

            if (dateSalida <= dateEntrada) {
                setError(fechaSalidaInput, 'La salida debe ser después de la entrada');
                isFormValid = false;
            } else {
                setSuccess(fechaSalidaInput);
            }
        }

        // 3. Validación de Número de Personas
        if (numPersonasValue === '' || numPersonasValue < 1) {
            setError(numPersonasInput, 'Mínimo 1 persona');
            isFormValid = false;
        } else if (numPersonasValue > 6) {
            setError(numPersonasInput, 'Máximo 6 personas por habitación');
            isFormValid = false;
        } else {
            setSuccess(numPersonasInput);
        }

        // 4. Validación de Tipo de Habitación
        if (tipoHabitacionValue === '') {
            setError(tipoHabitacionInput, 'Selecciona una habitación');
            isFormValid = false;
        } else {
            setSuccess(tipoHabitacionInput);
        }

        return isFormValid;
    };

    // --- EVENTO SUBMIT DEL FORMULARIO ---

    form.addEventListener('submit', e => {
        // Detener el envío automático para validar primero
        e.preventDefault();

        // Ejecutar validación
        if (validateInputs()) {
            // SI EL FORMULARIO ES VÁLIDO:
            console.log("Formulario válido. Preparando envío al Cloud Backend... ☁️");
            
            // Aquí iría la lógica Fetch/AJAX para enviar al backend en puerto 3000
            // Por ahora simularemos éxito con una alerta estética
            alert("¡Solicitud enviada! Revisaremos disponibilidad y te contactaremos pronto. 🌴");
            
            // Opcional: reiniciar el formulario
            // form.reset(); 
        } else {
            // SI HAY ERRORES:
            console.log("Formulario inválido. Se detuvo el envío.");
            // Opcional: scroll automático al primer error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    console.log("Punto 11: validacion.js cargado y protegiendo el formulario 🛡️");
});