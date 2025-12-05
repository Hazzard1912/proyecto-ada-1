#include "monticulo.h"
#include <cstdlib>
#include <ctime>
#include <algorithm>

using namespace std;

static std::string generarPrioridad() {
    string p;
    p += char('A' + rand() % 26);
    p += char('A' + rand() % 26);
    p += char('A' + rand() % 26);
    return p;
}

void PriorityQueueTarea::heapifyUp(int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (!(heap[i] > heap[parent]))
            break;
        std::swap(heap[i], heap[parent]);
        i = parent;
    }
}

void PriorityQueueTarea::heapifyDown(int i) {
    int n = (int)heap.size();
    while (true) {
        int left  = 2*i + 1;
        int right = 2*i + 2;
        int largest = i;

        if (left < n && heap[left] > heap[largest])
            largest = left;
        if (right < n && heap[right] > heap[largest])
            largest = right;
        if (largest == i) break;
        std::swap(heap[i], heap[largest]);
        i = largest;
    }
}

void PriorityQueueTarea::push(const Tarea& t) {
    heap.push_back(t);
    heapifyUp((int)heap.size() - 1);
}

void PriorityQueueTarea::pop() {
    if (heap.empty()) throw std::runtime_error("Heap vacío");
    heap[0] = heap.back();
    heap.pop_back();
    if (!heap.empty()) heapifyDown(0);
}

Tarea PriorityQueueTarea::top() const {
    if (heap.empty()) throw std::runtime_error("Heap vacío");
    return heap[0];
}

bool PriorityQueueTarea::empty() const { return heap.empty(); }
int PriorityQueueTarea::size() const { return (int)heap.size(); }
const std::vector<Tarea>& PriorityQueueTarea::data() const { return heap; }

void PriorityQueueTarea::actualizarPrioridadIndice(int i, const char nueva[4]) {
    if (i < 0 || i >= (int)heap.size()) throw std::out_of_range("índice fuera de rango");
    std::strcpy(heap[i].prioridad, nueva);
    heapifyUp(i);
    heapifyDown(i);
}

// Expose a helper to generate priority (usable from other cpp files)
std::string generarPrioridadAleatoriaPublic() {
    return generarPrioridad();
}

// Seed RNG at load time
struct _SeedRand {
    _SeedRand() { std::srand((unsigned)std::time(nullptr)); }
} _seedRandInstance;
