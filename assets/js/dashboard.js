document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(loggedInUser);
    const userName = user.nombres || user.name || 'Usuario';

    document.getElementById('userNameSidebar').textContent = userName;
    document.getElementById('welcomeMessage').textContent = `Bienvenido, ${userName}`;

    loadAndDisplayRecentIncidents();
    setupReportDetailModal();
    createAccidentChart();
});

function logout(event) {
    event.preventDefault();
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

function setupReportDetailModal() {
    const reportDetailModal = document.getElementById('report-detail-modal');
    const reportDetailModalContent = reportDetailModal.querySelector('div:first-child');
    const closeReportDetailModal = document.getElementById('close-report-detail-modal');

    function showReportDetailModal() {
        reportDetailModal.classList.remove('hidden');
        reportDetailModal.offsetHeight;
        reportDetailModal.classList.add('opacity-100');
        reportDetailModal.classList.remove('opacity-0');
        reportDetailModalContent.classList.add('opacity-100', 'scale-100');
        reportDetailModalContent.classList.remove('opacity-0', 'scale-95');
    }

    function hideReportDetailModal() {
        reportDetailModal.classList.remove('opacity-100');
        reportDetailModal.classList.add('opacity-0');
        reportDetailModalContent.classList.remove('opacity-100', 'scale-100');
        reportDetailModalContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            reportDetailModal.classList.add('hidden');
        }, 300);
    }


    document.getElementById('recent-incidents-list').addEventListener('click', (event) => {
        const incidentItem = event.target.closest('.incident-item');
        if (incidentItem) {
            const reportId = incidentItem.dataset.reportId;
            
            const allReports = JSON.parse(localStorage.getItem('reports')) || [];
            const report = allReports.find(r => r.id == reportId); 
            
            console.log('Report ID:', reportId);
            console.log('Report found:', report);
            
            if (report) {
                document.getElementById('detail-report-nombre').textContent = report.nombre || 'Incidente sin nombre';
                document.getElementById('detail-report-fecha').textContent = report.fecha || 'N/A';
                document.getElementById('detail-report-hora').textContent = report.hora || 'N/A';
            
                document.getElementById('detail-report-ubicacion').textContent = report.ubicacion_str || report.ubicacion || 'No disponible';
                document.getElementById('detail-report-lat').textContent = report.lat || 'N/A';
                document.getElementById('detail-report-lng').textContent = report.lng || 'N/A';

            
                document.getElementById('detail-report-descripcion').textContent = report.descripcion || 'Sin descripción';
                
                document.getElementById('detail-report-nombre-usuario').textContent = report.userName || 'No disponible';
                document.getElementById('detail-report-rol-usuario').textContent = report.userRole || 'No disponible';
                document.getElementById('detail-report-codigo-usuario').textContent = report.codigoUsuario || 'N/A';
                
                showReportDetailModal();
            } else {
                console.error('No se encontró el reporte con ID:', reportId);
                alert('No se pudo cargar la información del incidente');
            }
        }
    });

    closeReportDetailModal.addEventListener('click', hideReportDetailModal);

    reportDetailModal.addEventListener('click', (event) => {
        if (event.target === reportDetailModal) {
            hideReportDetailModal();
        }
    });
}

function renderRecentIncidents(incidents, containerElement) {
    containerElement.innerHTML = '';

    if (incidents.length === 0) {
        containerElement.innerHTML = '<p class="text-gray-600 text-sm">No hay incidentes recientes.</p>';
        return;
    }

    incidents.forEach(incident => {
        const incidentElement = document.createElement('div');
        incidentElement.className = 'flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded transition cursor-pointer incident-item';

        incidentElement.setAttribute('data-report-id', incident.id);
        
        incidentElement.innerHTML = `
            <svg class="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm">${incident.nombre || 'Incidente'} - ${incident.fecha || 'Fecha desconocida'}</span>
        `;
        containerElement.appendChild(incidentElement);
    });
}

function loadAndDisplayRecentIncidents() {
    const recentIncidentsContainer = document.getElementById('recent-incidents-list');
    if (!recentIncidentsContainer) {
        console.error('Container for recent incidents not found.');
        return;
    }

    const allReports = JSON.parse(localStorage.getItem('reports')) || [];
    
    console.log('Total reports in localStorage:', allReports.length);
    allReports.sort((a, b) => {
        const dateTimeA = new Date(`${a.fecha}T${a.hora || '00:00'}`);
        const dateTimeB = new Date(`${b.fecha}T${b.hora || '00:00'}`);
        return dateTimeB - dateTimeA;
    });

    const recentIncidents = allReports.slice(0, 6);
    renderRecentIncidents(recentIncidents, recentIncidentsContainer);
}

// --- Integracion del  ---
function f(x) {
    return 0.0001492855139 * Math.pow(x, 11)
        - 0.0107930996473 * Math.pow(x, 10)
        + 0.3443796847443 * Math.pow(x, 9)
        - 6.3834490740741 * Math.pow(x, 8)
        + 76.1265947420635 * Math.pow(x, 7)
        - 610.8951273148148 * Math.pow(x, 6)
        + 3349.860332616843 * Math.pow(x, 5)
        - 12475.929519400353 * Math.pow(x, 4)
        + 30683.300001102292 * Math.pow(x, 3)
        - 46962.78111111111 * Math.pow(x, 2)
        + 39681.36854256854 * x
        - 13652;
}
function createAccidentChart() {
    const canvas = document.getElementById('accidentChart');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const realData = [];
    for (let i = 1; i <= 12; i++) {
        realData.push(Math.round(f(i)));
    }

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Víctimas Totales',
                data: realData,
                borderColor: '#9CA3AF',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: '#9CA3AF',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#6B7280',
                pointHoverBorderColor: '#fff',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#9CA3AF',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return 'Total víctimas: ' + context.parsed.y;
                        },
                        afterLabel: function(context) {
                            const fallecidos = [14, 11, 12, 14, 10, 13, 15, 12, 19, 9, 15, 17];
                            const lesionados = [69, 74, 62, 77, 69, 70, 69, 88, 77, 65, 36, 8];
                            return [
                                'Fallecidos: ' + fallecidos[context.dataIndex],
                                'Lesionados: ' + lesionados[context.dataIndex]
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#fff',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#fff',
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}