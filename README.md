# Sistema de Gestión de Tareas - Proyecto ADA 1

Este proyecto es una aplicación web desarrollada en **React** para la gestión eficiente de tareas, implementando estructuras de datos avanzadas para garantizar un rendimiento óptimo en operaciones de prioridad y búsqueda.

## Características Principales

El sistema utiliza dos estructuras de datos fundamentales para manejar la lógica de negocio:

### 1. Priority Heap (Montículo de Prioridad)
Se utiliza para gestionar el orden de atención de las tareas.
- **Lógica de Prioridad:**
  1. **Nivel de Prioridad:** Alta (3) > Media (2) > Baja (1).
  2. **Fecha de Vencimiento:** A igualdad de prioridad, la tarea que vence antes tiene preferencia.
  3. **ID:** Como criterio de desempate final.
- Permite obtener y completar siempre la tarea más importante en tiempo constante $O(1)$ (acceso) y logarítmico $O(\log n)$ (extracción).

### 2. Árbol AVL
Se utiliza como índice para búsquedas y modificaciones rápidas por ID.
- Mantiene las tareas ordenadas por su ID.
- Es un árbol binario de búsqueda **autobalanceado**.
- Garantiza que las operaciones de búsqueda, inserción y eliminación sean siempre **$O(\log n)$**, incluso en el peor de los casos.
- **Visualización de Pasos:** El sistema muestra en la consola del navegador cuántos pasos toma cada operación en el AVL para demostrar su eficiencia empíricamente.

## Tecnologías

- **Frontend:** React.js
- **Estilos:** Tailwind CSS + DaisyUI
- **Lenguaje:** JavaScript (ES6+)

## Requisitos Previos

Tener instalado:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm (viene incluido con Node.js)

## Instalación y Ejecución

Sigue estos pasos para correr el proyecto:

1. **Instalar dependencias:**
   Ejecuta el siguiente comando en la terminal dentro de la carpeta del proyecto:
   ```bash
   npm install
   ```

2. **Iniciar la aplicación:**
   Esto levantará el servidor de desarrollo local:
   ```bash
   npm run start
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Cómo Usar y Probar

### Interfaz de Usuario
- **Agregar Tarea:** Usa el formulario para ingresar ID, descripción, fecha y prioridad.
- **Tabla de Tareas:** Muestra todas las tareas ordenadas según la lógica del Heap.
- **Completar:** Puedes completar tareas específicas (desde la tabla) o usar el botón "Completar más prioritaria".
- **Buscar/Eliminar:** Usa los campos en el panel lateral para buscar o eliminar tareas por ID usando el AVL.

### Modo Debug y Demostración
Para verificar el funcionamiento interno y la eficiencia de las estructuras:

1. Abre la **Consola del Desarrollador** en tu navegador (Presiona `F12` o `Ctrl+Shift+I`).
2. En la aplicación, haz clic en el botón **"Debug Estructuras"**.
3. Verás en la consola:
   - La estructura interna del **Heap** (Array y representación de árbol).
   - El estado del **Árbol AVL** dibujado en texto, mostrando alturas y balance.
4. Al realizar operaciones (Buscar, Eliminar, Agregar), observa los logs en la consola que indican:
   - `[AVL Search] ID: 101, Pasos: 3`
   - Esto demuestra la eficiencia logarítmica del algoritmo.