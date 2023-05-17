FROM node:18.16.0-bullseye

COPY . /app
WORKDIR /app

RUN npm install
RUN npx tsc

CMD ["/bin/bash", "-c", "node dist/index.js"]