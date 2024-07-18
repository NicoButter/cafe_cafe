document.addEventListener('DOMContentLoaded', cargarUsuarios);
// -- Crear modal -- //
let modificarModal;

document.addEventListener('DOMContentLoaded', function() {
    modificarModal = new bootstrap.Modal(document.getElementById('modificarModal'));
    cargarUsuarios();
});
// ----------------------------------------- //
// -- Cargar usuarios -- //
function cargarUsuarios() {

    fetch('/usuariosAdministrador-1.0/GestionUsuariosServlet')
        .then(response => response.json())
        .then(usuarios => {
            console.log(usuarios)
            const tbody = document.querySelector('#usuariosTable tbody');
            tbody.innerHTML = '';
            usuarios.forEach(usuario => {
                const fechaFormateada = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
                tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.password}</td>
                        <td>${fechaFormateada}</td>
                        <!-- <td>${usuario.fechaNacimiento}</td> -->
                        <td>${usuario.pais}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="mostrarModificarModal(${usuario.id})">Modificar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
}

// -------------------------------------------------------------- //
// -- Mostrar y modificar el modal -- //

function mostrarModificarModal(id) {
    fetch(`/usuariosAdministrador-1.0/GestionUsuariosServlet?id=${id}`)
        .then(response => response.json())
        .then(usuario => {
            //console.log(usuario)
            document.getElementById('userId').value = usuario.id;
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('apellido').value = usuario.apellido;
            document.getElementById('email').value = usuario.email;
            document.getElementById('password').value = usuario.password;
            document.getElementById('fechaNacimiento').value = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];
            //document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;
            document.getElementById('pais').value = usuario.pais;
            modificarModal.show();
        })
        .catch(error => console.error('Error:', error));
}



function guardarModificacion() {
    const usuario = {
        id: document.getElementById('userId').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value
    };

    fetch('/usuariosAdministrador-1.0/GestionUsuariosServlet', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
        //método en JavaScript que convierte un objeto JavaScript en una cadena JSON.
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.exito)
        if (data.exito) {
            modificarModal.hide();
            cargarUsuarios();
        } else {
            alert('Error al modificar el usuario');
        }
    })
    .catch(error => console.error('Error:', error));
}

// -----------------------------------------------------
// -- Eliminar usuario -- //

function eliminarUsuario(id) {
    //función que muestra un cuadro de diálogo con un mensaje y botones "Aceptar" y "Cancelar"
    //Devuelve true si el usuario hace clic en "Aceptar" y false si hace clic en "Cancelar".
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        fetch(`/usuariosAdministrador-1.0/GestionUsuariosServlet?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.exito)
                if (data.exito) {
                    cargarUsuarios();
                } else {
                    alert('Error al eliminar el usuario');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

function agregarUsuario() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombreAgregar').value;
    const apellido = document.getElementById('apellidoAgregar').value;
    const email = document.getElementById('emailAgregar').value;
    const password = document.getElementById('passwordAgregar').value;

    // Obtener y depurar la fecha de nacimiento
    const fechaNacimientoInput = document.getElementById('fechaNacimientoAgregar').value;
    console.log('Fecha de nacimiento original:', fechaNacimientoInput);

    const fechaNacimiento = formatDate(fechaNacimientoInput); // Función de formato
    console.log('Fecha de nacimiento formateada:', fechaNacimiento);

    const pais = document.getElementById('paisAgregar').value;

    // Crear el objeto usuario
    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password,
        fechaNacimiento: fechaNacimiento,
        pais: pais
    };

    // Convertir el objeto usuario a JSON y imprimirlo en la consola
    const usuarioJSON = JSON.stringify(usuario);
    console.log('JSON enviado:', usuarioJSON);

    // Enviar la solicitud POST
    fetch('/usuariosAdministrador-1.0/GestionUsuariosServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: usuarioJSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.exito) {
            document.getElementById('agregarModal').classList.remove('show');
            document.getElementById('agregarModal').style.display = 'none';
            cargarUsuarios(); // Recarga la lista de usuarios
        } else {
            alert('Error al agregar el usuario');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Función para convertir la fecha al formato YYYY-MM-DD o verificar si ya está en el formato correcto
function formatDate(dateString) {
    // Si la fecha ya está en el formato YYYY-MM-DD, devolverla sin cambios
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateString;
    }

    // Intentar convertir desde DD/MM/YYYY a YYYY-MM-DD
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) {
        console.error('Fecha no válida:', dateString);
        return null;
    }
    return `${year}-${month}-${day}`;
}



