# SISV - Sistema de Información de Siniestros Viales

Sistema web para la gestión y visualización de incidentes viales en Caldas, Colombia. Permite a operadores y usuarios externos registrar, consultar y analizar accidentes de tránsito mediante un mapa interactivo.

## 🚀 Características

### Para Operadores
- **Registro de Pings en Mapa**: Clic en el mapa para crear marcadores de incidentes en tiempo real
- **Generación de Reportes**: Formulario completo para documentar accidentes con geocodificación automática
- **Medición de Distancias**: Herramienta para comparar distancias entre puntos de incidentes
- **Gestión de Incidentes**: Eliminar reportes directamente desde el mapa
- **Dashboard Analítico**: Visualización de estadísticas y tendencias de siniestros viales

### Para Usuarios Externos
- **Visualización de Mapa**: Acceso de solo lectura a todos los incidentes registrados
- **Consulta de Reportes**: Ver detalles completos de cada incidente
- **Dashboard Público**: Acceso a estadísticas generales del año

### Funcionalidades Generales
- Sistema de autenticación con roles (Operador/Externo)
- Perfil de usuario editable
- Mapa interactivo con OpenStreetMap y Leaflet
- Gráficas de víctimas mensuales con Chart.js
- Almacenamiento local de datos (localStorage)
- Interfaz responsive con Tailwind CSS

## 📋 Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para librerías CDN y servicios de mapas)
- No requiere instalación de servidor

## 🛠️ Instalación

1. **Clonar o descargar el repositorio**
   ```bash
   git clone https://github.com/VoctorX/SISV
   cd sisv
   ```

2. **Abrir el proyecto**
   - Abrir `index.html` o `login.html` directamente en el navegador
   - O usar un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve
   ```

3. **Acceder a la aplicación**
   - Navegar a `http://localhost:8000` (si usas servidor local)
   - O abrir directamente el archivo HTML

## 📁 Estructura del Proyecto

```
sisv/
├── index.html              # Redirección a login
├── login.html              # Página de autenticación
├── home.html               # Mapa interactivo principal
├── dashboard.html          # Visualización de estadísticas
├── user.html               # Perfil de usuario
├── assets/
│   ├── css/
│   │   └── map.css        # Estilos del mapa
│   └── js/
│       ├── login.js       # Lógica de autenticación
│       ├── home.js        # Funcionalidad del mapa
│       ├── dashboard.js   # Gráficas y estadísticas
│       └── user.js        # Gestión de perfil
└── .github/
    └── workflows/
        └── static.yml     # Deploy a GitHub Pages
```

## 🎯 Uso

### Primer Acceso

1. **Registro de Usuario**
   - Ir a `login.html`
   - Clic en "Regístrate"
   - Completar el formulario:
     - Nombre completo
     - Cédula
     - Correo electrónico
     - Contraseña
     - Seleccionar tipo de usuario (Externo/Operador)
   - Si es Operador, completar campos adicionales:
     - Código interno
     - Sexo
     - Edad
     - Cargo

2. **Iniciar Sesión**
   - Ingresar correo y contraseña
   - Completar reCAPTCHA
   - Clic en "Entrar"

### Funciones del Mapa (home.html)

#### Para Operadores

**Crear Ping (Marcador Rápido)**
1. Hacer clic en cualquier punto del mapa
2. Se abre formulario modal automáticamente
3. Completar:
   - Nombre del evento
   - Fecha y hora
   - Descripción
4. Guardar

**Generar Reporte Completo**
1. Clic en "Generar Reporte" en el menú lateral
2. Completar formulario:
   - Nombre del evento
   - Fecha y hora
   - Ubicación (dirección textual)
   - Descripción
3. El sistema geocodifica automáticamente la dirección
4. Guardar

**Comparar Distancias**
1. Clic en "Comparar Distancias"
2. Seleccionar dos marcadores en el mapa
3. Se dibuja línea con distancia en metros
4. Clic en "Limpiar Líneas" para borrar

**Eliminar Reportes**
1. Clic en cualquier marcador
2. En el popup, clic en "Eliminar Reporte"

#### Para Usuarios Externos
- Solo pueden visualizar el mapa y consultar información
- No pueden crear ni eliminar reportes

### Dashboard (dashboard.html)

- Visualización de gráfica de víctimas mensuales 2024
- Tarjetas con totales anuales:
  - Total víctimas
  - Fallecidos
- Lista de incidentes recientes (últimos 6)
- Clic en incidente para ver detalles completos

### Perfil de Usuario (user.html)

**Datos Editables:**
- Nombres y apellidos
- Celular
- NIT
- Campos adicionales para operadores:
  - Código interno
  - Sexo
  - Edad
  - ID Cargo

**Datos de Solo Lectura:**
- ID de usuario (cédula)
- Correo electrónico

## 🔒 Seguridad

⚠️ **ADVERTENCIA IMPORTANTE**: Este es un prototipo que utiliza:

