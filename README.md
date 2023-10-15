# Tougu Server

- [Tougu Server](#tougu-server)
  - [Environment setup](#environment-setup)
  - [Use mutation to create your first user:](#use-mutation-to-create-your-first-user)
  - [Authenticate user and get your user token before running queries](#authenticate-user-and-get-your-user-token-before-running-queries)
  - [Running your queries and mutations with a token](#running-your-queries-and-mutations-with-a-token)
  - [To run a PostgreSQL database locally:](#to-run-a-postgresql-database-locally)

## Environment setup

0. We use `yarn` to manage the packages, so make sure you have `yarn` installed. You can run `npm install -g yarn` to install yarn.  
   We use PostgreSQL as our local database, you can refer this [To run a PostgreSQL database locally:](#to-run-a-postgresql-database-locally) to setup your local database
1. clone this repo.
2. run `yarn` in the project root.
3. add a `.env` file, and include the following

```
DATABASE_URL=postgresql://postgres:TOUGU_ADMIN@localhost:5432/toguDb
JWT_SECRET=hello_tougu
```

4. Reset your local database, using

```
npx prisma migrate reset
```

Navigate to prisma folder, and init prisma

```
cd prisma/touguDb
npx prisma generate
```

5. run `yarn start` to start developing.

## Use mutation to create your first user:

0. Make sure the project is running at: http://localhost:4000/graphql
1. Create your first user using the following mutation:

```
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    token
  }
}
{
  "input": {
    "email": "admin@tougu.com",
    "password":"tougu_admin",
    "displayName": "admin",
    "mobile": "0412 345 678",
    "realName": "tougu_master",
    "ref": "admin"
  }
}
```

## Authenticate user and get your user token before running queries

Running the following query to get a token

```
query AuthenticUser($email: String!, $password: String!) {
  authenticUser(email: $email, password: $password) {
    token
  }
}

{
"email": "admin@tougu.com",
"password": "tougu_admin"
}
```

## Running your queries and mutations with a token

Running an example query like:

```
query GetUsers {
  getUsers {
    id
    email
  }
}
```

And put your token in Headers as:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzMyMzgwOCwiZXhwIjoxNjk3MzY3MDA4fQ.Xo4xASTWtz_I3-jAv5l-DGk9LDCy6RxkwMCmKtCGEd4
```

## To run a PostgreSQL database locally:

1. Install docker locally:https://www.docker.com/get-started
2. Pull the PostgreSQL Image:
   ```
   docker pull postgres
   ```
3. Run a PostgreSQL Container:
   ```
   docker run --name togudb -e POSTGRES_PASSWORD=TOUGU_ADMIN -e POSTGRES_DB=toguDb -p 5432:5432 -d postgres
   ```
4. Wait for the Container to Start and check the container's status:

   ```
   docker ps
   ```

5. Download a DBeaver: https://dbeaver.io/download/, connect your db using DBeaver by using the following config:
   ```
   Host: localhost
   Port: 5432
   Database: toguDb
   Username: postgres
   Password: TOUGU_ADMIN
   ```

6 (optional). Stop and remove the container: (you need to run step 3 again once you remove it):

```
docker stop togudb
docker rm togudb
```
