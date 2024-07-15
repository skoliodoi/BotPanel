FROM node:20.11.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5988

# RUN npm run build

CMD ["npm", "run", "dev"]
