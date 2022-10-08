import { ApolloServer } from 'apollo-server';
import path from 'node:path';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { AppointmentsResolver } from './resolvers/appointments-resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  })

  const server = new ApolloServer({
    schema
  });

  const { url } = await server.listen();
  console.log(`🟢 HTTP server running on ${url}`)
}

bootstrap();

// import { ApolloServer, gql } from 'apollo-server';
// import { randomUUID } from 'node:crypto';

// const typeDefs = gql`
//   type User {
//     id: String!
//     name: String!
//   }

//   type Query {
//     users: [User!]!
//   }

//   type Mutation {
//     createUser(name: String!): User!
//   }
// `

// interface User {
//   id: string;
//   name: string
// }

// const users: User[] = [];

// const server = new ApolloServer({
//   typeDefs,
//   resolvers: {
//     Query: {
//       users: () => {
//         return users;
//       }
//     },

//     Mutation: {
//       createUser: (_, args) => {
//         const user = {
//           id: randomUUID(),
//           name: args.name
//         };

//         users.push(user);

//         return user;
//       }
//     }
//   }
// });

// server.listen().then(({ url }) => {
//   console.log(`🟢 HTTP server running on ${url}`)
// });