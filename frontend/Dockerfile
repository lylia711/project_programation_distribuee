FROM node:17.4.0-alpine3.14
WORKDIR /app/frontend

COPY package.json ./
RUN npm install -g npm@8.4.0
RUN npm install 
# RUN npm install react-scripts@3.4.1 -g 
COPY . ./
EXPOSE 3000