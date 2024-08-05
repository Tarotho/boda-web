# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json y package-lock.json (o yarn.lock si usas Yarn)
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build

# Etapa 2: Correr con Nginx
FROM nginx:1.27-alpine

# Copia los archivos construidos en la etapa anterior al directorio de Nginx
COPY --from=build /app/dist/boda-web/browser /usr/share/nginx/html

# Copia la configuración personalizada de Nginx (asegúrate de tener este archivo)
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
