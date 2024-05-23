FROM node:20.12-buster-slim

COPY . /app
WORKDIR /app

RUN npm install
RUN npx tsc

CMD ["/bin/bash", "-c", "node dist/index.js"]