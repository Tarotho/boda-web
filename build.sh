#!/bin/sh

# Navegar al directorio del proyecto si es necesario
# cd /ruta/a/tu/proyecto

# Actualizar el repositorio con la última versión del código
echo "Actualizando el repositorio..."
git checkout master
git pull

# Construir las imágenes de Docker sin usar caché
echo "Construyendo la imagen de Docker sin caché..."
docker compose build --no-cache

echo "Proceso completado."
