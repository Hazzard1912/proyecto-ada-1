#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QListWidgetItem>
#include <QString>
#include <QMessageBox>
#include <cstring>

// Forward declaration of helper in monticulo.cpp
std::string generarPrioridadAleatoriaPublic();

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent), ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    connect(ui->btnCrearNueva, &QPushButton::clicked, this, &MainWindow::crearTarea);
    connect(ui->btnActualizarListado, &QPushButton::clicked, this, &MainWindow::actualizarListado);
    connect(ui->btnAtenderTarea, &QPushButton::clicked, this, &MainWindow::atenderTarea);
    connect(ui->btnAsignarAAA, &QPushButton::clicked, this, &MainWindow::asignarAAA);
    connect(ui->listTareas, &QListWidget::itemClicked, this, &MainWindow::listaItemClicked);

    ui->lblMensaje->setText("");
    ui->lblTotalTareas->setText("Total de tareas: 0");
    ui->lblTareaSeleccionada->setText("Tarea seleccionada: --");
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::crearTarea() {
    QString desc = ui->txtDescripcionNueva->toPlainText().trimmed();
    if (desc.isEmpty()) {
        mostrarMensaje("La descripción no puede estar vacía.");
        return;
    }

    Tarea t;
    t.id = contadorID++;
    std::string p = generarPrioridadAleatoriaPublic();
    std::strcpy(t.prioridad, p.c_str());
    t.descripcion = desc.toStdString();

    heap.push(t);

    ui->txtDescripcionNueva->clear();
    mostrarMensaje("Tarea creada correctamente.");
    refrescarLista();
}

void MainWindow::actualizarListado() {
    refrescarLista();
}

void MainWindow::atenderTarea() {
    if (heap.empty()) {
        mostrarMensaje("No hay tareas para atender.");
        return;
    }
    Tarea t = heap.top();
    heap.pop();
    QString msg = QString("Tarea atendida: ID %1 - %2")
                    .arg(t.id)
                    .arg(QString::fromStdString(t.descripcion));
    mostrarMensaje(msg);
    refrescarLista();
}

void MainWindow::asignarAAA() {
    QListWidgetItem *item = ui->listTareas->currentItem();
    if (!item) {
        mostrarMensaje("Selecciona una tarea del listado.");
        return;
    }
    int id = item->data(Qt::UserRole).toInt();

    // extraer todos los elementos a un vector temporal
    std::vector<Tarea> temp;
    while (!heap.empty()) {
        temp.push_back(heap.top());
        heap.pop();
    }

    // modificar la prioridad de la tarea con el id buscado
    bool encontrado = false;
    for (auto &t : temp) {
        if (t.id == id) {
            std::strcpy(t.prioridad, "AAA");
            encontrado = true;
            break;
        }
    }

    // reconstruir el heap con los elementos (ya modificado)
    rebuildHeapFromVector(temp);

    if (encontrado) {
        mostrarMensaje("Prioridad AAA asignada correctamente.");
    } else {
        mostrarMensaje("No se encontró la tarea seleccionada.");
    }
    refrescarLista();
}

void MainWindow::listaItemClicked(QListWidgetItem *item) {
    if (!item) return;
    int id = item->data(Qt::UserRole).toInt();
    ui->lblTareaSeleccionada->setText(QString("Tarea seleccionada: ID %1").arg(id));
}

void MainWindow::refrescarLista() {
    ui->listTareas->clear();

    // extraemos contenido del heap temporalmente para iterar en orden de prioridad
    std::vector<Tarea> aux;
    while (!heap.empty()) {
        aux.push_back(heap.top());
        heap.pop();
    }

    // Mostrar en QListWidget en orden (top primero)
    for (const auto &t : aux) {
        QString itemText = QString("ID %1 | %2 | %3")
            .arg(t.id)
            .arg(QString::fromStdString(std::string(t.prioridad)))
            .arg(QString::fromStdString(t.descripcion));

        QListWidgetItem *item = new QListWidgetItem(itemText);
        item->setData(Qt::UserRole, t.id);
        ui->listTareas->addItem(item);
    }

    // Volvemos a guardar los elementos en el heap para mantener estado
    for (const auto &t : aux) heap.push(t);

    ui->lblTotalTareas->setText(QString("Total de tareas: %1").arg(heap.size()));
}

void MainWindow::mostrarMensaje(const QString &msg) {
    ui->lblMensaje->setText(msg);
}

void MainWindow::rebuildHeapFromVector(const std::vector<Tarea>& v) {
    for (const auto &t : v) heap.push(t);
}
