#!/bin/bash

npm install && npm cache clean --force
npm rebuild esbuild
RUN exec "$@"
npm run docker-dev;