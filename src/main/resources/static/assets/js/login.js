$(document).ready(function () {

});

async function iniciarSesion() {
    let datos = {};
    datos.email = document.getElementById("txtCorreo").value;
    datos.password = document.getElementById("txtPassword").value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(datos)
    });
    const respuesta = await request.text();
    console.log(respuesta);

    if (respuesta === "ENCONTRADO") {
        alert("Usuario Logueado")
        localStorage.email = datos.email;
        localStorage.password = datos.password;
        location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos, intente de nuevo");
    }
}