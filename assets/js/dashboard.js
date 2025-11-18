// --- VERIFICACIÓN DE SESIÓN Y PERSONALIZACIÓN DEL DASHBOARD ---
document.addEventListener('DOMContentLoaded', () => {
    // Primero, verificamos si el usuario ha iniciado sesión.
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // Si no hay datos de usuario, lo redirigimos a la página de login.
        window.location.href = 'login.html';
        return; // Detenemos la ejecución del resto del script.
    }

    // Si hay un usuario, parseamos sus datos y actualizamos la interfaz.
    const user = JSON.parse(loggedInUser);
    const userName = user.nombres; // Asumimos que el objeto de usuario tiene una propiedad 'name'.

    // Actualizamos los elementos del DOM con el nombre del usuario.
    document.getElementById('userNameSidebar').textContent = userName;
    document.getElementById('welcomeMessage').textContent = `Bienvenido, ${userName}`;
});

// --- FUNCIÓN PARA CERRAR SESIÓN ---
function logout(event) {
    event.preventDefault(); // Prevenimos que el enlace navegue a '#'.
    sessionStorage.removeItem('loggedInUser'); // Eliminamos los datos del usuario de la sesión.
    window.location.href = 'login.html'; // Redirigimos al login.
}

// Función matemática del documento (polinomio de grado 11)
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

// Generar datos usando la función para cada mes (x = 1 a 12)
const realData = [];
for (let i = 1; i <= 12; i++) {
    realData.push(Math.round(f(i)));
}

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Crear gráfica con Chart.js
const ctx = document.getElementById('accidentChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Víctimas Totales',
            data: realData,
            borderColor: '#60A5FA',
            backgroundColor: 'rgba(96, 165, 250, 0.1)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#60A5FA',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#3B82F6',
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
                borderColor: '#60A5FA',
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
