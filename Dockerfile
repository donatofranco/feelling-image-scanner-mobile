# Establece la imagen base
FROM node:20.11.1-alpine as build

# Establece el directorio de trabajo en la imagen Docker
WORKDIR /app

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
FROM nginx:1.21.1-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/www /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

