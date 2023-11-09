# Nombre de la Aplicación

Aplicación basada en Arquitectura Limpia

## Requisitos

- Docker
- Docker Compose

## Configuración

1. Clona este repositorio en tu máquina local.
2. Copia el archivo `.env.example` y renómbralo a `.env`.
3. Actualiza el archivo `.env` con la configuración correspondiente a tu entorno local.

## Despliegue Local

Sigue los siguientes pasos para desplegar la aplicación localmente utilizando Docker Compose:

1. Abre una terminal en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando para construir las imágenes de Docker:

   ```bash
   docker-compose build
   ```

3. Una vez finalizada la construcción, ejecuta el siguiente comando para iniciar los contenedores:

   ```bash
   docker-compose up -d
   ```

4. Accede a la aplicación en tu navegador web utilizando la siguiente URL para acceder buscar:

   ```bash
   http://localhost:8000/api/movie-search?query=hulk
   ```
5. Accede a la aplicación en tu navegador web utilizando la siguiente URL para acceder a la lista de populares:

   ```bash
   http://localhost:8000/api/movie-popular-list
   ``````

6. Para detener los contenedores, ejecuta el siguiente comando:

   ```bash
   docker-compose down
   ```

