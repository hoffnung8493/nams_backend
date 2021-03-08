import mongoose from "mongoose";
import { schema, resolvers } from "./graphql";
import { ApolloServer } from "apollo-server";
import { verify, decode } from "jsonwebtoken";
import { MyContext } from "./graphql/context";

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

    const server = new ApolloServer({
      typeDefs: schema,
      resolvers,
      playground: true,
      introspection: true,
      context: ({ req }): MyContext => {
        try {
          let token = req.headers.authorization || undefined;
          if (!token) return {};
          let accessToken = token.split(" ")[1];
          if (!accessToken) return {};
          let result = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
          if (!result) return {};
          return decode(accessToken) as any;
        } catch (err) {
          if (
            ["invalid signature", "jwt expired", "jwt malformed"].includes(
              err.message
            )
          )
            return {};
          console.error(err);
          return {};
        }
      },
      formatError: (error) => {
        console.dir(error, { depth: 30, colors: true });
        return error;
      },
    });
    const { PORT } = process.env;
    return server.listen(PORT, () =>
      console.log(`server listening on PORT ${PORT}`)
    );
  } catch (err) {
    console.error(err);
    console.log("=====process exiting======");
    process.exit();
  }
};

start();
