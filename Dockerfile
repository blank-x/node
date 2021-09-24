FROM node:10-alpine

MAINTAINER zsy <zhaoshaoyong@foxmail.com>
COPY . /home/project
WORKDIR /home/project

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000

CMD node index.js
