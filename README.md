# TP N°1 - Sala de Juegos 🎮

## Alumno
**Giuliano Manuel Sohrobigarat**

## Repositorio GitHub
**GitHub:** [Repositorio del proyecto](https://github.com/giulianolol/TP-1-Sohrobigarat---Programacion-IV)

## Deploy
**Vercel:** [Deploy en Vercel](https://sala-juegos-eight.vercel.app)

---

# Descripción del proyecto

Aplicación web desarrollada en **Angular** que simula una **Sala de Juegos**, permitiendo a los usuarios registrarse, iniciar sesión y acceder a distintos juegos interactivos.

El sistema cuenta con autenticación de usuarios mediante **Supabase**, almacenamiento de resultados en base de datos, chat en tiempo real y una interfaz responsive diseñada con **Bootstrap** y estilos personalizados.

---

# Tecnologías utilizadas

- Angular
- TypeScript
- HTML
- CSS
- Bootstrap
- Supabase
- Git / GitHub
- Vercel
- APIs externas

---

# Funcionalidades generales

- Registro de usuarios
- Inicio y cierre de sesión
- Rutas protegidas con guards
- Navbar dinámico según estado de autenticación
- Home con acceso visual a los juegos
- Guardado de resultados en base de datos
- Diseño visual temático inspirado en el tarot
- Uso de componentes standalone

---

# Juegos implementados

## 1. Ahorcado
Juego de palabras donde el usuario debe adivinar la palabra seleccionando letras mediante botones.

### Características
- Letras del abecedario en botones
- Suma de puntaje por palabra acertada
- Reinicio automático de palabra al acertar
- Fin de partida al quedarse sin intentos
- Guardado de puntaje y tiempo en Supabase

---

## 2. Mayor o Menor
Juego de cartas donde el usuario debe adivinar si la próxima carta será mayor o menor.

### Características
- Cartas generadas aleatoriamente
- Botones para elegir Mayor o Menor
- Puntaje por aciertos consecutivos
- Guardado de resultados en base de datos

---

## 3. Sala de Chat
Chat global para usuarios logueados.

### Características
- Envío de mensajes a la sala
- Persistencia en Supabase
- Actualización en tiempo real con Realtime
- Visualización de usuario y hora de envío
- Diferenciación visual entre mensajes propios y ajenos

---

## 4. Preguntados
Juego de trivia basado en la API oficial de Rick and Morty.

### Características
- Consumo de API externa
- Preguntas con opciones en botones
- Uso de imágenes de personajes
- Puntaje por respuestas correctas
- Guardado de puntaje y tiempo en Supabase

---

## 5. Pulso Fantasma
Juego de reflejos donde el usuario debe reaccionar rápidamente ante una señal visual.

### Características
- Medición de tiempo de reacción
- Sistema de rondas
- Cálculo de promedio de reacción
- Guardado de resultados en base de datos

---

# Página de resultados

Se desarrolló una página de resultados con ranking de cada juego.

### Características
- Cuatro tablas separadas
- Top 3 visible por defecto
- Botón para mostrar más resultados
- Ordenamiento de mejor a peor desempeño
- Datos obtenidos desde Supabase

---

# APIs utilizadas

## GitHub API
Utilizada en la sección “Quién Soy” para mostrar información personal del alumno.

## Rick and Morty API
Utilizada en el juego “Preguntados” para generar preguntas visuales con personajes aleatorios.

---

# Base de datos

Se utiliza **Supabase** para:

- autenticación de usuarios
- almacenamiento de resultados
- chat global en tiempo real

---

# Sprint #1

## Funcionalidades implementadas
- Creación inicial del proyecto
- Home / Bienvenida
- Login
- Registro
- Quién Soy
- Navbar de navegación
- Routing entre vistas
- Favicon personalizado

---

# Sprint #2

## Funcionalidades implementadas
- Integración con Supabase para autenticación
- Guards para proteger rutas
- Mejora del flujo de login y registro
- Validaciones de formularios
- Diseño general de la aplicación

---

# Sprint #3

## Funcionalidades implementadas
- Juego Ahorcado
- Juego Mayor o Menor
- Sala de Chat en tiempo real
- Guardado de resultados en base de datos
- Manejo de sesión en navbar
- Mejoras visuales del Home

---

# Sprint #4

## Funcionalidades implementadas
- Juego Preguntados con API externa
- Juego Pulso Fantasma para reflejos
- Página de Resultados con rankings
- Mejora general del diseño
- Ambientación visual temática
- Música
- Fondos personalizados para login, registro y home

---

# Observaciones

El proyecto fue desarrollado de forma incremental, aplicando conceptos de:

- componentes reutilizables
- rutas protegidas
- servicios
- consumo de APIs
- persistencia de datos
- realtime
- diseño responsive
- arquitectura modular con Angular standalone

---

# Autor
**Giuliano Manuel Sohrobigarat**
