import { Bill } from '@models/Bill';
import { IBill, PaginationQuery, PaginatedResponse } from '@types/index';
import { AppError } from '@utils/appError';

export class BillService {
  static async create(billData: any): Promise<IBill> {
    const bill = await Bill.create(billData).then(b => b.populate('homeId'));
    return bill;
  }

  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<IBill>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const bills = await Bill.find()
      .populate('homeId')
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-dueDate');

    const total = await Bill.countDocuments();

    return {
      data: bills,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<IBill> {
    const bill = await Bill.findById(id).populate('homeId');
    if (!bill) {
      throw new AppError('Bill not found', 404);
    }
    return bill;
  }

  static async getByHome(homeId: string, query: PaginationQuery): Promise<PaginatedResponse<IBill>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const bills = await Bill.find({ homeId })
      .populate('homeId')
      .skip(skip)
      .limit(limit)
      .sort('-dueDate');

    const total = await Bill.countDocuments({ homeId });

    return {
      data: bills,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getUnpaidBills(query: PaginationQuery): Promise<PaginatedResponse<IBill>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const bills = await Bill.find({ isPaid: false })
      .populate('homeId')
      .skip(skip)
      .limit(limit)
      .sort('-dueDate');

    const total = await Bill.countDocuments({ isPaid: false });

    return {
      data: bills,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async update(id: string, updateData: any): Promise<IBill> {
    const bill = await Bill.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('homeId');

    if (!bill) {
      throw new AppError('Bill not found', 404);
    }

    return bill;
  }

  static async delete(id: string): Promise<void> {
    const bill = await Bill.findByIdAndDelete(id);
    if (!bill) {
      throw new AppError('Bill not found', 404);
    }
  }
}
