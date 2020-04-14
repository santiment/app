FROM node:13

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn

COPY ./ /app

RUN yarn build
