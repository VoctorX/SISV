2

#




` `**Trabajo de Aula ABP**

Victor Manuel Cordoba Larez

Facultad de Ingeniería, Universidad Unilasallista 

Lenguajes de Programación, Diseño y Edición Grafica, Programación Orientada a Objetos Semestre 2

Jonathan Berthel Castro, Feibert Alirio Guzman

23 de Octubre de 2025




#

# **SISV – SISTEMA INFORMATICO DE SINIESTROS VIALES**
Los organismos de socorro en Colombia enfrentan serias limitaciones tecnológicas que comprometen su capacidad de respuesta ante emergencias vehiculares. En el departamento de Antioquia, la infraestructura utilizada por los bomberos y demás entidades de atención vial continúa dependiendo de métodos tradicionales como el servicio 123, radios internos y reportes manuales, lo que reduce significativamente la eficiencia en la atención de siniestros.

La propuesta de este trabajo académico consiste en crear el Sistema Informático de Siniestros Viales (SISV), una aplicación web colaborativa que revolucionará la forma en que se reportan, visualizan y gestionan los incidentes viales. A través de tecnología de geolocalización y actualización en tiempo real, el SISV conectará a bomberos, supervisores y analistas en una plataforma unificada que permitirá tomar decisiones informadas y reducirlos tiempos de respuesta en emergencias.

Este documento presenta la propuesta integral del SISV, incluyendo las funcionalidades previstas para su versión final. Sin embargo, durante el segundo semestre académico se desarrollará únicamente un prototipo funcional enfocado en el diseño de interfaz y la simulación de las funciones principales en entorno cliente.
# **Planteamiento del Problema** 
En el departamento de Antioquia, los accidentes de tránsito representan una de las principales causas de mortalidad y lesiones graves” (Agencia Nacional de Seguridad Vial, 2025, pág. 33) . Sin embargo, los cuerpos de bomberos y servicios de emergencia carecen de sistemas integrados que les permitan visualizar la ubicación exacta de los siniestros, coordinar recursos de manera óptima y mantener registros detallados para análisis preventivo. 

Esta problemática se agrava por la ausencia de herramientas digitales especializadas que faciliten la colaboración entre múltiples actores del sistema de emergencias. Se requiere urgentemente una solución tecnológica robusta, accesible desde cualquier dispositivo y que opere en tiempo real, permitiendo a diferentes usuarios reportar, monitorear y analizar incidentes viales de manera simultánea y coordinada.
## **Objetivo General**
Desarrollar un sistema informático que optimice la notificación, registro y gestión de accidentes viales en el departamento de Antioquia mediante un mapa interactivo con actualización en tiempo real.
## **Objetivos específicos:**	
1. Diseñar la arquitectura conceptual del sistema completo, incluyendo la selección y justificación del stack tecnológico MERN para su implementación futura.
1. Elaborar wireframes y mockups de las interfaces principales del sistema, representando la distribución y funcionalidad que permitirán registrar, visualizar y consultar los siniestros viales.
1. Implementar un prototipo funcional frontend utilizando HTML5, Tailwind CSS y JavaScript, con integración de APIs de mapas y almacenamiento local, que demuestre la viabilidad del concepto y sirva como base para el desarrollo completo posterior.
# **Marco Teórico**
## **¿Qué son las aplicaciones web?**
Las aplicaciones web modernas representan una evolución significativa en el desarrollo de software, operando completamente a través de navegadores sin requerir instalación local. Estas plataformas utilizan tecnologías como HTML5 para estructurar el contenido, CSS3 para el diseño visual y JavaScript para crear interfaces interactivas accesibles desde cualquier dispositivo con conexión a internet (Universidad de Murcia, 2019). Su principal ventaja radica en la centralización de actualizaciones y la sincronización automática de datos entre múltiples usuarios.

