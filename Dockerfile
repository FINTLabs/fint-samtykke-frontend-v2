FROM node:20.20.2-alpine3.22
WORKDIR /app
COPY environment.js ./
COPY build/ build/
COPY server/ server/
COPY public/ public/
COPY node_modules/ node_modules/
COPY package.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
