cmake_minimum_required(VERSION 3.16)
project(Cola_de_prioridad_HEAP LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# IMPORTANTE: activar AUTOUIC, AUTOMOC y AUTORCC
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 REQUIRED COMPONENTS Widgets)

set(SOURCES
    src/main.cpp
    src/Qmainwindow.cpp
    src/monticulo.cpp
)

set(HEADERS
    include/mainwindow.h
    include/monticulo.h
)

set(UIS
    resources/mainwindow.ui
)

qt_add_executable(${PROJECT_NAME}
    ${SOURCES}
    ${HEADERS}
    ${UIS}
)

target_include_directories(${PROJECT_NAME} PRIVATE include)
target_link_libraries(${PROJECT_NAME} PRIVATE Qt6::Widgets)

