# Etapa 1: Construcción
FROM node:18 AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la app
RUN npm run build

# Etapa 2: Servir la app con un servidor estático (nginx)
FROM nginx:stable-alpine AS production

# Copiar archivos de build a nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplazar configuración de nginx si tienes una personalizada
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80\
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
