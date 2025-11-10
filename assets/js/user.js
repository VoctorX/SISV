document.addEventListener('DOMContentLoaded', () => {
    // --- VERIFICACIÓN DE SESIÓN ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // --- OBTENER Y MOSTRAR DATOS DEL USUARIO ---
    const user = JSON.parse(loggedInUser);
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const phoneInput = document.getElementById('user-phone');
    const internalIdInput = document.getElementById('user-internal-id');

    nameInput.value = user.name || '';
    emailInput.value = user.email || ''; 
    phoneInput.value = user.telefono || ''; 
    internalIdInput.value = user.idinterno || '';
    // --- LÓGICA PARA GUARDAR CAMBIOS ---
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => {
        // Guardar el texto original del botón
        const originalButtonText = saveButton.textContent;
        saveButton.textContent = 'Guardando...';
        saveButton.disabled = true;

        // 1. Actualizar el objeto de usuario con los nuevos valores
        const updatedUser = {
            ...user, // Copia todas las propiedades existentes (como email y password)
            name: nameInput.value.trim(),
            telefono: phoneInput.value.trim(),
            idinterno: internalIdInput.value.trim()
        };

        // 2. Actualizar la lista de usuarios en localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        // 3. Actualizar la sesión actual en sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        // Mostrar mensaje de éxito y restaurar el botón
        setTimeout(() => {
            saveButton.textContent = '¡Guardado!';
            setTimeout(() => {
                saveButton.textContent = originalButtonText;
                saveButton.disabled = false;
            }, 1500);
        }, 500);
    });

    // --- LÓGICA DE CERRAR SESIÓN ---
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});
