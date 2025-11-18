document.addEventListener('DOMContentLoaded', () => {
    // --- VERIFICACIÓN DE SESIÓN ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // --- ELEMENTOS CLAVE Y DATOS DEL USUARIO ---
    const user = JSON.parse(loggedInUser);

    // 1. Elementos del DOM
    const profileCard = document.getElementById('profile-card');
    const profileTitle = document.getElementById('profile-title');
    const panelOperador = document.getElementById('panel-operador');
    const tabPerfil = document.getElementById('tab-perfil');
    const tabOperador = document.getElementById('tab-operador');
    const panelPerfil = document.getElementById('panel-perfil');
    const saveButton = document.getElementById('save-button');
    const logoutButton = document.getElementById('logout-button');
    
    // 2. Campos comunes
    const idInput = document.getElementById('user-id');
    const nombresInput = document.getElementById('user-nombres');
    const apellidosInput = document.getElementById('user-apellidos');
    const emailInput = document.getElementById('user-email');
    const celularInput = document.getElementById('user-celular');
    const nitInput = document.getElementById('user-nit');

    // 3. Campos de operador
    const codigoInternoInput = document.getElementById('user-codigo-interno');
    const sexoInput = document.getElementById('user-sexo');
    const edadInput = document.getElementById('user-edad');
    const idCargoInput = document.getElementById('user-idcargo');

    // --- INICIALIZACIÓN Y ANIMACIÓN ---
    profileCard.classList.add('animate-fade-in-slide-up');

    // --- ACTUALIZAR TÍTULO DINÁMICAMENTE ---
    if (user.userType === 'operador') {
        profileTitle.textContent = 'Perfil de Operador';
    } else if (user.userType === 'externo') {
        profileTitle.textContent = 'Perfil de Externo';
    } else {
        profileTitle.textContent = 'Perfil de Usuario';
    }
    
    // Rellenar campos comunes
    idInput.value = user.id || 'No asignado';
    nombresInput.value = user.nombres || '';
    apellidosInput.value = user.apellidos || '';
    emailInput.value = user.email || ''; 
    celularInput.value = user.celular || ''; 
    nitInput.value = user.nit || '';

    // --- LÓGICA DE VISIBILIDAD POR TIPO DE USUARIO ---
    if (user.userType === 'operador') {
        tabOperador.classList.remove('hidden');
        
        // Rellenar campos específicos de operador
        codigoInternoInput.value = user.codigo_interno || '';
        sexoInput.value = user.sexo || '';
        edadInput.value = user.edad || '';
        idCargoInput.value = user.idcargo || '';
    }

    // ------------------------------------------------------------------
    
    // --- LÓGICA DE PESTAÑAS (TABS) ---
    const setActiveTab = (activeTab, activePanel) => {
        // Clases para la pestaña activa (grises)
        const activeClasses = ['border-gray-700', 'text-gray-800'];
        const inactiveClasses = ['border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-400'];

        // Resetear todos
        [tabPerfil, tabOperador].forEach(tab => {
            tab.classList.remove(...activeClasses);
            tab.classList.add(...inactiveClasses);
        });
        [panelPerfil, panelOperador].forEach(panel => panel.classList.add('hidden'));

        // Activar el seleccionado
        activeTab.classList.add(...activeClasses);
        activeTab.classList.remove(...inactiveClasses);
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

    // ------------------------------------------------------------------

    // --- LÓGICA PARA GUARDAR CAMBIOS ---
    saveButton.addEventListener('click', () => {
        const originalButtonText = saveButton.textContent;
        saveButton.textContent = 'Guardando...';
        saveButton.disabled = true;

        // 1. Actualizar el objeto de usuario con los nuevos valores
        let updatedUser = {
            ...user, 
            nombres: nombresInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            celular: celularInput.value.trim(),
            nit: nitInput.value.trim()
        };

        if (user.userType === 'operador') {
            updatedUser.codigo_interno = codigoInternoInput.value.trim();
            updatedUser.sexo = sexoInput.value.trim();
            updatedUser.edad = edadInput.value.trim();
            updatedUser.idcargo = idCargoInput.value.trim();
        }

        // 2. Actualizar la lista de usuarios en localStorage (Persistencia de datos)
        let users = JSON.parse(localStorage.getItem('users')) || [];
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
            saveButton.classList.remove('bg-gray-700', 'shadow-gray-300');
            saveButton.classList.add('bg-gray-600', 'shadow-gray-200'); 
            setTimeout(() => {
                saveButton.textContent = originalButtonText;
                saveButton.classList.remove('bg-gray-600', 'shadow-gray-200');
                saveButton.classList.add('bg-gray-700', 'shadow-gray-300');
                saveButton.disabled = false;
            }, 1500);
        }, 500);
    });
    
    // ------------------------------------------------------------------
    // ELIMINADO: Lógica para el botón de cambio de tipo de usuario
    // ------------------------------------------------------------------

    // --- LÓGICA DE CERRAR SESIÓN ---
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});