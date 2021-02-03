FROM node:latest
WORKDIR /src
COPY . /src
RUN npm run build
EXPOSE 3000