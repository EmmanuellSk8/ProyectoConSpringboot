cargarCitas();

function actualizarEmailDelUsuario() {
    document.getElementById("txt-email-usuario").outerHTML = localStorage.email;
}

async function cargarCitas() {
    try {
        const request = await fetch('api/citas', );


        const citas = await request.json();
        let listadoHtml = '';
        for (let cita of citas) {
            let citaHtml = '<tr><td>' + cita.nombre + '</td><td>' + cita.email + '</td><td>' + cita.cedula + '</td><td>' +
                cita.fecha + '</td><td>' + cita.especialidad + '</td><td>' + cita.doctor + '</td><td>' +
                ' <div class="botonBorrarCita"><button class="bi bi-trash" onclick="eliminarCita(' + cita.id + ')"></button></div>'
                + " " + ' <div class="botonEditarCita"><button class="fas fa-edit " onclick="editarCita(' + cita.id + ')"></button></div> ';

            listadoHtml += citaHtml;
        }

        document.querySelector("#citas tbody").outerHTML = listadoHtml;
    } catch (error) {
        console.log("error al cargar las citas: " + error);
    }
}



function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function eliminarCita(id) {

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
        confirmButtonText: 'Sí, eliminala!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true,
        confirmButtonColor: '#50C878',
        cancelButtonColor: '#cf142b'
    }).then(async (result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Tu cita ha sido eliminada.',
                'success'
            )
            await fetch('api/citas/' + id, {
                method: 'DELETE',
                headers: getHeaders()
            });
            cargarCitas();

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tu cita está segura :)',
                'error'
            )
        }

    })
}

async function buscarCita() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarCitas(busqueda);
}

async function editarCita(id) {
    // obtener información del usuario
    const request = await fetch('api/citas/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const cita = await request.json();

    const {value: formValues} = await Swal.fire({
        title: 'Editar cita',
        html:
            '<label for="swal-input1">Nombre: &#160</label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + cita.nombre + '">' +

            '<label for="swal-input2">Email: &#160 &#160 &#160</label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="email" value="' + cita.email + '">' +

            '<label for="swal-input3">Cédula: &#160</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="cedula" value="' + cita.cedula + '">' +

            '<label for="swal-input4">fecha: &#160  &#160</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="fecha" value="' + cita.fecha + '">' +

            '<label for="swal-input5">Especialidad:</label>' +
            '<input id="swal-input5" class="swal2-input" placeholder="especialidad" value="' + (cita.especialidad || '') + '">' +

            '<label for="swal-input6">doctor:</label>' +
            '<input id="swal-input6" class="swal2-input" placeholder="doctor" value="' + (cita.doctor || '') + '">',

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    });


    if (formValues) {
        const nombre = document.getElementById("swal-input1").value;
        const email = document.getElementById("swal-input2").value;
        const cedula = document.getElementById("swal-input3").value;
        const fecha = document.getElementById("swal-input4").value;
        const especialidad = document.getElementById("swal-input5").value;
        const doctor = document.getElementById("swal-input6").value;

        const nuevoCita = {
            nombre,
            email,
            cedula,
            fecha,
            especialidad,
            doctor,
        };

        // actualizar usuario
        const response = await fetch('api/citas/' + cita.id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(nuevoCita)
        });

        if (response.ok) {
            // si la actualización fue exitosa, mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Cita actualizada correctamente'
            }).then(() => {
                // recargar lista de usuarios
                cargarCitas();
            });
        } else {
            // si la actualización falló, mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo actualizar la cita'
            });
        }
    }
}

$(document).ready(function () {
    // Aquí puedes inicializar el plugin dataTables si lo necesitas
});

async function registrarCita() {
    let datos = {};
    datos.nombre = document.getElementById("txtNombre").value;
    datos.email = document.getElementById("txtEmail").value;
    datos.cedula = document.getElementById("txtCedula").value;
    datos.fecha = document.getElementById("txtFecha").value;
    datos.especialidad = document.getElementById("txtEspecialidad").value;
    datos.doctor = document.getElementById("txtDoctor").value;

    const request = await fetch('api/citas', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    if (request.ok) {
        alert("Cita registrada con éxito");
        window.location.href = "cita.html";
    } else {
        alert("Hubo un error en el registro de cita. Por favor, intenta nuevamente.");
    }
}