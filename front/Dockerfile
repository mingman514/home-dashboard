FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]
