# ---- Base Node ----
FROM node:13.12-alpine AS base
MAINTAINER Yura Zatsepin <yura.z@santiment.net>

# ENV vars
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ARG GIT_HEAD
RUN GIT_HEAD=$GIT_HEAD
# Tini - https://github.com/krallin/tini#why-tini
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /opt/san/app
COPY . /opt/san/app
# This still speeds things in general, because npm install
# from scratch is slow.
COPY .node_modules.tar.gz* /opt/san/app/
# Only extract if file not empty
RUN test -s .node_modules.tar.gz \
  && tar xzf .node_modules.tar.gz -C /opt/san/app \
  && echo "Extracted .node_modules.tar.gz to /opt/san/app/node_modules" \
  || true

#COPY package.json package-lock.json* scripts webpack.sw.config.js* config-overrides.js* babel.config.js* ./

# ---- Builder ----
FROM base AS builder
RUN apk --no-cache add git
# Install library dependencies
RUN npm set progress=false && npm config set depth 0
RUN if [ "$CI" = "true" ] ; then npm ci --no-audit --progress=false; else npm i --no-progress --no-audit --prefer-offline; fi
RUN npx patch-package
RUN npm cache clean --force

# ---- Execution Prod ----
FROM builder AS prod
WORKDIR /opt/san/app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /opt/san/app/node_modules /opt/san/app/node_modules
COPY --from=builder /opt/san/app/package-lock.json /opt/san/app/
RUN npm run build

# ---- Execution Dev ----
FROM base AS dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /opt/san/app/node_modules /opt/san/app/node_modules
COPY --from=builder /opt/san/app/package-lock.json /opt/san/app/
