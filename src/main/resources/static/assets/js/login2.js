const   btnSignIn = document.getElementById("Sign-in"),
        btnSignUp = document.getElementById("Sign-up"),
        formRegister = document.querySelector(".register"),
        formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");

})

btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formLogin.classList.add("hide")
    formRegister.classList.remove("hide");

    document.querySelector('.campo span').addEventListener('click', e => {
        const passwordInput = document.querySelector('#password');
        if (e.target.classList.contains('show')) {
            e.target.classList.remove('show');
            e.target.textContent = 'Ocultar';
            passwordInput.type = 'text';
        } else {
            e.target.classList.add('show');
            e.target.textContent = 'Mostrar';
            passwordInput.type = 'password';
        }
    });
})
