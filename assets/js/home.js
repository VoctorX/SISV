document.addEventListener('DOMContentLoaded', () => {
    // --- VERIFICACIÓN DE SESIÓN ---
    if (!sessionStorage.getItem('loggedInUser')) {
        window.location.href = 'login.html';
        return; // Detenemos la ejecución si no hay sesión
    }

    // --- PERSONALIZACIÓN DEL MENÚ CON DATOS DE USUARIO ---
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const userName = user.name;

    const userProfileButton = document.getElementById('user-profile-button');
    userProfileButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="font-medium">${userName}</span>
    `;

    // --- LÓGICA DEL MENÚ LATERAL ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        menuToggle.classList.toggle('translate-x-64'); // Movemos el botón junto con el menú
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
});

// MAPA
// Inicializar el mapa y centrarlo (latitud, longitud, zoom)
var map = L.map('map', {
    zoomControl: false // Deshabilitamos el control de zoom por defecto
}).setView([6.2442, -75.5812], 14.5); // Aumentamos el zoom a 16 para una vista más cercana

L.control.zoom({ position: 'bottomright' }).addTo(map); // Añadimos el control en la nueva posición
// Añadir capa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
}).addTo(map);

// --- FUNCIONALIDAD PARA AÑADIR MARCADORES (PINGS) ---
map.on('click', function(e) {
    // Contenido del Popup
    const popupContent = `
        <b>Nuevo Incidente</b><br>
        Coordenadas: ${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}<br>
        <button class="mt-2 w-full bg-indigo-600 text-white text-sm py-1 px-2 rounded hover:bg-indigo-700">Registrar Incidente</button>
    `;

    // Crear y añadir el nuevo marcador en la ubicación del clic
    L.marker(e.latlng).addTo(map)
        .bindPopup(popupContent)
        .openPopup();
});
