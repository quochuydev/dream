FROM node:latest
WORKDIR /source
COPY . /source
RUN npm run build
EXPOSE 3000