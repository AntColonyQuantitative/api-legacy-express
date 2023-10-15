import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { validateToken, generateToken } from '../auth';
import { authenticateUser } from '../auth';

const prisma = new PrismaClient();

export const portUsersResolvers = {
  Query: {
    getUsers: async (_: any, args: any, context: any) => {
      const { authorization } = context.req.headers;
      await validateToken(authorization);
      return prisma.portalUsers.findMany();
    },
    getUserByEmail: async (_: any, args: { email: string }, context: any) => {
      const { authorization } = context.req.headers;
      await validateToken(authorization);
      return prisma.portalUsers.findUnique({
        where: { email: args.email },
      });
    },
    authenticUser: async (
      _: any,
      args: { email: string; password: string }
    ) => {
      const token = await authenticateUser(args.email, args.password);
      if (!token) {
        throw new Error('Authentication failed. Invalid email or password.');
      }
      return {
        token,
      };
    },
  },
  Mutation: {
    createUser: async (_: any, args: { input: any }) => {
      const hashedPassword = await bcrypt.hash(args.input.password, 10);
      const user = await prisma.portalUsers.create({
        data: {
          email: args.input.email,
          ref: args.input.ref,
          realName: args.input.realName,
          displayName: args.input.displayName,
          password: hashedPassword,
          mobile: args.input.mobile,
          wechat: args.input.wechat,
          qq: args.input.qq,
        },
      });
      const token = await generateToken(user.id);
      return {
        token,
      };
    },
    updateUser: async (_: any, args: { input: any }) => {
      const user = await prisma.portalUsers.findUnique({
        where: { email: args.input.email },
      });
      const hashedPassword = await bcrypt.hash(args.input.password, 10);
      if (!user) {
        return null;
      }
      return prisma.portalUsers.update({
        where: { id: user.id },
        data: {
          email: args.input.email,
          ref: args.input.ref,
          realName: args.input.realName,
          displayName: args.input.displayName,
          password: hashedPassword,
          mobile: args.input.mobile,
          wechat: args.input.wechat,
          qq: args.input.qq,
        },
      });
    },
    deleteUser: async (_: any, args: { id: number }) => {
      return prisma.portalUsers.delete({
        where: { id: args.id },
      });
    },
  },
};

export default portUsersResolvers;
