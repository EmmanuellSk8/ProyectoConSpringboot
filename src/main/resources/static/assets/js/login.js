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
function togglePasswordVisibility() {
    var passwordField = document.getElementById("txtPassword");
    var passwordToggle = document.querySelector(".password-toggle");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordToggle.innerHTML = "<i class='bx bx-hide'></i>"; // Cambia el ícono a ojo cerrado
    } else {
        passwordField.type = "password";
        passwordToggle.innerHTML = "<i class='bx bx-show'></i>"; // Cambia el ícono a ojo abierto
    }
}

function togglePassworddVisibility() {
    var passwordField = document.getElementById("txtPasswordd");
    var passwordToggle = document.querySelector(".password-toggle");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordToggle.innerHTML = "<i class='bx bx-hide'></i>"; // Cambia el ícono a ojo cerrado
    } else {
        passwordField.type = "password";
        passwordToggle.innerHTML = "<i class='bx bx-show'></i>"; // Cambia el ícono a ojo abierto
    }
}
