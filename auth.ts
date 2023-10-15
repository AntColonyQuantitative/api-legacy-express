import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyToken(token: string): Promise<number | null> {
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decodedToken.userId;
    return userId;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<string | null> {
  const user = await prisma.portalUsers.findUnique({ where: { email } });
  if (!user) {
    return null;
  }
  if (!user.password) {
    throw new Error('password is null');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = await generateToken(user.id);
  return token;
}

export async function generateToken(userId: number): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId }, JWT_SECRET as Secret, {
    expiresIn: '12h',
  });
  return token;
}

export async function validateToken(
  authorization: string
): Promise<number | undefined> {
  if (!authorization) {
    throw new Error('Authorization token is missing.');
  }
  const contentArray = authorization.split(' ');
  if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') {
    throw new Error('Authorization token extract error.');
  }
  const userId = await verifyToken(contentArray[1]);
  if (!userId) {
    throw new Error('Invalid token.');
  }

  return userId;
}
