import { MyContext } from './context'
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CommentDoc, ReviewDoc, UserDoc } from '../models';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  reviewId: Scalars['String'];
  content: Scalars['String'];
  user: NestedUser;
  likeCount: Scalars['Int'];
  likes: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentCreate: Comment;
  commentDelete: Scalars['Boolean'];
  commentLike: Comment;
  commentLikeCancel: Comment;
  commentUpdate: Comment;
  doMyForm: User;
  doPeerForm: Scalars['Boolean'];
  login: UserTokens;
  resetMyForm: User;
  reviewCreate: Review;
  reviewDelete: Scalars['Boolean'];
  reviewLike: Review;
  reviewLikeCancel: Review;
  reviewUpdate: Review;
  signup: UserTokens;
};


export type MutationCommentCreateArgs = {
  content: Scalars['String'];
  reviewId: Scalars['String'];
};


export type MutationCommentDeleteArgs = {
  id: Scalars['String'];
};


export type MutationCommentLikeArgs = {
  id: Scalars['String'];
};


export type MutationCommentLikeCancelArgs = {
  id: Scalars['String'];
};


export type MutationCommentUpdateArgs = {
  id: Scalars['String'];
  content: Scalars['String'];
};


export type MutationDoMyFormArgs = {
  formResult: Array<Scalars['Int']>;
};


export type MutationDoPeerFormArgs = {
  peerId: Scalars['String'];
  formResult: Array<Scalars['Int']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationReviewCreateArgs = {
  bookNumber: Scalars['Float'];
  chapterNumber: Scalars['Float'];
  content: Scalars['String'];
};


export type MutationReviewDeleteArgs = {
  reviewId: Scalars['String'];
};


export type MutationReviewLikeArgs = {
  id: Scalars['String'];
};


export type MutationReviewLikeCancelArgs = {
  id: Scalars['String'];
};


export type MutationReviewUpdateArgs = {
  content: Scalars['String'];
  reviewId: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  me?: Maybe<User>;
  myReviews: Array<Review>;
  review: Review;
  reviews: Array<Review>;
  user: User;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  reviewId: Scalars['String'];
};


export type QueryReviewArgs = {
  id: Scalars['String'];
};


export type QueryReviewsArgs = {
  bookNumber: Scalars['Float'];
  chapterNumber: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type NestedUser = {
  __typename?: 'NestedUser';
  userId: Scalars['String'];
  nickname: Scalars['String'];
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  bookNumber: Scalars['Int'];
  chapterNumber: Scalars['Int'];
  user: NestedUser;
  content: Scalars['String'];
  comments: Array<Comment>;
  commentCount: Scalars['Int'];
  likes: Array<Scalars['String']>;
  likeCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  nickname: Scalars['String'];
  version: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  formResult: Array<Scalars['Int']>;
  peerReviews: Array<PeerReview>;
  myScore: Scalars['Int'];
  peerReviewCount: Scalars['Int'];
  averageScore: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PeerReview = {
  __typename?: 'PeerReview';
  userId: Scalars['String'];
  formResult: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
};

export type UserTokens = {
  __typename?: 'UserTokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Comment: ResolverTypeWrapper<CommentDoc>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Query: ResolverTypeWrapper<{}>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  NestedUser: ResolverTypeWrapper<NestedUser>;
  Review: ResolverTypeWrapper<ReviewDoc>;
  User: ResolverTypeWrapper<UserDoc>;
  PeerReview: ResolverTypeWrapper<PeerReview>;
  UserTokens: ResolverTypeWrapper<Omit<UserTokens, 'user'> & { user: ResolversTypes['User'] }>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Comment: CommentDoc;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Int: Scalars['Int'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Query: {};
  DateTime: Scalars['DateTime'];
  NestedUser: NestedUser;
  Review: ReviewDoc;
  User: UserDoc;
  PeerReview: PeerReview;
  UserTokens: Omit<UserTokens, 'user'> & { user: ResolversParentTypes['User'] };
}>;

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reviewId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['NestedUser'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  commentCreate?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentCreateArgs, 'content' | 'reviewId'>>;
  commentDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCommentDeleteArgs, 'id'>>;
  commentLike?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentLikeArgs, 'id'>>;
  commentLikeCancel?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentLikeCancelArgs, 'id'>>;
  commentUpdate?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentUpdateArgs, 'id' | 'content'>>;
  doMyForm?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDoMyFormArgs, 'formResult'>>;
  doPeerForm?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDoPeerFormArgs, 'peerId' | 'formResult'>>;
  login?: Resolver<ResolversTypes['UserTokens'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  resetMyForm?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  reviewCreate?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationReviewCreateArgs, 'bookNumber' | 'chapterNumber' | 'content'>>;
  reviewDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationReviewDeleteArgs, 'reviewId'>>;
  reviewLike?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationReviewLikeArgs, 'id'>>;
  reviewLikeCancel?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationReviewLikeCancelArgs, 'id'>>;
  reviewUpdate?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationReviewUpdateArgs, 'content' | 'reviewId'>>;
  signup?: Resolver<ResolversTypes['UserTokens'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'nickname' | 'password'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'reviewId'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  myReviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewsArgs, 'bookNumber' | 'chapterNumber'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type NestedUserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['NestedUser'] = ResolversParentTypes['NestedUser']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bookNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chapterNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['NestedUser'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  formResult?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  peerReviews?: Resolver<Array<ResolversTypes['PeerReview']>, ParentType, ContextType>;
  myScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  peerReviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  averageScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PeerReviewResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PeerReview'] = ResolversParentTypes['PeerReview']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  formResult?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserTokensResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserTokens'] = ResolversParentTypes['UserTokens']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  NestedUser?: NestedUserResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  PeerReview?: PeerReviewResolvers<ContextType>;
  UserTokens?: UserTokensResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
