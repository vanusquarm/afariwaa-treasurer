import { User } from '@models/User';
import { IUser, TokenPayload } from '@types/index';
import { AppError } from '@utils/appError';
import jwt from 'jsonwebtoken';
import env from '@config/env';

export class AuthService {
  static async register(userData: any): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const user = await User.create({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: userData.role || 'resident',
      houseNumber: userData.houseNumber,
      street: userData.street,
    });

    return user;
  }

  static async login(email: string, password: string): Promise<{ user: IUser; token: string; refreshToken: string }> {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new AppError('User account is inactive', 401);
    }

    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    return { user, token, refreshToken };
  }

  static async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as TokenPayload;

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new AppError('User not found', 401);
    }

    const newToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();

    return { token: newToken, refreshToken: newRefreshToken };
  }

  static async verifyToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }
}
