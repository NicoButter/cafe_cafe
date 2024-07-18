// todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded', () => {

    // selecciona el formulario del dom
    const formulario = document.querySelector('form');

    if (!formulario) {
        console.error('No se encontró el formulario en el DOM.');
        return;
    }

    // funcion mostrar error
    const mostrarError = (input, mensaje) => {
        // acceder al div contenedor
        const divPadre = input.parentNode;
        // encontrar el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        // agregar la clase de error al elemento padre
        divPadre.classList.add('error');
        // agregar mensaje de error
        errorText.innerText = mensaje;
    }

    // eliminar mensaje de error
    const eliminarError = input => {
        // acceder al la etiqueta contenedora
        const divPadre = input.parentNode;
        // eliminar la clase de error del elemento padre/contenedor
        divPadre.classList.remove('error');
        // encontrar el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        // establecer el texto como vacío
        errorText.innerText = '';
    }

    // funcion para corroborar si los campos están completos para quitar error
    formulario.querySelectorAll('input').forEach(input => {
        // se activa cuando el valor de un elemento del formulario cambia y se sale del elemento 
        input.addEventListener('change', () => {
            // obtener el valor del campo seleccionado
            const valor = input.value.trim(); // elimina cualquier espacio en blanco al principio y al final del valor obtenido.
            // condición para evaluar
            if (valor !== '') {
                eliminarError(input);
            }
        })
    });

    // funcion validar campo
    function validarCampo(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        if (!campo) {
            console.error(`No se encontró el campo con ID "${campoId}".`);
            return false;
        }
        const value = campo.value.trim();

        if (value === '') {
            mostrarError(campo, mensaje);
            return false; // indicamos que la validación falló
        } else {
            eliminarError(campo);
            return true; // indicamos que la validación ha sido exitosa
        }
    }

    // Función para validar un correo electrónico utilizando una expresión regular
    function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email); // devuelve true si la cadena coincide con el patrón de la expresión regular
    }

    // funcion para validar el campo de email
    function validarEmail(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        if (!campo) {
            console.error(`No se encontró el campo con ID "${campoId}".`);
            return false;
        }
        const email = campo.value.trim();

        // si el campo está vacío
        if (email === '') {
            mostrarError(campo, 'El correo electrónico es obligatorio');
            return false; // indicamos que la validación ha fallado
        } else if (!isEmail(email)) {
            mostrarError(campo, mensaje);
            return false; // indicamos que la validación ha fallado
        } else {
            eliminarError(campo);
            return true; // indicamos que la validación es exitosa
        }
    }

    // Selecciona el modal y el botón de cerrar
    const modal = document.getElementById('successModal');
    if (modal) {
        const span = modal.querySelector('.close');

        // Función para mostrar el modal
        function mostrarModal() {
            modal.style.display = 'block';
        }

        // Función para ocultar el modal
        if (span) {
            span.onclick = function() {
                modal.style.display = 'none';
            }
        } else {
            console.warn('No se encontró el botón de cerrar en el modal.');
        }

        // Cierra el modal si el usuario hace clic fuera del modal
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    } else {
        console.warn('El modal con ID "successModal" no se encontró en el DOM.');
    }

    // funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;

        // validar campo email
        validar = validarEmail('email', 'El correo electrónico no es válido') && validar;
        // validar contraseña
        validar = validarCampo('password', 'La contraseña es obligatoria') && validar;

        return validar;
    }

    // agregar un evento de escucha para cuando se envía el formulario
    formulario.addEventListener('submit', event => {
        if (!validarFormulario()) {
            // Mensaje no válido
            console.log("El formulario no es válido");
            event.preventDefault(); // Evita que el formulario se envíe si no es válido
        } else {
            console.log("El formulario es válido...");
            mostrarModal(); // Muestra el modal de éxito
            event.preventDefault(); // Evita el envío del formulario para demostración
        }
    });
});
