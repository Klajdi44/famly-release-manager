## Commands for running project:

### Docker-compose commands

Start all services

```
docker-compose up

```

Stop all services

```
docker-compose stop
```

Stop all services (+ remove containers and networks)

```
docker-compose down
```

Start a specific service or multiple services:

```
docker-compose up <SERVICE_NAME> [, <SERVICE_NAMe>]
```

Example: Start backend and postgres containers

```
docker-compose up backend database_prisma
```

### Docker Exec Commands

#### Postgres database

```
docker-compose exec <SERVICE_NAME> psql -U <POSTGRES_USER> <POSTGRES_DB>
```

Example

```
docker-compose exec database_prisma psql -U famly_prisma db_dev_prisma
```

#### Backend

```
docker-compose exec backend sh
```

#### Frontend

```
docker-compose exec frontend sh
```

### Prisma Commands

Important: These commands should be executed from inside the backend container. To do so, run docker-compose exec backend sh.

#### Migrate database

```
npx prisma migrate dev
```

Seed database

```
npx prisma db seed
```

Reset database
npx prisma migrate dev reset

Start Stop all services:

```
docker-compose up
```

```
docker-compose stop
```

```
docker-compose down
```

Start Stop a specific service or multiple services:

```
docker-compose up <SERVICE_NAME> [, <SERVICE_NAME>]
```

Generic command:

Example command

```
docker-compose exec <SERVICE_NAME> <COMMAND>
```

Postgres Database

```
docker-compose exec database_prisma psql -U famly_prisma db_dev_prisma
```

Backend

```
docker-compose exec backend sh
```

Frontend

```
docker-compose exec frontend sh
```

## Running tests

In order to run both Unit and Component test you will just need to follow these steps:

1. If you are in the root folder the go to `/frontend`
2. Run `npm run test`

## Accessing values inside Redis

In order to see what is inside Redis then follow these instructions:

1. From the root folder run: `docker-compose exec redis sh` in the terminal
2. Run `redis-cli`
3. All the values inside Redis will be listed if you run: `KEYS *`
