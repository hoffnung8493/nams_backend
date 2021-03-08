import { QueryResolvers, MutationResolvers } from "../__generatedTypes__";
import { User } from "../../models";
import { UserInputError } from "apollo-server";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const resolvers: {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
} = {
  Query: {
    user: async (_, { id }, { isAdmin }) => {
      if (!isAdmin) throw new Error("권한이 없습니다.");
      let user = await User.findById(id);
      if (!user) throw new Error("존재하지 않는 유저입니다.");
      return user;
    },
    users: async (_, __, { isAdmin }) => {
      if (!isAdmin) throw new Error("권한이 없습니다.");
      return User.find({});
    },
    me: async (_, __, { userId }) => User.findById(userId),
  },
  Mutation: {
    signup: async (_, { email, password, nickname }) => {
      if (!/.+@+./.test(email))
        throw new UserInputError("이메일 형식이 맞지 않습니다.");
      if (nickname.length < 2)
        throw new UserInputError("이름은 2자 이상이어야 합니다.");
      if (password.length < 8)
        throw new UserInputError("비밀번호는 8자 이상이어야 합니다.");
      let exists = await User.findOne({ $or: [{ email }, { nickname }] });
      if (exists) {
        if (exists.email === email)
          throw new UserInputError("이미 사용중인 이메일입니다.");
        else throw new UserInputError("이미 사용중인 닉네임입니다.");
      }
      let hashedPassword = await hash(password, 10);

      let user = await new User({
        email,
        password: hashedPassword,
        nickname,
      }).save();

      const { accessToken, refreshToken } = createTokens({
        contents: { userId: user.id, nickname },
        version: user.version,
      });

      return { accessToken, refreshToken, user };
    },
    login: async (_, { email, password }) => {
      if (!/.+@+./.test(email))
        throw new UserInputError("이메일 형식이 맞지 않습니다.");
      let user = await User.findOne({ email });
      if (!user) throw new Error("존재하지 않는 유저입니다.");
      if (!(await compare(password, user.password)))
        throw new Error("비밀번호가 일치하지 않습니다.");
      const { accessToken, refreshToken } = createTokens({
        contents: {
          userId: user.id,
          nickname: user.nickname,
          isAdmin: user.isAdmin,
        },
        version: user.version,
      });
      return { accessToken, refreshToken, user };
    },
    doMyForm: async (_, { formResult }, { userId }) => {
      if (!userId) throw new Error("로그인 해주고 이용해주세요.");
      if (formResult.length !== 25)
        throw new Error("설문조사 25문항을 모두 답변해주세요");
      if (formResult.filter((v) => v < 0 || v > 4).length > 0)
        throw new Error("설문 답변은 각각 0~4이어야 합니다.");
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { formResult },
        { new: true }
      );
      if (!user) throw new Error("존재하지 않는 회원입니다.");
      return user;
    },
    doPeerForm: async (_, { peerId, formResult }) => {
      if (formResult.length !== 25)
        throw new Error("설문조사 25문항을 모두 답변해주세요");
      if (formResult.filter((v) => v < 0 || v > 4).length > 0)
        throw new Error("설문 답변은 각각 0~4이어야 합니다.");
      await User.findOneAndUpdate(
        { _id: peerId },
        {
          $push: { peerReviews: { formResult, createdAt: new Date() } },
        },
        { new: true }
      );
      return true;
    },
    resetMyForm: async (_, __, { userId }) => {
      if (!userId) throw new Error("로그인 해주고 이용해주세요.");
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { formResult: [] },
        { new: true }
      );
      if (!user) throw new Error("존재하지 않는 회원입니다.");
      return user;
    },
  },
};

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
