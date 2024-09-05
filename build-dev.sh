#!/bin/sh

# Navegar al directorio del proyecto si es necesario
# cd /ruta/a/tu/proyecto

# Actualizar el repositorio con la última versión del código
echo "Actualizando el repositorio..."
git checkout dev
git pull

# Construir las imágenes de Docker sin usar caché
echo "Construyendo la imagen de Docker sin caché..."
docker compose -f docker-compose.dev.yml build --no-cache

echo "Proceso completado."
