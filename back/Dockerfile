FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
