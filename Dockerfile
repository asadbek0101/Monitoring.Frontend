FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
ENV WDS_SOCKET_PORT=0
CMD ["npm", "start"]

#hello