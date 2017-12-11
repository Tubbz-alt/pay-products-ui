FROM node:6.12.2-alpine

RUN apk update &&\
    apk upgrade &&\
    apk add --update bash python make g++ ruby openssl

ADD docker/sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub

RUN apk --no-cache add ca-certificates
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk
RUN apk add glibc-2.25-r0.apk

# add package.json before source for node_module cache layer
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
WORKDIR /app
ENV LD_LIBRARY_PATH /app/node_modules/appmetrics
CMD rm -rf node_modules && ln -s /tmp/node_modules /app/node_modules && npm run compile && npm run lint && npm test -- --forbid-only --forbid-pending && rm -rf node_modules
