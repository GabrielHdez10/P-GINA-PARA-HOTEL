document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    // Escuchamos el evento de envío
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Capturamos los valores del formulario
        const nombre = document.getElementById('contact-nombre').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const asunto = document.getElementById('contact-asunto').value.trim();
        const mensaje = document.getElementById('contact-mensaje').value.trim();

        // 2. Preparamos el objeto para Firestore
        const datosSugerencia = {
            nombre: nombre,
            email: email,
            asunto: asunto,
            mensaje: mensaje,
            fecha: new Date().toISOString(), // Usamos ISO para ordenar fácil en el panel de Firebase
            atendido: false // Esto te sirve para llevar control en el hotel
        };

        try {
            console.log("Enviando sugerencia privada a la nube... ");
            
            // 3. Guardamos en la nueva colección 'sugerencias'
            // Usamos las funciones que expusimos globalmente en el index.html
            await window.addDoc(window.collection(window.db, "sugerencias"), datosSugerencia);
            
            // 4. Feedback al usuario
            alert("Gracias, " + nombre + "! Tu mensaje ha sido enviado directamente a la administración del hotel. Muchas gracias por tu sugerencia!");
            
            // Limpiamos el formulario
            contactForm.reset();

        } catch (error) {
            console.error("Error al enviar:", error);
            alert("Lo sentimos, hubo un problema técnico. Intenta contactarnos por WhatsApp.");
        }
    });
});