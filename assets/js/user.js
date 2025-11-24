document.addEventListener('DOMContentLoaded', () => {

    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(loggedInUser);
    const profileCard = document.getElementById('profile-card');
    const profileTitle = document.getElementById('profile-title');
    const panelOperador = document.getElementById('panel-operador');
    const tabPerfil = document.getElementById('tab-perfil');
    const tabOperador = document.getElementById('tab-operador');
    const panelPerfil = document.getElementById('panel-perfil');
    const saveButton = document.getElementById('save-button');
    const logoutButton = document.getElementById('logout-button');
    
    const idInput = document.getElementById('user-id');
    const nombresInput = document.getElementById('user-nombres');
    const apellidosInput = document.getElementById('user-apellidos');
    const emailInput = document.getElementById('user-email');
    const celularInput = document.getElementById('user-celular');
    const nitInput = document.getElementById('user-nit');

    const codigoInternoInput = document.getElementById('user-codigo-interno');
    const sexoInput = document.getElementById('user-sexo');
    const idCargoInput = document.getElementById('user-idcargo');
    const edadInput = document.getElementById('user-edad');


    profileCard.classList.add('animate-fade-in-slide-up');

    if (user.userType === 'operador') {
        profileTitle.textContent = 'Perfil de Operador';
    } else if (user.userType === 'externo') {
        profileTitle.textContent = 'Perfil de Externo';
    } else {
        profileTitle.textContent = 'Perfil de Usuario';
    }
    
    idInput.value = user.id || 'No asignado';
    nombresInput.value = user.nombres || '';
    apellidosInput.value = user.apellidos || '';
    emailInput.value = user.email || ''; 
    celularInput.value = user.celular || ''; 
    nitInput.value = user.nit || '';

    if (user.userType === 'operador') {
        tabOperador.classList.remove('hidden');
        
        codigoInternoInput.value = user.codigo_interno || '';
        sexoInput.value = user.sexo || '';
        edadInput.value = user.edad || '';
        idCargoInput.value = user.idcargo || '';
    }

    const setActiveTab = (activeTab, activePanel) => {
        const activeClasses = ['border-gray-700', 'text-gray-800'];
        const inactiveClasses = ['border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-400'];

        [tabPerfil, tabOperador].forEach(tab => {
            tab.classList.remove(...activeClasses);
            tab.classList.add(...inactiveClasses);
        });
        [panelPerfil, panelOperador].forEach(panel => panel.classList.add('hidden'));
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

    saveButton.addEventListener('click', () => {
        const originalButtonText = saveButton.textContent;
        saveButton.textContent = 'Guardando...';
        saveButton.disabled = true;

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

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

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

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});