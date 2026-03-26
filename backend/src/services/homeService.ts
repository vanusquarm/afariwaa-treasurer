import { Home } from '@models/Home';
import { IHome, PaginationQuery, PaginatedResponse } from '@types/index';
import { AppError } from '@utils/appError';

export class HomeService {
  static async create(homeData: any): Promise<IHome> {
    const home = await Home.create(homeData).then(h => h.populate(['owner', 'occupants']));
    return home;
  }

  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<IHome>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter: any = {};
    if (query.search) {
      searchFilter.$or = [
        { houseNumber: { $regex: query.search, $options: 'i' } },
        { street: { $regex: query.search, $options: 'i' } },
      ];
    }

    const homes = await Home.find(searchFilter)
      .populate(['owner', 'occupants'])
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-createdAt');

    const total = await Home.countDocuments(searchFilter);

    return {
      data: homes,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<IHome> {
    const home = await Home.findById(id).populate(['owner', 'occupants']);
    if (!home) {
      throw new AppError('Home not found', 404);
    }
    return home;
  }

  static async getByStreet(street: string, query: PaginationQuery): Promise<PaginatedResponse<IHome>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const homes = await Home.find({ street })
      .populate(['owner', 'occupants'])
      .skip(skip)
      .limit(limit)
      .sort(query.sort || 'houseNumber');

    const total = await Home.countDocuments({ street });

    return {
      data: homes,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async update(id: string, updateData: any): Promise<IHome> {
    const home = await Home.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate(['owner', 'occupants']);

    if (!home) {
      throw new AppError('Home not found', 404);
    }

    return home;
  }

  static async addOccupant(id: string, userId: string): Promise<IHome> {
    const home = await Home.findByIdAndUpdate(
      id,
      { $addToSet: { occupants: userId } },
      { new: true }
    ).populate(['owner', 'occupants']);

    if (!home) {
      throw new AppError('Home not found', 404);
    }

    return home;
  }

  static async removeOccupant(id: string, userId: string): Promise<IHome> {
    const home = await Home.findByIdAndUpdate(
      id,
      { $pull: { occupants: userId } },
      { new: true }
    ).populate(['owner', 'occupants']);

    if (!home) {
      throw new AppError('Home not found', 404);
    }

    return home;
  }

  static async delete(id: string): Promise<void> {
    const home = await Home.findByIdAndDelete(id);
    if (!home) {
      throw new AppError('Home not found', 404);
    }
  }
}
