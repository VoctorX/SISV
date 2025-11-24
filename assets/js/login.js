document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    const signupFormElement = document.querySelector('#signupForm form');
    const loginFormElement = document.querySelector('#loginForm form');
    const operatorFields = document.getElementById('operator-fields');
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    
    userTypeRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        if (event.target.value === 'operador') {
            operatorFields.classList.remove('hidden');
        } else {
            operatorFields.classList.add('hidden');
            document.getElementById('signup-codigo-interno').value = '';
            document.getElementById('signup-sexo').value = '';
            document.getElementById('signup-edad').value = '';
            document.getElementById('signup-idcargo').value = '1';
        }
    });
});

    signupFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('signup-name').value.trim();
        const id = document.getElementById('signup-id').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!email || !password || !name || !id) { 
            alert('Por favor, completa todos los campos para registrarte.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email || user.id === id); 

        if (userExists) {
            alert('Este correo electrónico o cédula ya está registrado. Por favor, inicia sesión.');
            return;
        }

        const userType = document.querySelector('input[name="userType"]:checked').value;
        const newUser = {
            id: id,
            nombres: name,
            apellidos: '',
            email: email,
            password: password, 
            celular: '',
            nit: '',
            userType: userType,
            codigo_interno: '',
            sexo: '',
            edad: '',
            idcargo: ''
        };

        if (userType === 'operador') {
            newUser.codigo_interno = document.getElementById('signup-codigo-interno').value.trim();
            newUser.sexo = document.getElementById('signup-sexo').value.trim();
            newUser.edad = document.getElementById('signup-edad').value.trim();
            newUser.idcargo = document.getElementById('signup-idcargo').value;
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        signupFormElement.reset();
        showLogin();
    });

    loginFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert('Por favor, completa el reCAPTCHA para continuar.');
            return;
        }

        if (!email || !password) {
            alert('Por favor, ingresa tu correo y contraseña.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            alert('¡Inicio de sesión exitoso!');
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            window.location.href = 'home.html';
        } else {
            alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
    });
});
 
function showLogin(event) {
    if (event) event.preventDefault(); 
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}
 
function showSignup(event) {
    if (event) event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}