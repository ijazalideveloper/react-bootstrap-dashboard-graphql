FROM 552175362129.dkr.ecr.us-east-1.amazonaws.com/node12alpine:latest
# FROM node:12-alpine
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN apk --no-cache add git
ENV REACT_APP_BASEURL="_REACT_APP_BASEURL"
RUN npm install -g serve
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]
