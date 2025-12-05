#pragma once
#include <QMainWindow>
#include "monticulo.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void crearTarea();
    void actualizarListado();
    void atenderTarea();
    void asignarAAA();
    void listaItemClicked(QListWidgetItem *item);

private:
    Ui::MainWindow *ui;
    PriorityQueueTarea heap;
    int contadorID = 1;

    void refrescarLista();
    void mostrarMensaje(const QString &msg);
    void rebuildHeapFromVector(const std::vector<Tarea>& v);
};
