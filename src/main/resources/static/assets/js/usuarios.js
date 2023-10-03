cargarUsuarios();

function actualizarEmailDelUsuario() {
    document.getElementById("txt-email-usuario").outerHTML = localStorage.email;
}

async function cargarUsuarios() {
    try {
        const request = await fetch('api/usuarios', );


        const usuarios = await request.json();
        let listadoHtml = '';
        for (let usuario of usuarios) {
            let usuarioHtml = '<tr><td>' + usuario.nombre + '</td><td>' + usuario.telefono + '</td><td>' +
                usuario.cedula + '</td><td>' + usuario.email + '</td><td>' + usuario.password + '</td><td>';
            listadoHtml += usuarioHtml;
        }

        document.querySelector("#usuarios tbody").outerHTML = listadoHtml;
    } catch (error) {
        alert('Error al cargar los usuarios');
    }
}



function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function eliminarUsuario(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertirlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminalo!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true,
        confirmButtonColor: '#50C878',
        cancelButtonColor: '#cf142b'
    }).then(async (result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Tu usuario ha sido eliminado.',
                'success'
            )
            await fetch('api/delUsuario/' + id, {
                method: 'DELETE',
                headers: getHeaders()
            });
            cargarUsuarios();

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tu usuario está seguro :)',
                'error'
            )
        }

    })
}

async function buscarUsuario() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarUsuarios(busqueda);
}

async function editarUsuario(id) {
    // obtener información del usuario
    const request = await fetch('api/getUsuario/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const usuario = await request.json();

    const {value: formValues} = await Swal.fire({
        title: 'Editar usuario',
        html:
            '<label for="swal-input1">Nombre: &#160</label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + usuario.nombre + '">' +
            '<label for="swal-input2">Apellido:</label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value="' + usuario.apellido + '">' +
            '<label for="swal-input3">Email:&#160 &#160 &#160</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + usuario.email + '">' +
            '<label for="swal-input4">Teléfono:</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" value="' + (usuario.telefono || '') + '">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    });


    if (formValues) {
        const nombre = document.getElementById("swal-input1").value;
        const apellido = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const telefono = document.getElementById("swal-input4").value;

        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            telefono
        };

        // actualizar usuario
        const response = await fetch('api/editUsuarios/' + usuario.id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(nuevoUsuario)
        });

        if (response.ok) {
            // si la actualización fue exitosa, mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente'
            }).then(() => {
                // recargar lista de usuarios
                cargarUsuarios();
            });
        } else {
            // si la actualización falló, mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo actualizar el usuario'
            });
        }
    }
}