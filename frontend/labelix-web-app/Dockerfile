### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/labelix-web-app /usr/share/nginx/html