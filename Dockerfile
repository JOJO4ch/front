# Указываем базовый образ
FROM node:latest as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /v2 
# хз либо сама папка src надо потыкать

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем nginx для сервировки приложения
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
