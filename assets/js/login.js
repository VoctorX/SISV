// --- SECURITY WARNING ---
// THIS PROTOTYPE USES localStorage AND STORES PASSWORDS IN PLAIN TEXT.
// THIS IS EXTREMELY INSECURE AND MUST NOT BE USED IN A PRODUCTION ENVIRONMENT.
// For a real application, use a secure backend with password hashing (e.g., bcrypt).

document.addEventListener('DOMContentLoaded', () => {
    // --- INITIAL FORM STATE ---
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';

    // --- DOM ELEMENT REFERENCES ---
    const signupFormElement = document.querySelector('#signupForm form');
    const loginFormElement = document.querySelector('#loginForm form');
    const operatorFields = document.getElementById('operator-fields');
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');

    // --- EVENT LISTENERS ---

    // Toggle operator fields visibility based on user type selection
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'operador') {
                operatorFields.style.display = 'block';
            } else {
                operatorFields.style.display = 'none';
            }
        });
    });

    // --- SIGN UP LOGIC ---
    signupFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!email || !password || !name) {
            alert('Por favor, completa todos los campos para registrarte.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Este correo electrónico ya está registrado. Por favor, inicia sesión.');
            return;
        }

        const userType = document.querySelector('input[name="userType"]:checked').value;

        // Create a base user object
        const newUser = {
            id: `user_${Date.now()}`,
            nombres: name,
            apellidos: '',
            email: email,
            password: password, // INSECURE: Storing plain text password
            celular: '',
            nit: '',
            userType: userType,
            codigo_interno: '',
            sexo: '',
            edad: '',
            idcargo: ''
        };

        // If the user is an 'operador', add the specific fields
        if (userType === 'operador') {
            newUser.codigo_interno = document.getElementById('signup-codigo-interno').value.trim();
            newUser.sexo = document.getElementById('signup-sexo').value.trim();
            newUser.edad = document.getElementById('signup-edad').value.trim();
            newUser.idcargo = document.getElementById('signup-idcargo').value;
        }

        users.push(newUser);
        // --- SECURITY WARNING ---
        // Storing user data, including the plain text password, in localStorage.
        // This is for prototype purposes only. DO NOT DO THIS IN PRODUCTION.
        localStorage.setItem('users', JSON.stringify(users));

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        signupFormElement.reset();
        operatorFields.style.display = 'none'; // Hide operator fields after reset
        showLogin();
    });

    // --- LOGIN LOGIC ---
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
        // --- SECURITY WARNING ---
        // Comparing plain text passwords. This is insecure.
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            alert('¡Inicio de sesión exitoso!');
            // Store user data in sessionStorage for the current session
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            window.location.href = 'home.html';
        } else {
            alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
    });
});
 
// --- FUNCIONES PARA ALTERNAR LA VISIBILIDAD DE LOS FORMULARIOS ---
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