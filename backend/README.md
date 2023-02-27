## Local installation

```bash
$ npm install
```

```bash
# Generate RSA Key Pair
$ openssl genrsa -out private.pem 2048
$ openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

```bash
# attach to the db container
$ docker compose exec database psql -U famly db_dev
```

```bash
# attach to the backend container
docker compose exec backend sh
$
```

## Running the app

Since the project is done using docker, it is recommended to use every command inside a docker container (npm install f.x)

```bash
# This should re run in the root folder (you should not be inside a container in order to run this)
docker compose up
```

### Middleware

## Compression

Compression is an optimization method. For example, an API might receive a request from a web application, in return, the API sends back a response. Sometimes, responses contain a lot of data. When that happens, the response size increases increasing the bandwidth and also increasing the client’s data consumption. This becomes more noticeable in mobile apps as response sizes can dramatically reduce the user’s mobile data.

## helmet

helmet is a middleware that improves the security of the application.
Helmet helps you secure Express app by setting various HTTP headers.

## body-parser

The body-parser middleware parses all incoming requests body content and adds the information inside the req.body before triggering any handlers. This is useful especially when working with PUT and/or POST requests.

## cors

Our API needs to be accessible from different client origins, for example, from a mobile device, or from a web browser while the API is running in a different server.

## DB

you need to be in the backend folder first, in order to do that run:

```bash
docker compose exec backend sh
```

```bash
#Generate prisma client
npx prisma generate
```

```bash
#seed the database
npx prisma db seed
```

```bash
#run migrations
npx prisma migrate dev
```

```bash
#if you want to create a new migration:
npx prisma migrate dev --name <NAME_OF_MIGRATION>
```

```bash
#if you want to reset all data:
npx prisma migrate reset
```
