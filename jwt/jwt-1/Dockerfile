FROM node:16

COPY backend/ /app

WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD node app.js