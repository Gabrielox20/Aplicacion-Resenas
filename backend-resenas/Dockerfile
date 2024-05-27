# syntax=docker/dockerfile:1
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}

CMD ["npm", "run", "dev"]