- **localStorage** para almacenamiento de datos
- **sessionStorage** para sesiones
- **Contraseñas en texto plano**

**NO USAR EN PRODUCCIÓN**. Para un sistema real:
- Implementar backend con base de datos
- Hash de contraseñas 
- Autenticación o sesiones seguras
- HTTPS obligatorio
- Validación de datos en servidor

## 🗺️ APIs Utilizadas

- **Leaflet**: Mapas interactivos
- **OpenStreetMap**: Tiles de mapas
- **Chart.js**: Gráficas estadísticas
- **Google reCAPTCHA**: Protección contra bots

## 🌐 Despliegue

### GitHub Pages

El proyecto incluye workflow de GitHub Actions (`.github/workflows/static.yml`) para despliegue automático:

1. Subir código a GitHub
2. Ir a Settings > Pages
3. Source: GitHub Actions
4. El sitio se despliega automáticamente en cada push a `main`

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript 
- **Frameworks CSS**: Tailwind CSS (CDN)
- **Mapas**: Leaflet.js 1.9.4
- **Gráficas**: Chart.js 4.4.0
- **Almacenamiento**: Web Storage API (localStorage, sessionStorage)

## 📊 Datos de Ejemplo (Calculo Diferencial)

El dashboard muestra datos reales de siniestros viales en Caldas 2024:
- Polinomio de grado 11 para ajuste de curva
- Datos mensuales de víctimas totales
- Desglose por fallecidos y lesionados

## 🐛 Problemas Conocidos

1. **Almacenamiento local**
2. **Sin sincronización**: Los datos solo existen en el navegador local
3. **Seguridad**: No apto para datos sensibles (ver sección Seguridad)

## 🎓 Contexto Académico

> ⚠️ **IMPORTANTE**: Este es un **PROTOTIPO ACADÉMICO** desarrollado para el **segundo semestre** de la carrera. 
> 
> **NO ES UN SISTEMA DE PRODUCCIÓN**. El objetivo es demostrar:
> - Integración de APIs externas (Mapas, Geocodificación)
> - Manipulación del DOM con JavaScript
> - Diseño de interfaces con Tailwind CSS
> - Gestión básica de datos con Web Storage API
> - Visualización de datos con Chart.js
> 
> Este proyecto **NO debe usarse con datos reales** ni en entornos productivos debido a:
> - Falta de backend real
> - Almacenamiento inseguro de datos
> - Contraseñas sin cifrado
> - Sin validación de seguridad adecuada

## 🤝 Contribuir

Este es un proyecto académico, pero si encuentras mejoras o errores:

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/MejoraNombre`)
3. Commit de cambios (`git commit -m 'Agregar mejora X'`)
4. Push a la rama (`git push origin feature/MejoraNombre`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es un **prototipo** desarrollado con fines académicos para el segundo semestre.

- ✅ Libre para uso educativo y de aprendizaje
- ✅ Libre para fork y modificación
- ❌ No apto para uso comercial sin modificaciones de seguridad
- ❌ Sin garantías de ningún tipo

## 👥 Autor

**VoctorX** - [GitHub Profile](https://github.com/VoctorX)

Proyecto desarrollado para la gestión de siniestros viales en Caldas, Colombia.

**Repositorio**: [https://github.com/VoctorX/SISV](https://github.com/VoctorX/SISV)


## 🚀 Demo en Vivo

Una vez desplegado en GitHub Pages, el sistema estará disponible en:
```
https://voctorx.github.io/SISV/
```

## 📚 Recursos Utilizados

- [Leaflet Documentation](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ⚡ Mejoras Futuras (Para Producción)

Si este prototipo se convirtiera en un sistema real, sería necesario:

1. **Backend Seguro**
   - Node.js/Express
   - Base de datos (MongoDB/MySQL)
   - Hash de contraseñas

2. **Seguridad**
   - HTTPS obligatorio
   - Validación en servidor

3. **Funcionalidades**
   - Sistema de roles avanzado (admin, supervisor, operador)
   - Búsqueda y filtros de incidentes
   - Exportación de reportes (PDF, Excel)
   - Notificaciones en tiempo real
   - Historial de cambios
   - Backup automático

4. **Optimización**
   - CDN para assets
   - Lazy loading de marcadores
   - Caché de geocodificación
   - Compresión de imágenes

---

## 🎯 Objetivos de Aprendizaje Alcanzados

✅ Integración de librerías externas mediante CDN  
✅ Manipulación avanzada del DOM  
✅ Programación asíncrona (async/await)  
✅ Consumo de APIs REST  
✅ Almacenamiento local del navegador  
✅ Diseño responsive con framework CSS  
✅ Visualización de datos con gráficas  
✅ Sistema de autenticación básico  
✅ Gestión de eventos del usuario  
✅ Deployment con GitHub Pages

---

**Desarrollado con 💻 para el segundo semestre | 2025-02**