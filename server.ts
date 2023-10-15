import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import portUsersResolvers from './schema/portUsers.resolver';
import typeDefs from './schema/portUsers';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;

const prisma = new PrismaClient();
const app = express();

const resolvers = {
  ...portUsersResolvers,
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

async function startApolloServer() {
  await server.start();
  app.use(
    '',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req, prisma }),
    })
  );
}

startApolloServer().then(() => {
  app.listen({ port: 4000 }, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
});
