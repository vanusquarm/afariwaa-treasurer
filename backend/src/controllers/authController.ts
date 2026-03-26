import { Response } from 'express';
import { AuthRequest } from '@types/index';
import { AuthService } from '@services/authService';
import { User } from '@models/User';
import { sendSuccess } from '@utils/response';
import { AppError } from '@utils/appError';

export class AuthController {
  static async register(req: AuthRequest, res: Response): Promise<void> {
    const user = await AuthService.register(req.body);
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    sendSuccess(res, { user, token, refreshToken }, 'User registered successfully', 201);
  }

  static async login(req: AuthRequest, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await AuthService.login(email, password);

    sendSuccess(res, { user, token, refreshToken }, 'Login successful');
  }

  static async refreshToken(req: AuthRequest, res: Response): Promise<void> {
    const { token, refreshToken } = await AuthService.refreshToken(req.body.refreshToken);

    sendSuccess(res, { token, refreshToken }, 'Token refreshed successfully');
  }

  static async profile(req: AuthRequest, res: Response): Promise<void> {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    sendSuccess(res, user, 'Profile retrieved successfully');
  }

  static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    sendSuccess(res, user, 'Profile updated successfully');
  }

  static async logout(req: AuthRequest, res: Response): Promise<void> {
    sendSuccess(res, {}, 'Logout successful');
  }

  static async verifyEmail(req: AuthRequest, res: Response): Promise<void> {
    const user = await User.findByIdAndUpdate(req.userId, { isEmailVerified: true }, { new: true });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    sendSuccess(res, user, 'Email verified successfully');
  }
}
