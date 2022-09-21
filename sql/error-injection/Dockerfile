FROM node:alpine




WORKDIR /tmp/build
COPY frontend/ /tmp/build
RUN yarn config set registry https://registry.npmmirror.com && yarn && yarn build

WORKDIR /app
COPY backend/ /app
RUN yarn && cp -r /tmp/build/dist/* static/

ENTRYPOINT ["yarn", "start" ]