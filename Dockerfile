# Etapa 1: Build
FROM node:22-alpine3.19 AS build

# Clonar el repositorio privado
WORKDIR /app

# Instala las dependencias
RUN npm install

# Construye la aplicación Angular para producción
RUN npm run build

# Etapa 2: Correr con Nginx
FROM nginx:1.27-alpine

# Copia los archivos construidos en la etapa anterior al directorio de Nginx
COPY --from=build /app/boda-web/dist/boda-web/browser /usr/share/nginx/html

# Copia la configuración personalizada de Nginx (asegúrate de tener este archivo)
COPY --from=build /app/boda-web/nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
