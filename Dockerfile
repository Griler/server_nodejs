FROM node:16.16.0
RUN npm install -g --unsafe-perm prisma2@2.0.0-preview-12

RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./ 
EXPOSE 80
CMD ["npm", "start"]