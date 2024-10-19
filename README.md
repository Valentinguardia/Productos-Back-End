# Bases de un ecommerce

## Descripción

- Esta aplicación consiste en lo que podrían ser las bases de un e-commerce con diferentes productos y marcas. Podés simplemente visualizar los productos con sus características y, por otro lado, las marcas, donde al hacer clic en una, visualizás los productos de esa marca en particular.
Si iniciás sesión como administrador, podés crear, editar y eliminar los productos y marcas.

## Cómo levantar el proyecto

- Luego de clonar el repositorio, instale las dependencias necesarias ejecutando `npm install` en el directorio del proyecto, y luego ejecute `npm run dev` para hacer correr la aplicación.

## Estructura del Proyecto

- `/config`: Base de datos y generación de tokens.
- `/controllers`: Controladores que manejan la lógica de negocio.
- `/middleware`: Middlewares utilizados en la aplicación.
- `/models`: Modelos de datos de la aplicación.
- `/routes`: Definición de las rutas de la aplicación.

## Dependencias Principales

- cors: Middleware que permite o bloquea solicitudes HTTP en función de la configuración.
- express: Marco de aplicación web para Node.js.
- morgan: Middleware de registro de solicitudes HTTP para Express.

## Dependencias de desarrollo
- nodemon: Monitor de cambios en el código para reiniciar automáticamente la aplicación.

## Rutas API
Las rutas de la API y sus respectivos controladores se encuentran en la carpeta `routes` y `controllers`, respectivamente.

### Rutas de Users (`/users`)
- `POST /users/register`: Registra un nuevo usuario.
- `POST /users/login`: Inicia sesión con un usuario.
- `POST /users/logout`: Cierra sesión de un usuario.
- `GET /users/me`: Obtiene el usuario actualmente conectado.

### Rutas de Products (`/products`)
- `GET /products`: Obtiene todos los productos.
- `GET /products/:id`: Obtiene un producto específico.
- `POST /products`: Crea un nuevo producto.
- `PUT /products/:id`: Actualiza un producto existente
- `DELETE /products/:id`: Elimina un producto.

### Rutas de Brands (`/brands`)
- `GET /brands`: Obtiene todas las marcas.
- `GET /brands/:id`: Obtiene una marca específica.
- `POST /brands`: Crea una nueva marca.
- `PUT /brands/:id`: Actualiza una marca existente
- `DELETE /brands/:id`: Elimina una marca.





