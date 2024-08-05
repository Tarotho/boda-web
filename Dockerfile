# Etapa 1: Build
FROM node:22-alpine3.19 AS build

# Instalar herramientas necesarias
RUN apk update && apk add --no-cache git openssh

# Configurar SSH para acceder a GitHub
ARG SSH_PRIVATE_KEY
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_ed25519 && chmod 600 /root/.ssh/id_ed25519
RUN echo "StrictHostKeyChecking no" > /root/.ssh/config
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN git clone git@github.com:Tarotho/boda-web.git

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
