# API de Usuarios y Vehículos con Caché

Esta API permite la gestión de usuarios y vehículos. Los usuarios pueden registrarse y autenticarse mediante tokens JWT, y una vez autenticados, pueden realizar operaciones CRUD en la entidad de vehículos. Además, la API utiliza Redis para almacenar en caché los resultados de las consultas.

## Tecnologías Utilizadas

- NestJS
- MongoDB
- Redis (para caché)
- Passport.js (para autenticación JWT)

## Requisitos

- Node.js
- MongoDB
- Redis
- Docker (opcional)

## Configuración

1. Clona el repositorio:

   ```sh
   git clone https://github.com/moliendocode/nectia-challenge.git
   cd nectia-challenge
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

   ```sh
   MONGO_URL=mongodb://localhost/my-db
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key
   ```

4. Inicia MongoDB y Redis. Puedes hacerlo localmente o usando contenedores Docker.

5. Ejecuta la aplicación:

   ```sh
   npm run start
   ```

La API ahora debería estar ejecutándose en `http://localhost:3000`.

## Usando Docker Compose

Puedes usar Docker Compose para ejecutar la aplicación y sus dependencias en contenedores Docker. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

Modifica las variables de entorno en el archivo `docker-compose.yml` en la raíz del proyecto:

```yaml
version: '3.8'
services:
  app:
    environment:
      - MONGO_URL=mongodb://mongodb:27017/my-db
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
```

Luego, ejecuta el siguiente comando para iniciar todos los servicios:

```sh
docker-compose up
```

## Endpoints

### Usuarios

- `POST /users`: Crea un nuevo usuario.
  - Body: `{ "username": "string", "password": "string" }`

- `POST /users/auth/login`: Autentica a un usuario y devuelve un token JWT.
  - Body: `{ "username": "string", "password": "string" }`

- `Get /users`: Obtiene todos los usuarios (Requiere autenticación). Los resultados se almacenan en caché por 60 segundos.

### Vehículos

- `GET /vehicles`: Obtiene todos los vehículos (Requiere autenticación). Los resultados se almacenan en caché por 60 segundos.
  
- `GET /vehicles/:id`: Obtiene un vehículo por ID (Requiere autenticación).
  
- `POST /vehicles`: Crea un nuevo vehículo (Requiere autenticación).
  - Body: `{ "make": "string", "model": "string", "year": "number" }`
  
- `PUT /vehicles/:id`: Actualiza un vehículo por ID (Requiere autenticación).
  - Body: `{ "make": "string", "model": "string", "year": "number" }`
  
- `DELETE /vehicles/:id`: Elimina un vehículo por ID (Requiere autenticación).

## Autenticación

Para acceder a los endpoints de vehículos, debes incluir el token JWT en el encabezado de autorización de la solicitud con el formato `Authorization: Bearer YOUR_TOKEN`.

## Caché

Esta API utiliza Redis como almacenamiento de caché para mejorar el rendimiento de ciertas consultas. Los resultados de las consultas `GET` a `/users` y a `/vehicles` se almacenan en caché durante 60 segundos. Esto significa que las solicitudes repetidas a este endpoint dentro de un período de 60 segundos serán mucho más rápidas, ya que los datos se recuperarán de la caché en lugar de la base de datos.

