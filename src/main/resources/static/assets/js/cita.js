$(document).ready(function () {
    // Aquí puedes inicializar el plugin dataTables si lo necesitas
});

async function registrarCita() {
    let datos = {};
    datos.nombre = document.getElementById("txtNombre").value;
    datos.cedula = document.getElementById("txtCedula").value;
    datos.email = document.getElementById("txtEmail").value;
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
        window.location.href = "index.html";
    } else {
        alert("Hubo un error en el registro de cita. Por favor, intenta nuevamente.");
    }
}