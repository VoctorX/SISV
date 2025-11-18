document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificación de Usuario
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(loggedInUser);

    // 2. Variables de Estado
    let newPingLatLng = null;
    let isCompareMode = false;
    let selectedPins = [];
    let distancePolylines = [];
    let reportMarkers = {}; // Necesario para gestionar los marcadores en deleteReport

    // --- Funciones de Configuración de UI y Mapa ---

    function customizeMenu(user) {
        const userProfileButton = document.getElementById('user-profile-button');
        if (userProfileButton) {
            const userNameSpan = document.createElement('span');
            userNameSpan.className = 'font-medium';
            userNameSpan.textContent = user.nombres || 'Usuario';

            const userIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            `;
            userProfileButton.innerHTML = userIcon;
            userProfileButton.appendChild(userNameSpan);
        }
    }

    function setupSidebar() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const openIcon = document.getElementById('menu-open-icon');
        const closeIcon = document.getElementById('menu-close-icon');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            menuToggle.classList.toggle('translate-x-72');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    function initMap() {
        const map = L.map('map', { zoomControl: false }).setView([6.099, -75.6367], 14.5);
        L.control.zoom({ position: 'bottomright' }).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
        }).addTo(map);
        return map;
    }

    function setupMapInteraction(map, user) {
        map.on('click', function(e) {
            if (user.userType === 'operador' && !isCompareMode) {
                newPingLatLng = e.latlng;

                const formModal = document.getElementById('ping-form-modal');
                document.getElementById('ping-ubicacion').value = `${newPingLatLng.lat.toFixed(5)}, ${newPingLatLng.lng.toFixed(5)}`;
                document.getElementById('ping-codigo-usuario').value = user.codigo_interno || 'N/A';

                formModal.classList.remove('hidden');
            }
        });
    }

    // --- Funciones de Formularios ---

    function setupPingForm(map) {
        const formModal = document.getElementById('ping-form-modal');
        const pingForm = document.getElementById('ping-form');
        const cancelPingButton = document.getElementById('cancel-ping');

        pingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Llama a reverseGeocode para obtener la dirección legible
            const ubicacionDisplay = await reverseGeocode(newPingLatLng.lat, newPingLatLng.lng);

            const reportData = {
                id: Date.now(),
                type: 'ping',
                nombre: document.getElementById('ping-nombre').value,
                fecha: document.getElementById('ping-fecha').value,
                hora: document.getElementById('ping-hora').value,
                // Usamos la dirección obtenida
                ubicacion_str: ubicacionDisplay, 
                descripcion: document.getElementById('ping-descripcion').value,
                codigoUsuario: document.getElementById('ping-codigo-usuario').value,
                userName: user.nombres,
                userRole: user.userType,
                lat: newPingLatLng.lat,
                lng: newPingLatLng.lng
            };

            addReportToMap(map, reportData);
            saveReport(reportData);

            formModal.classList.add('hidden');
            pingForm.reset();
            newPingLatLng = null;
        });

        cancelPingButton.addEventListener('click', () => {
            formModal.classList.add('hidden');
            pingForm.reset();
            newPingLatLng = null;
        });
    }

    function setupReportForm(map, user) {
        const reportFormModal = document.getElementById('report-form-modal');
        const generateReportBtn = document.getElementById('generate-report-btn');
        const reportForm = document.getElementById('report-form');
        const cancelReportButton = document.getElementById('cancel-report');

        generateReportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (user.userType === 'externo') {
                alert('No tienes permiso para generar reportes.');
                return;
            }
            document.getElementById('report-codigo-usuario').value = user.codigo_interno || 'N/A';
            reportFormModal.classList.remove('hidden');
        });

        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const ubicacionStr = document.getElementById('report-ubicacion').value;
            let lat = null;
            let lng = null;

            try {
                // Geocodificación (conversión de dirección a coordenadas)
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ubicacionStr)}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    lat = parseFloat(data[0].lat);
                    lng = parseFloat(data[0].lon);
                } else {
                    alert('No se pudo encontrar la ubicación. Por favor, sea más específico.');
                    return;
                }
            } catch (error) {
                console.error('Error during geocoding:', error);
                alert('Error al geocodificar la ubicación. Intente de nuevo más tarde.');
                return;
            }

            const reportData = {
                id: Date.now(),
                type: 'report',
                nombre: document.getElementById('report-nombre').value,
                fecha: document.getElementById('report-fecha').value,
                hora: document.getElementById('report-hora').value,
                ubicacion_str: ubicacionStr,
                descripcion: document.getElementById('report-descripcion').value,
                codigoUsuario: document.getElementById('report-codigo-usuario').value,
                userName: user.nombres, 
                userRole: user.userType,
                lat: lat,
                lng: lng
            };

            addReportToMap(map, reportData);
            saveReport(reportData);

            reportFormModal.classList.add('hidden');
            reportForm.reset();
        });

        cancelReportButton.addEventListener('click', () => {
            reportFormModal.classList.add('hidden');
            reportForm.reset();
        });
    }

    // --- Funciones de Reportes y Persistencia ---

    /**
     * Crea el elemento DOM para el contenido del popup de forma segura.
     * @param {object} reportData - Los datos para el reporte.
     * @param {object} user - El usuario actualmente logueado.
     * @returns {{popupElement: HTMLElement, deleteButton: HTMLElement|null}} 
     */
    function createPopupContent(reportData, user) {
        const container = document.createElement('div');
        container.className = 'font-sans';

        const title = document.createElement('h3');
        title.className = 'font-bold text-lg';
        title.textContent = reportData.nombre; 

        const dateTime = document.createElement('p');
        dateTime.className = 'my-1';
        const strongDate = document.createElement('strong');
        strongDate.className = 'font-semibold';
        strongDate.textContent = 'Fecha: ';
        dateTime.appendChild(strongDate);
        dateTime.append(`${reportData.fecha} - ${reportData.hora}`); 

        const location = document.createElement('p');
        location.className = 'my-1';
        const strongLocation = document.createElement('strong');
        strongLocation.className = 'font-semibold';
        strongLocation.textContent = 'Ubicación: ';
        location.appendChild(strongLocation);
        location.append(reportData.ubicacion_str);

        const description = document.createElement('p');
        description.className = 'my-1';
        const strongDesc = document.createElement('strong');
        strongDesc.className = 'font-semibold';
        strongDesc.textContent = 'Descripción: ';
        description.appendChild(strongDesc);
        description.append(reportData.descripcion);

        const operatorId = document.createElement('p');
        operatorId.className = 'text-xs text-gray-500 mt-2';
        operatorId.textContent = `ID Operador: ${reportData.codigoUsuario}`;

        container.append(title, dateTime, location, description, operatorId);

        let deleteButton = null;
        if (user && user.userType === 'operador') {
            deleteButton = document.createElement('button');
            deleteButton.className = 'mt-2 w-full bg-red-600 text-white text-sm py-1 px-2 rounded hover:bg-red-700 transition-colors';
            deleteButton.textContent = 'Eliminar Reporte';
            container.appendChild(deleteButton);
        }

        return { popupElement: container, deleteButton };
    }

    function addReportToMap(map, reportData) {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        const { popupElement, deleteButton } = createPopupContent(reportData, user);

        const marker = L.marker([reportData.lat, reportData.lng]).addTo(map)
            .bindPopup(popupElement);

        reportMarkers[reportData.id] = marker; // Guardar referencia

        if (deleteButton) {
            marker.on('popupopen', () => {
                const liveDeleteButton = popupElement.querySelector('button');
                if (liveDeleteButton && !liveDeleteButton.hasAttribute('data-listener-attached')) {
                    liveDeleteButton.setAttribute('data-listener-attached', 'true');
                    liveDeleteButton.addEventListener('click', () => {
                        deleteReport(reportData.id, map);
                    });
                }
            });
        }

        marker.on('click', () => {
            if (isCompareMode) {
                handlePinSelection(marker, map);
            }
        });
    }

    async function reverseGeocode(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            if (data && data.display_name) {
                return data.display_name;
            }
            return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        } catch (error) {
            console.error('Error during reverse geocoding:', error);
            return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        }
    }

    function saveReport(reportData) {
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.push(reportData);
        localStorage.setItem('reports', JSON.stringify(reports));
    }

    function loadReports(map) {
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.forEach(reportData => {
            addReportToMap(map, reportData);
        });
    }

    function deleteReport(reportId, map) {
        const marker = reportMarkers[reportId];
        if (marker) {
            map.removeLayer(marker);
            delete reportMarkers[reportId];
        }

        let reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports = reports.filter(r => r.id !== reportId);
        localStorage.setItem('reports', JSON.stringify(reports));
    }

    // --- Funciones de Comparación de Distancias ---

    function setupCompareDistances(map) {
        const compareBtn = document.getElementById('compare-distances-btn');
        const clearBtn = document.getElementById('clear-distances-btn');
        clearBtn.style.display = 'none'; 

        compareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isCompareMode = !isCompareMode;

            if (isCompareMode) {
                compareBtn.classList.add('bg-slate-700');
                clearBtn.style.display = 'flex';
                document.getElementById('map').style.cursor = 'crosshair';
                map.closePopup();
            } else {
                compareBtn.classList.remove('bg-slate-700');
                clearBtn.style.display = 'none';
                document.getElementById('map').style.cursor = '';
                resetPinSelection(map);
            }
        });

        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetPinSelection(map);
        });
    }

    function handlePinSelection(marker, map) {
        selectedPins.push(marker);

        if (selectedPins.length === 2) {
            const latlng1 = selectedPins[0].getLatLng();
            const latlng2 = selectedPins[1].getLatLng();

            // Calcular distancia en metros usando la función integrada de Leaflet
            const distance = latlng1.distanceTo(latlng2);

            const polyline = L.polyline([latlng1, latlng2], {
                color: 'red',
                weight: 3,
                opacity: 0.7
            }).addTo(map);

            polyline.bindTooltip(`Distancia: ${distance.toFixed(2)} metros`, {
                permanent: true,
                direction: 'center',
                className: 'distance-tooltip'
            }).openTooltip();

            distancePolylines.push(polyline);
            selectedPins = []; // Reiniciar la selección
        }
    }

    function resetPinSelection(map) {
        selectedPins = [];
        distancePolylines.forEach(polyline => {
            map.removeLayer(polyline);
        });
        distancePolylines = [];
    }

    // --- Inicialización ---
    customizeMenu(user);
    setupSidebar();

    const map = initMap();
    setupMapInteraction(map, user);
    loadReports(map);
    setupPingForm(map);
    setupReportForm(map, user); 
    setupCompareDistances(map);
});