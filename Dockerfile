FROM node:13

ARG GIT_HEAD
RUN GIT_HEAD=$GIT_HEAD

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./patches /app/patches
RUN yarn

COPY ./ /app

RUN yarn build
