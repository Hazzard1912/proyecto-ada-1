# Proyecto: Colas de Prioridad con Montículos y Árboles AVL

## 📌 Descripción
Sistema de gestión de tareas que combina:
- **Montículos binarios (min/max heap)** para manejar prioridades.
- **Árboles AVL** para indexar tareas por identificador único.

## ⚙️ Funcionalidades
- Insertar tareas en ambas estructuras.
- Eliminar la tarea de mayor prioridad y actualizar el índice.
- Buscar tareas por ID en el árbol AVL.
- Obtener la tarea más prioritaria desde el heap.

## 📝 Caso de Uso
Aplicación de productividad donde cada tarea tiene:
- ID único  
- Descripción  
- Prioridad (alta, media, baja)  
- Fecha de vencimiento  

**Ejemplo:**
1. Estudiar para el examen (Alta, ID: 101)  
2. Comprar útiles escolares (Media, ID: 102)  
3. Revisar correos electrónicos (Baja, ID: 103)  

La tarea con prioridad **Alta** será la primera en la cola.  
El árbol AVL permite búsquedas rápidas por ID.  
Al completar una tarea, se elimina de ambas estructuras.

## 🎯 Objetivos
- Comprender montículos y colas de prioridad.  
- Explorar árboles AVL para búsquedas eficientes.  
- Practicar inserción, eliminación y balanceo automático.  
- Fortalecer programación en **Python, C++ o Java**.  

## ✅ Requerimientos
- Implementar heap con inserción/extracción.  
- Implementar árbol AVL con inserción, búsqueda y eliminación balanceada.  
- Casos de prueba: inserción, eliminación, indexación y equilibrio.  
- Interfaz gráfica (GUI).  
