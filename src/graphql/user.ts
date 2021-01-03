import { AuthenticationError, UserInputError } from "apollo-server";
import { Query, Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { User, UserModel } from "../models";
import { UserTokens } from "./types";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Context } from "..";

@Resolver(() => User)
export class UserResolver {
  @Query((returns) => User)
  async user(@Arg("id") id: string): Promise<User> {
    let user = await UserModel.findById(id);
    if (!user) throw new Error("user does not exist");
    return user;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    let users = await UserModel.find({});
    return users;
  }

  @Query((returns) => User, { nullable: true })
  async me(@Ctx() { userId }: Context): Promise<User | null> {
    let user = await UserModel.findById(userId);
    return user;
  }

  @Mutation(() => UserTokens)
  async signup(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("nickname") nickname: string
  ): Promise<UserTokens> {
    if (!/.+@+./.test(email))
      throw new UserInputError("이메일 형식이 맞지 않습니다.");
    if (nickname.length < 2)
      throw new UserInputError("이름은 2자 이상이어야 합니다.");
    if (password.length < 8)
      throw new UserInputError("비밀번호는 8자 이상이어야 합니다.");
    let exists = await UserModel.findOne({ $or: [{ email }, { nickname }] });
    if (exists) {
      if (exists.email === email)
        throw new UserInputError("이미 사용중인 이메일입니다.");
      else throw new UserInputError("이미 사용중인 닉네임입니다.");
    }
    let hashedPassword = await hash(password, 10);

    let user = await new UserModel({
      email,
      password: hashedPassword,
      nickname,
    }).save();

    const { accessToken, refreshToken } = createTokens({
      contents: { userId: user.id, nickname },
      version: user.version,
    });
    return { accessToken, refreshToken, user };
  }

  @Mutation(() => UserTokens)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserTokens> {
    if (!/.+@+./.test(email))
      throw new UserInputError("이메일 형식이 맞지 않습니다.");
    let user = await UserModel.findOne({ email });
    if (!user) throw new Error("존재하지 않는 유저입니다.");
    if (!(await compare(password, user.password)))
      throw new Error("비밀번호가 일치하지 않습니다.");
    const { accessToken, refreshToken } = createTokens({
      contents: { userId: user.id, nickname: user.nickname },
      version: user.version,
    });
    return { accessToken, refreshToken, user };
  }
}

const createTokens = ({ contents, version }: any) => {
  const refreshToken = sign(
    { ...contents, version },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1year" }
  );
  const accessToken = sign({ ...contents }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "24hour",
  });
  return { accessToken, refreshToken };
};
