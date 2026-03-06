import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { resolvers } from "./resolvers";
import { GraphQLError } from 'graphql';
import { AppError } from './errors/AppError';
import { Context } from "./types/context";

const typeDefs = fs.readFileSync(
  path.join(process.cwd(), "src/schema.graphql"),
  "utf8"
);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    if (!(error instanceof AppError)) {
      console.error('[Unexpected Error]', error);
    }

    if (error instanceof GraphQLError && error.extensions?.code !== 'INTERNAL_SERVER_ERROR') {
      return formattedError;
    }


    if (process.env.NODE_ENV === 'production') {
      return new GraphQLError('Internal server error', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      });
    }

    return formattedError;
  },
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