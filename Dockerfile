# Establece la imagen base
FROM node:20.11.1-alpine as build

# Establece el directorio de trabajo en la imagen Docker
WORKDIR /app

ENV HOST=0.0.0.0

# Copia el archivo package.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Instala Ionic globalmente dentro del contenedor
RUN npm install -g @ionic/cli

# Compila la aplicación
RUN ionic build

# Use Nginx for serving the app
FROM nginx:stable-alpine3.17-slim

RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/www /usr/share/nginx/html

# Replace default Nginx configuration with custom configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 8080

