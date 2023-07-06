FROM node:18-alpine
WORKDIR /usr
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 --location=global
EXPOSE 3000
CMD ["pm2-runtime", "main.js"]