import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '@types/index';
import { UserService } from '@services/userService';
import { sendSuccess } from '@utils/response';
import { AppError } from '@utils/appError';

export class UserController {
  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      search: req.query.search as string,
    };

    const result = await UserService.getAll(query);
    sendSuccess(res, result, 'Users retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const user = await UserService.getById(req.params.id);
    sendSuccess(res, user, 'User retrieved successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    if (req.params.id !== req.userId && req.user?.role !== 'admin') {
      throw new AppError('You can only update your own profile', 403);
    }

    const user = await UserService.update(req.params.id, req.body);
    sendSuccess(res, user, 'User updated successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await UserService.delete(req.params.id);
    sendSuccess(res, {}, 'User deleted successfully');
  }

  static async toggleActive(req: AuthRequest, res: Response): Promise<void> {
    const { isActive } = req.body;
    const user = await UserService.toggleActive(req.params.id, isActive);
    sendSuccess(res, user, 'User status updated successfully');
  }
}
