FROM node:19-alpine as build-stage

# install simple http server for serving static content
RUN npm install -g http-server

# Next, we copy the entire project.
COPY . /var/www/imperia-ui

# We begin by creating a workspace where the project will recide.
WORKDIR /var/www/imperia-ui

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/www/imperia-ui/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