El SISV se fundamentara en el paradigma de aplicaciones web colaborativas en tiempo real, un modelo donde múltiples usuarios trabajan simultáneamente sobre recursos compartidos visualizando cambios al instante (Meegle, 2025). Esta arquitectura resulta crítica en escenarios de emergencias vehiculares, ya que permite que bomberos desplegados en campo, supervisores en la central de operaciones y analistas en oficinas administrativas visualicen y actualicen la misma información de manera sincronizada. Cuando un bombero reporta un nuevo incidente o actualiza el estado de una emergencia, estos cambios se propagan instantáneamente a todos los usuarios conectados, garantizando que las decisiones se tomen con base en información actualizada y eliminando el riesgo de operar con datos obsoletos. 
## **Stack Tecnológico MERN:**
La implementación final del SISV se basa en el stack MERN, un conjunto de tecnologías JavaScript que se han convertido en estándar de la industria para aplicaciones web de alto rendimiento. Este stack está compuesto por MongoDB como sistema de base de datos NoSQL orientado a documentos, Express.js como framework del servidor que gestiona las peticiones HTTP y define la lógica del backend, React como biblioteca frontend para construir interfaces de usuario interactivas mediante componentes reutilizables, y Node.js como entorno de ejecución que permite ejecutar JavaScript en el servidor (Parada, 2020).

La elección del stack MERN ofrece ventajas particulares para el SISV. MongoDB permite almacenar documentos JSON con estructuras flexibles, ideal para registros de incidentes que pueden contener información variable según el tipo de siniestro. Express.js facilita la creación de APIs RESTful robustas que gestionan la comunicación entre el frontend y la base de datos. React proporciona un modelo de datos reactivo donde los cambios en el estado de la aplicación se reflejan automáticamente en la interfaz visual sin recargar la página completa. Node.js, al compartir el mismo lenguaje JavaScript en frontend y backend, permite que los desarrolladores trabajen en todo el stack con un único lenguaje de programación, reduciendo la curva de aprendizaje y facilitando la reutilización de código.
## **Integración de Servicios Cartográficos:**
El componente cartográfico del SISV se implementará mediante la integración de APIs especializadas en mapas interactivos. Se evaluarán dos opciones principales: Google Maps API y OpenStreetMap. Google Maps API ofrece una plataforma madura con características avanzadas como cálculo de rutas optimizadas, información de tráfico en tiempo real y geocodificación inversa, aunque requiere una cuenta de facturación para uso comercial. OpenStreetMap representa una alternativa de código abierto sin costos de licenciamiento, especialmente adecuada para proyectos académicos y gubernamentales, con datos cartográficos mantenidos colaborativamente por una comunidad global.

La API seleccionada proporcionará funcionalidades esenciales para el sistema: renderizado de mapas base con diferentes vistas (satélite, calles, terreno), colocación y gestión de marcadores para visualizar ubicaciones de siniestros, cálculo de distancias entre puntos geográficos para determinar unidades de emergencia más cercanas, y controles de navegación para zoom y desplazamiento.
## **Trabajos Previos: (Causeway AccsMap)**
El desarrollo del SISV se fundamenta en el análisis de sistemas existentes de gestión de accidentes viales, siendo Causeway AccsMap el referente más relevante a nivel internacional. AccsMap es el sistema líder en el Reino Unido para análisis de colisiones basado en mapas, utilizado por equipos de carreteras y policía (Causeway, 2025). Este software transforma datos complejos de accidentes en información clara y accionable, permitiendo a las autoridades identificar tendencias, justificar la implementación de medidas de seguridad vial y reducir víctimas mediante análisis de datos STATS19 (el estándar británico de reportes de accidentes) con acceso en la nube.

El análisis de Causeway AccsMap proporciona al SISV lecciones valiosas sobre la importancia de interfaces centradas en mapas para la visualización geográfica de siniestros, la necesidad de dashboards que hagan accesible la información compleja a usuarios no técnicos, y la utilidad de bases de datos históricas para identificar patrones de accidentalidad y zonas de alto riesgo. Sin embargo, Causeway AccsMap está diseñado principalmente para análisis retrospectivo y generación de reportes estadísticos, mientras que el SISV innova al enfocarse en la gestión en tiempo real de emergencias activas, permitiendo coordinación operativa inmediata entre equipos de respuesta. Adicionalmente, Causeway AccsMap opera bajo un modelo de licenciamiento comercial y está optimizado para el contexto británico, mientras que el SISV se desarrolla como solución adaptada específicamente a las necesidades y realidades operativas de los cuerpos de bomberos en Colombia.
# **Justificación Del Proyecto**  
El desarrollo del SISV responde a una necesidad documentada y urgente en el sector de emergencias de Antioquia. Según estadísticas de la Agencia Nacional de Seguridad Vial, los accidentes de tránsito continúan siendo una de las principales causas de mortalidad evitable en Colombia (Agencia Nacional de Seguridad Vial, 2025, pág. 33). n emergencias vehiculares, cada minuto es crítico para salvar vidas y prevenir complicaciones graves. Actualmente, cuando los bomberos reciben un reporte de accidente a través del 123, carecen de herramientas digitales para registrar, visualizar y gestionar estos incidentes de manera eficiente. La información se maneja mediante anotaciones manuales, radios internos y métodos tradicionales que dificultan la coordinación entre estaciones, la identificación rápida de unidades disponibles y el análisis posterior de patrones de accidentalidad.

