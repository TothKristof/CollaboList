import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";
import { resolvers } from "./resolvers.js"; // ← EZ FONTOS

const typeDefs = fs.readFileSync(
  path.join(process.cwd(), "src/schema.graphql"),
  "utf8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);