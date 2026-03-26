import { Transaction } from '@models/Transaction';
import { ITransaction, PaginationQuery, PaginatedResponse, IFinancialSummary } from '@types/index';
import { AppError } from '@utils/appError';

export class TransactionService {
  static async create(transactionData: any, userId: string): Promise<ITransaction> {
    const transaction = await Transaction.create({
      ...transactionData,
      createdBy: userId,
    });

    return transaction.populate('homeId residentId createdBy');
  }

  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<ITransaction>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter: any = {};
    if (query.search) {
      searchFilter.$or = [{ title: { $regex: query.search, $options: 'i' } }];
    }

    const transactions = await Transaction.find(searchFilter)
      .populate('homeId residentId createdBy')
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-date');

    const total = await Transaction.countDocuments(searchFilter);

    return {
      data: transactions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<ITransaction> {
    const transaction = await Transaction.findById(id).populate('homeId residentId createdBy');

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    return transaction;
  }

  static async getByHome(homeId: string, query: PaginationQuery): Promise<PaginatedResponse<ITransaction>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find({ homeId })
      .populate('homeId residentId createdBy')
      .skip(skip)
      .limit(limit)
      .sort('-date');

    const total = await Transaction.countDocuments({ homeId });

    return {
      data: transactions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getByCategory(category: string, query: PaginationQuery): Promise<PaginatedResponse<ITransaction>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find({ category })
      .populate('homeId residentId createdBy')
      .skip(skip)
      .limit(limit)
      .sort('-date');

    const total = await Transaction.countDocuments({ category });

    return {
      data: transactions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getSummary(): Promise<IFinancialSummary> {
    const credits = await Transaction.aggregate([
      { $match: { type: 'credit', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const debits = await Transaction.aggregate([
      { $match: { type: 'debit', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalCollected = credits[0]?.total || 0;
    const totalExpenses = debits[0]?.total || 0;

    return {
      totalCollected,
      totalExpenses,
      balance: totalCollected - totalExpenses,
      pendingAmount: 0,
      residents: {
        paid: 0,
        partial: 0,
        unpaid: 0,
      },
    };
  }

  static async update(id: string, updateData: any): Promise<ITransaction> {
    const transaction = await Transaction.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('homeId residentId createdBy');

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    return transaction;
  }

  static async delete(id: string): Promise<void> {
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
  }
}
