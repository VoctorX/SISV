document.addEventListener('DOMContentLoaded', () => {
    // --- VERIFICACIÓN DE SESIÓN ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // --- ANIMACIÓN DE ENTRADA ---
    const profileCard = document.getElementById('profile-card');
    profileCard.classList.add('animate-fade-in-slide-up');

    // --- OBTENER Y MOSTRAR DATOS DEL USUARIO ---
    const user = JSON.parse(loggedInUser);

    // --- ACTUALIZAR TÍTULO DINÁMICAMENTE ---
    const profileTitle = document.getElementById('profile-title');
    if (user.userType === 'operador') {
        profileTitle.textContent = 'Perfil de Operador';
    } else if (user.userType === 'externo') {
        profileTitle.textContent = 'Perfil de Externo';
    }
    // Si no tiene tipo, se queda el título por defecto "Perfil de Usuario".
    
    // Campos comunes
    const idInput = document.getElementById('user-id');
    const nombresInput = document.getElementById('user-nombres');
    const apellidosInput = document.getElementById('user-apellidos');
    const emailInput = document.getElementById('user-email');
    const celularInput = document.getElementById('user-celular');
    const nitInput = document.getElementById('user-nit');

    // Campos de operador
    const panelOperador = document.getElementById('panel-operador');
    const codigoInternoInput = document.getElementById('user-codigo-interno');
    const sexoInput = document.getElementById('user-sexo');
    const edadInput = document.getElementById('user-edad');
    const idCargoInput = document.getElementById('user-idcargo');

    // Rellenar campos comunes
    idInput.value = user.id || 'No asignado'; // Muestra el ID o un texto por defecto
    nombresInput.value = user.nombres || '';
    apellidosInput.value = user.apellidos || '';
    emailInput.value = user.email || ''; 
    celularInput.value = user.celular || ''; 
    nitInput.value = user.nit || '';

    // --- LÓGICA DE VISIBILIDAD POR TIPO DE USUARIO ---
    if (user.userType === 'operador') {
        // 1. Mostrar la pestaña y el panel de operador
        document.getElementById('tab-operador').classList.remove('hidden');
        
        // 2. Rellenar sus campos específicos
        codigoInternoInput.value = user.codigo_interno || '';
        sexoInput.value = user.sexo || '';
        edadInput.value = user.edad || '';
        idCargoInput.value = user.idcargo || '';
    }

    // --- LÓGICA DE PESTAÑAS (TABS) ---
    const tabPerfil = document.getElementById('tab-perfil');
    const tabOperador = document.getElementById('tab-operador');
    const panelPerfil = document.getElementById('panel-perfil');

    const setActiveTab = (activeTab, activePanel) => {
        // Resetear todos
        [tabPerfil, tabOperador].forEach(tab => {
            tab.classList.remove('border-black', 'text-black');
            tab.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
        });
        [panelPerfil, panelOperador].forEach(panel => panel.classList.add('hidden'));

        // Activar el seleccionado
        activeTab.classList.add('border-black', 'text-black');
        activeTab.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
        activePanel.classList.remove('hidden');
    };

    tabPerfil.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveTab(tabPerfil, panelPerfil);
    });

    if (user.userType === 'operador') {
        tabOperador.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveTab(tabOperador, panelOperador);
        });
    }

    // --- LÓGICA PARA GUARDAR CAMBIOS ---
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => {
        // Guardar el texto original del botón
        const originalButtonText = saveButton.textContent;
        saveButton.textContent = 'Guardando...';
        saveButton.disabled = true;

        // 1. Actualizar el objeto de usuario con los nuevos valores
        let updatedUser = {
            ...user, // Copia todas las propiedades existentes (como email y password)
            nombres: nombresInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            celular: celularInput.value.trim(),
            nit: nitInput.value.trim()
        };

        // Si es operador, también guarda sus campos específicos
        if (user.userType === 'operador') {
            updatedUser.codigo_interno = codigoInternoInput.value.trim();
            updatedUser.sexo = sexoInput.value.trim();
            updatedUser.edad = edadInput.value.trim();
            updatedUser.idcargo = idCargoInput.value.trim();
        }

        // 2. Actualizar la lista de usuarios en localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Se busca al usuario por su ID único para garantizar que actualizamos el correcto.
        // El ID no es editable y fue asignado durante el registro.
        const userIndex = users.findIndex(u => u.id === user.id);
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

    // --- LÓGICA PARA CAMBIAR TIPO DE USUARIO (PARA PRUEBAS) ---
    const toggleUserTypeButton = document.getElementById('toggle-user-type-button');

    // Actualizar el texto del botón según el tipo de usuario actual
    const targetType = user.userType === 'operador' ? 'Externo' : 'Operador';
    toggleUserTypeButton.textContent = `Convertir a ${targetType}`;

    toggleUserTypeButton.addEventListener('click', () => {
        // Determinar el nuevo tipo de usuario
        const newUserType = user.userType === 'operador' ? 'externo' : 'operador';

        // Crear el objeto de usuario actualizado
        const updatedUser = {
            ...user,
            userType: newUserType
        };

        // Actualizar la lista de usuarios en localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Corregido: Usar el ID único para encontrar al usuario, igual que en la función de guardar.
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Actualizar la sesión actual y recargar la página para ver los cambios
        sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        window.location.reload();
    });

    // --- LÓGICA DE CERRAR SESIÓN ---
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});
