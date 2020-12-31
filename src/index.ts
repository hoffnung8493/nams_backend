import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { UserResolver, ReviewResolver, CommentResolver } from "./graphql/index";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { verify, decode } from "jsonwebtoken";

export interface Context {
  userId?: string;
  nickname?: string;
  isAdmin?: boolean;
}

const start = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("MONGO_URI must be defined");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB.");

    const schema = await buildSchema({
      resolvers: [UserResolver, ReviewResolver, CommentResolver],
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    });

    const server = new ApolloServer({
      schema,
      playground: true,
      introspection: true,
      context: ({ req }): Context => {
        let token = req.headers.authorization || undefined;
        if (!token) return {};
        let accessToken = token.split(" ")[1];
        if (!accessToken) return {};
        let result = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        if (!result) return {};
        return decode(accessToken) as any;
      },
      formatError: (error) => {
        console.dir(error, { depth: 30, colors: true });
        return error;
      },
    });

    return server.listen(4000, () =>
      console.log(`server listening on PORT 4000`)
    );
  } catch (err) {
    console.error(err);
    console.log("=====process exiting======");
    process.exit();
  }
};

start();
