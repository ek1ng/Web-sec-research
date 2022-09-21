FROM node:alpine

COPY backend/ /app
COPY frontend/ /tmp/build

RUN mkdir /app/static

WORKDIR /tmp/build
RUN npm install --registry=https://registry.npm.taobao.org && npm run build && cp -r /tmp/build/dist/* /app/static/

WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000
CMD node bin/www