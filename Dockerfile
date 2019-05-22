# govukpay/nodejs:alpine-3.8.1
FROM govukpay/nodejs@sha256:a3ae1b0b3ab5e7cdefe0787b97b1047cdc5e0c5166fb677e3cefac538bc99f86

RUN apk --no-cache upgrade
RUN apk add --no-cache bash

ENV PORT 9000
EXPOSE 9000

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --production

WORKDIR /app
ADD . /app

RUN ln -s /tmp/node_modules /app/node_modules
ENV LD_LIBRARY_PATH /app/node_modules/appmetrics
CMD npm start
