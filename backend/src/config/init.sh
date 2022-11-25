#!/bin/bash
npm install
apk add --update openssl && \
    rm -rf /var/cache/apk/*
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
npm run start:dev