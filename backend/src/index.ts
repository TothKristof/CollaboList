import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { resolvers } from "./resolvers";

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
  context: async ({ req, res }) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) return { res };

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      return { userId: decoded.userId, res };
    } catch {
      return { res };
    }
  }
});

console.log(`🚀 Server ready at ${url}`);