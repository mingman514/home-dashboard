FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "host"]
