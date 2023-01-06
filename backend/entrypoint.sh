#!/bin/bash

npm install && npm cache clean --force

# add keys needed for jwt
apt-get update && apt-get install -y openssl && \
    rm -rf /var/cache/apk/*
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

echo 'generating primsa ------------'
# initialize prisma client
npx prisma generate

# Migrate DB
npx prisma migrate dev

# Seed DB
npx prisma db seed

npm run start:dev