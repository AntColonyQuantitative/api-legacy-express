# Tougu Server



## Environment setup

1. Install `Node.js`.

```bash
brew install node
```

2. Install PostgreSQL and initial.

```bash
# Load package (this line is used according to your computer's situation)
brew tap homebrew/core

# Recommended installation method
brew install postgresql@15

# Check version
psql -V 或者 psql --version

# Add environment variables
echo 'export PATH="/usr/local/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Start PostgreSQL service
brew services start postgresql@15

# Create user and initialize password
createuser postgres -P

# Create Database
createdb toguDb -O postgres -E UTF8 -e

# Connection
psql -h 127.0.0.1 -p 5432 -U postgres -d postgres

```

OR if you want to use docker [To run a PostgreSQL database locally:](##to-run-a-postgresql-database-locally).

3. Run `yarn` initialize the package required for the project.

```bash
npm install -g yarn
yarn install
```

4. Create `api/.env` file.

```sh
echo "DATABASE_URL=postgresql://postgres:TOUGU_ADMIN@localhost:5432/toguDb" >> .env
echo "JWT_SECRET=hello_tougu" >> .env

# Migrate local database
cd prisma/touguDb
npx prisma migrate reset
```

5. Start server.

```sh
yarn start
```

Now you can see it on: http://localhost:4000/graphql

## Now we can operate on the webpage, use mutation to create your first user

Operation:

```sql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    token
  }
}
```

Variables:

```sql
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

```SQL
query AuthenticUser($email: String!, $password: String!) {
  authenticUser(email: $email, password: $password) {
    token
  }
}
```

```sql
{
"email": "admin@tougu.com",
"password": "tougu_admin"
}
```

## Running your queries and mutations with a token

Running an example query like:

```sql
query GetUsers {
  getUsers {
    id
    email
  }
}
```

And put your token in Headers as:

```sh
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzMyMzgwOCwiZXhwIjoxNjk3MzY3MDA4fQ.Xo4xASTWtz_I3-jAv5l-DGk9LDCy6RxkwMCmKtCGEd4
```

## To run a PostgreSQL database locally:

1. Install docker locally: https://www.docker.com/get-started
2. Pull the PostgreSQL Image:

```bash
docker pull postgres
```

3. Run a PostgreSQL Container:

```sh
docker run --name togudb -e POSTGRES_PASSWORD=TOUGU_ADMIN -e POSTGRES_DB=toguDb -p 5432:5432 -d postgres
```

4. Wait for the Container to Start and check the container's status:

```sh
docker ps
```

5. Download a DBeaver: https://dbeaver.io/download/, connect your db using DBeaver by using the following config:

```sh
Host: localhost
Port: 5432
Database: toguDb
Username: postgres
Password: TOUGU_ADMIN
```

6. (optional). Stop and remove the container: (you need to run step 3 again once you remove it):

```sh
docker stop togudb
docker rm togudb
```