El SISV transforma radicalmente este escenario al proporcionar una plataforma digital donde los bomberos pueden registrar inmediatamente cada incidente en un mapa interactivo una vez reciben el reporte. La geolocalización precisa elimina ambigüedades sobre la ubicación exacta del siniestro, permitiendo que múltiples bomberos, supervisores y despachadores visualicen simultáneamente todos los accidentes activos. El sistema facilita la coordinación inmediata al permitir comparar distancias entre las estaciones de bomberos y el lugar del incidente, identificando rápidamente qué unidad puede llegar más rápido. A diferencia de los métodos tradicionales donde la información se fragmenta entre llamadas, radios y anotaciones en papel, el SISV centraliza todos los datos en una única plataforma accesible desde cualquier dispositivo en la estación o en campo.

Más allá del impacto inmediato en la eficiencia operativa, el SISV genera valor a largo plazo mediante sus capacidades analíticas. El sistema registra automáticamente cada incidente con marca temporal y coordenadas exactas, construyendo una base de datos histórica invaluable para identificar intersecciones de alta peligrosidad, horarios de mayor accidentalidad y patrones estacionales. Esta información puede fundamentar decisiones de política pública sobre infraestructura vial, campañas de prevención focalizadas y asignación estratégica de recursos de emergencia. Adicionalmente, la arquitectura web del sistema facilita su replicación en otros departamentos del país sin requerir inversiones significativas en infraestructura tecnológica, sentando las bases para una red nacional de gestión de emergencias viales coordinada y basada en datos.
# **Metodología** 
### La metodología descrita a continuación corresponde al desarrollo del prototipo frontend del segundo semestre. Este prototipo se construirá con HTML5, Tailwind CSS y JavaScript, sin implementar el stack MERN ni funcionalidades de backend que requieren servidor y base de datos.
### ***Fase 1:*** 
- En esta primera etapa, se prioriza la comprensión de las tecnologías frontend necesarias para el prototipo: HTML5 para la estructura de páginas, Tailwind CSS para el diseño responsivo mediante clases utilitarias, y JavaScript puro para la lógica del cliente y manipulación del DOM.
- Asimismo, se explora el uso de APIs de mapas, principalmente con OpenStreetMap (por ser gratuito y sin requerimientos de tarjeta de crédito) o alternativamente Google Maps API, para integrar la visualización geográfica de los siniestros viales.
- Se investigan técnicas de almacenamiento en el navegador mediante localStorage, que permite persistir datos entre sesiones sin necesidad de servidor. También se estudian librerías de gráficos como Chart.js para la visualización de estadísticas.

Nota: El aprendizaje del stack MERN (MongoDB, Express, React, Node.js) se realizará en fases posteriores, ya que no es necesario para el prototipo del semestre actual que funciona completamente en el cliente. El propósito es garantizar que el equipo cuente con los conocimientos básicos para avanzar a las fases siguientes con un nivel técnico sólido

***Fase 2:***

- Una vez establecidas las bases tecnológicas, se procede al diseño de las interfaces gráficas y a la definición de la estructura de datos que manejará el prototipo. 
- En esta fase se elaboran wireframes **y** mockups de las pantallas principales del sistema: acceso simulado (login), mapa interactivo, formulario de registro de incidentes, lista de reportes y módulo de estadísticas. 
- Cada registro incluirá campos como** id**,** dirección,** tipo de siniestro**,** descripción**,** fecha y otros atributos complementarios. Esta estructura permitirá realizar operaciones básicas de almacenamiento, consulta y filtrado dentro del navegador, evitando la necesidad de un servidor o una base de datos real en esta etapa.
- El diseño se centra en ofrecer una experiencia de usuario clara, ordenada y visualmente atractiva, aprovechando las utilidades de Tailwind CSS para la organización y responsividad de los componentes.

