import { User } from '@models/User';
import { IUser, PaginationQuery, PaginatedResponse } from '@types/index';
import { AppError } from '@utils/appError';

export class UserService {
  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<IUser>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter: any = {};
    if (query.search) {
      searchFilter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }

    const users = await User.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-createdAt');

    const total = await User.countDocuments(searchFilter);

    return {
      data: users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  static async update(id: string, updateData: any): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  static async delete(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
  }

  static async toggleActive(id: string, isActive: boolean): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
}
