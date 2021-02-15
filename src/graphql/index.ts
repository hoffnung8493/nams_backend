import { schema as baseSchema } from "./common/schema";
import {
  resolvers as commentResolvers,
  schema as commentSchema,
} from "./comment";
import { resolvers as reviewResolvers, schema as reviewSchema } from "./review";
import { resolvers as userResolvers, schema as userSchema } from "./user";

import * as _ from "lodash";

export const schema = [baseSchema, commentSchema, reviewSchema, userSchema];

export const resolvers = _.merge(
  {},
  commentResolvers,
  reviewResolvers,
  userResolvers
);