***Fase 3:***

- En la tercera fase se materializan las funciones principales del SISV dentro de un prototipo totalmente ejecutable en el navegador. Este prototipo no depende de un backend, sino que simula el comportamiento del sistema final mediante almacenamiento local y actualización de la interfaz con JavaScript.
- Se implementa un mapa interactivo utilizando OpenStreetMaps o Google Maps API, desplegando un mapa centrado en Antioquia que muestra marcadores correspondientes a los siniestros almacenados en localStorage. Al hacer clic en un marcador, se muestra información del incidente en una ventana emergente. Se desarrolla un formulario de registro que permite capturar tipo de siniestro, descripción, coordenadas mediante clic en el mapa o entrada manual, y fecha. Al guardar, el incidente se almacena en localStorage y aparece inmediatamente en el mapa sin recargar la página.
- Se crea una visualización en tabla dinámica generada con JavaScript que muestra todos los incidentes almacenados localmente, con opciones de filtrado por tipo o fecha. Al hacer clic en una fila, el mapa se centra en esa ubicación. Se implementan scripts en JavaScript que procesan los datos de localStorage para generar estadísticas simples como el total de incidentes y la distribución por tipo, visualizándolos mediante gráficos.
- Para el control de versiones y documentación, se mantiene un repositorio en línea que contiene los archivos HTML, CSS y JS, junto con un README que describe las limitaciones técnicas y los pasos para la ejecución del prototipo
# **Alcance** 
Para el presente semestre académico, el alcance se limita a la construcción de un prototipo funcional que demuestre las capacidades principales del sistema y valide la viabilidad del concepto. Este prototipo se desarrollará utilizando tecnologías web fundamentales: HTML5 para la estructura de las páginas, frameworks de CSS (como Bootstrap o Tailwind) para el diseño visual, y JavaScript puro para la interactividad y lógica del cliente.
## **Funcionalidades Incluidas en el Prototipo:**
- **Mapa interactivo básico:** Integración con la API de Google Maps u OpenStreetMap para desplegar un mapa centrado en Antioquia. Los usuarios podrán visualizar marcadores de incidentes predefinidos, hacer clic en ellos para ver información en ventanas emergentes, y agregar nuevos marcadores haciendo clic sobre el mapa. La información de los incidentes se almacenará localmente en el navegador.
- **Formulario de registro de incidentes:** Interfaz con campos para capturar información básica del siniestro: selección del tipo de accidente mediante menú desplegable (colisión, atropello, volcamiento), coordenadas obtenidas automáticamente al hacer clic en el mapa, campo de texto para descripción, y controles de fecha/hora. Al guardar, el nuevo incidente aparecerá como marcador en el mapa.
- **Visualización de lista de incidentes:** Tabla dinámica que muestra todos los accidentes registrados con columnas de fecha, tipo, ubicación y descripción breve. Los usuarios podrán ordenar la tabla por diferentes columnas y filtrar por tipo de incidente mediante un selector. Al hacer clic en una fila, el mapa se centrará en la ubicación correspondiente.
- **Panel de estadísticas básicas:** Sección que muestra contadores simples calculados con JavaScript: número total de incidentes registrados, cantidad por tipo de accidente, y un gráfico de barras simple que visualiza la distribución de siniestros por categoría.
## **Limitaciones del Prototipo:**
- Sin sincronización en tiempo real: Los cambios realizados por un usuario no se reflejan automáticamente en otras sesiones abiertas, ya que no existe conexión con servidor ni base de datos compartida.
- Funcionalidades simplificadas: Características avanzadas como cálculo de rutas óptimas, medición precisa de distancias, generación de reportes en PDF, y notificaciones push no están incluidas en esta fase.
# **Desarrollo Futuro de la Solución**
Las funcionalidades descritas en esta sección corresponden a la versión completa del sistema con stack MERN, que se implementará en fases posteriores. El prototipo actual del semestre no incluye estas características, que requieren backend, base de datos real y arquitectura cliente-servidor completa.
## **Entradas:**
- ***Credenciales de acceso:*** Cada usuario del sistema (Administrador, Bombero o Supervisor) inicia sesión mediante un nombre de usuario y contraseña almacenados en la base de datos. El sistema valida las credenciales y activa las funciones correspondientes al rol del usuario. Se incluye un mecanismo de seguridad para prevenir accesos automatizados.
- ***Información geográfica del siniestro:*** Cada reporte contiene coordenadas de latitud y longitud que determinan la ubicación exacta del accidente. Los usuarios pueden seleccionar el punto directamente en el mapa interactivo o permitir que el sistema obtenga la posición automáticamente mediante GPS, si el dispositivo lo permite.
- ***Clasificación y detalles del incidente:*** El formulario de registro permite seleccionar el tipo de accidente (colisión, atropello, volcamiento, salida de vía, etc.) y agregar una descripción textual que detalle las circunstancias del evento, condiciones de la vía, clima, número de vehículos involucrados y estado de las víctimas.
- ***Metadatos temporales:*** Se registran la fecha y hora del siniestro, los cuales pueden capturarse automáticamente al momento del reporte o ingresarse manualmente si se está documentando un incidente anterior. Esta información es esencial para los análisis de frecuencia y patrones temporales de accidentalidad.
- ***Interacciones cartográficas:*** Los usuarios pueden desplazarse por el mapa, hacer zoom, agregar o consultar marcadores, y acceder a información detallada de cada siniestro. Estas acciones permiten una experiencia de navegación intuitiva y una gestión visual eficiente de los accidentes reportados.
## **Proceso:**
- ***Visualización y actualización en tiempo real:*** Los accidentes registrados aparecen automáticamente en el mapa para todos los usuarios conectados. Cada marcador contiene información resumida del siniestro, y al seleccionarlo, se despliega una ventana con los detalles completos. Las actualizaciones se propagan en tiempo real gracias a la comunicación asíncrona entre el servidor (Node.js/Express) y el cliente (React).
- ***Gestión de incidentes y roles:*** Los administradores pueden editar o eliminar reportes erróneos, así como generar reportes consolidados de los siniestros registrados. Los bomberos pueden actualizar el estado del incidente (en atención, resuelto, cerrado), mientras que los supervisores pueden visualizar la cobertura general y priorizar la atención según la gravedad y cercanía.
## **Salidas**
- ***Mapa actualizado:*** Visualización geográfica en tiempo real de todos los siniestros activos, con posibilidad de filtrar por tipo, estado o fecha del evento.
- ***Base de datos consolidada:*** Registro histórico estructurado que almacena información precisa sobre cada accidente vial reportado.
- ***Reportes y estadísticas:*** Gráficos e indicadores que permiten identificar patrones de accidentalidad, zonas de riesgo y comportamiento temporal de los siniestros.
- ***Alertas visuales:*** Notificaciones en pantalla que informan sobre nuevos reportes o cambios de estado en incidentes existentes.

# **Referencias**
Agencia Nacional de Seguridad Vial. (20 de Octubre de 2025). *Anuario de Siniestrialidad Vial Antioquia.* Obtenido de https://ansv.gov.co/sites/default/files/2025-07/Anuario%20Antioquia_VF_Publicado.pdf

Causeway. (23 de Octubre de 2025). *collision analysis software.* Obtenido de https://www.causeway.com/infrastructure/road-safety-collision-analysis#form

Meegle. (16 de Febrero de 2025). *Collaborative Application Building.* Obtenido de https://www.meegle.com/en_us/topics/lowcode/collaborative-application-building

Parada, M. (21 de Octubre de 2020). *MERN Stack: Qué es y qué ventajas ofrece.* Obtenido de https://openwebinars.net/blog/mern-stack-que-es-y-que-ventajas-ofrece/

Universidad de Murcia. (11 de Febrero de 2019). *Introudccion al HTML y CSS. Desarrollo de Aplicaciones Web.* Obtenido de https://www.um.es/docencia/barzana/DAWEB/2017-18/daweb-tema-1-introduccion-html-css.html



