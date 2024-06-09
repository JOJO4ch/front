# Указываем базовый образ
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Открываем порт
EXPOSE 3000

EXPOSE 5173

# Запускаем сервер разработки
CMD ["npm", "run", "dev"]
