FROM node:14 AS builder
WORKDIR /home/build
COPY src ./src
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build

FROM node:14-alpine
WORKDIR /home/app
COPY --from=builder /home/build/dist /home/app/dist
COPY --from=builder /home/build/package.json /home/app
RUN npm install --production

EXPOSE 3000
VOLUME [ "/home/app/public/qr" ]
CMD [ "npm", "start" ]