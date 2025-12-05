#pragma once
#include <vector>
#include <string>
#include <stdexcept>
#include <cstring>

struct Tarea {
    int id;
    char prioridad[4];      // ejemplo: "AAA"
    std::string descripcion;

    std::string prioridadStr() const {
        return std::string(prioridad);
    }

    // Para max-heap: queremos que "AAA" sea considerado mayor
    bool operator>(const Tarea& other) const {
        return prioridadStr() < other.prioridadStr();
    }

    bool operator<(const Tarea& other) const {
        return prioridadStr() > other.prioridadStr();
    }
};

class PriorityQueueTarea {
private:
    std::vector<Tarea> heap;

    void heapifyUp(int i);
    void heapifyDown(int i);

public:
    void push(const Tarea& t);
    void pop();
    Tarea top() const;
    bool empty() const;
    int size() const;
    const std::vector<Tarea>& data() const;

    // actualizar prioridad del elemento en índice i (interno del heap)
    void actualizarPrioridadIndice(int i, const char nueva[4]);
};

// Generador público de prioridad aleatoria AAA-ZZZ
std::string generarPrioridadAleatoriaPublic();
