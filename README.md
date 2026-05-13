# TP #1 - Sala de Juegos 🎮

**Materia:** Programación IV  
**Alumno:** Giuliano  
**Deploy:** https://sala-juegos-eight.vercel.app
**Repositorio:** https://github.com/giulianolol/TP-1-Sohrobigarat---Programacion-IV

---

## Tecnologías utilizadas

- Angular
- TypeScript
- Bootstrap
- Supabase
- Vercel

---

## Descripción del proyecto

Aplicación web "Sala de Juegos" donde los usuarios pueden registrarse, iniciar sesión y medir habilidades cognitivas y motrices.

---

# Sprint 1 ✅

### Implementado

- Creación del proyecto Angular
- Deploy en Vercel
- Componentes:
  - Login
  - Registro
  - Home / Bienvenida
  - Quién Soy
- Navegación entre componentes
- Página "Quién Soy":
  - Datos obtenidos desde API de GitHub
  - Imagen de perfil
  - Información del alumno
  - Explicación del juego propio
- Favicon personalizado
- Diseño responsive con Bootstrap

---

# Sprint 2 ✅

### Implementado

### Autenticación

- Registro de usuarios con:
  - Email
  - Nombre
  - Apellido
  - Edad
  - Contraseña

- Inicio de sesión con Supabase
- Inicio de sesión automático luego del registro
- Cierre de sesión
- Manejo de errores en login y registro
- Usuarios de prueba para acceso rápido

### Home dinámico

- Si el usuario no está logueado:
  - Botón Login
  - Botón Registro

- Si el usuario está logueado:
  - Muestra nombre y apellido
  - Botón cerrar sesión

### Gestión de usuario

Los datos básicos del usuario (`nombre` y `apellido`) se almacenan utilizando `user_metadata` de Supabase Auth, evitando crear una tabla adicional innecesaria.

---
Estadísticas y puntajes
