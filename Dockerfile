FROM node:21-alpine

COPY . /root/apollonia-api

WORKDIR /root/apollonia-api

RUN npm install
RUN npm run swagger
RUN npm run build

CMD npm start
