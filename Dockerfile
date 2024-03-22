# Establece la imagen base
FROM node:20.11.1-alpine

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

# Expone el puerto 8100
EXPOSE 8100

# Ejecuta la aplicación
CMD [ "ionic", "serve", "--host=0.0.0.0", "--port=8100" ]
