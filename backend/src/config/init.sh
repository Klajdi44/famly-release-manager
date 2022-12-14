#!/bin/bash
# the bcrypt node modules are different for macOS and Linux OS, and other OS so it is necessary to unistall what was installed 
# from the host OS and re-install it in the container (Linux)
# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt

# add keys needed for jwt
apt-get update && apt-get install -y openssl && \
    rm -rf /var/cache/apk/*
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

echo 'generating primsa ------------'
# initialize prisma client
npx prisma generate

npm run start:dev