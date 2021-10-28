# ---- Base Node ----
FROM node:14.18.1-alpine AS base
MAINTAINER Yura Zatsepin <yura.z@santiment.net>

# ENV vars
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
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
# Only extract if archive file with node_modules not empty
RUN test -s .node_modules.tar.gz \
  && tar xzf .node_modules.tar.gz -C /opt/san/app \
  && echo "Extracted .node_modules.tar.gz to /opt/san/app/node_modules" \
  || true

# ---- Deps ----
FROM base AS deps
RUN apk --no-cache add git
# Install library dependencies
RUN npm config set depth 0
RUN npm config set package-lock true
ENV NODE_ENV=development
RUN if [ "$CI" = "true" ] ; then npm ci --no-audit --progress=false; else npm i --no-progress --no-audit --prefer-offline; fi
RUN npx patch-package
RUN npm cache clean --force

# ---- Execution Dev ----
FROM base AS dev
ENV NODE_ENV=${NODE_ENV}
COPY . /opt/san/app
COPY --from=deps /opt/san/app/node_modules /opt/san/app/node_modules
COPY --from=deps /opt/san/app/package-lock.json /opt/san/app/package-lock.json

# ---- Builder Prod ---
FROM deps AS builder
WORKDIR /opt/san/app
ENV NODE_ENV=production
COPY --from=deps /opt/san/app/node_modules /opt/san/app/node_modules
RUN npm run build

# ---- Prod ---
FROM node:13.12-alpine AS prod
WORKDIR /opt/san/app
ENV NODE_ENV=production
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ARG GIT_HEAD
RUN GIT_HEAD=$GIT_HEAD
COPY --from=builder /opt/san/app/build /opt/san/app/build
