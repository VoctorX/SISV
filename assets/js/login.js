document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
 
    // --- LÓGICA DE REGISTRO (SIGN UP) ---
    const signupFormElement = document.querySelector('#signupForm form');
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
 
        users.push({ email: email, password: password, name: name });
        localStorage.setItem('users', JSON.stringify(users));
 
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        signupFormElement.reset();
        showLogin();
    });
 
    // --- LÓGICA DE INICIO DE SESIÓN (LOGIN) ---
    const loginFormElement = document.querySelector('#loginForm form');
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