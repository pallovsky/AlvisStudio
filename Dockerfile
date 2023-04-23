FROM node:16.19.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
RUN ng build --output-path=dist

# base image
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
