import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '../types/index';
import { TransactionService } from '@services/transactionService';
import { sendSuccess } from '@utils/response';

export class TransactionController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const transaction = await TransactionService.create(req.body, req.userId!);
    sendSuccess(res, transaction, 'Transaction created successfully', 201);
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      search: req.query.search as string,
    };

  const homeId = req.query.homeId as string | undefined;
  const category = req.query.category as string | undefined;
  let result;

  // Apply conditional logic
  if (homeId) {
    result = await TransactionService.getByHome(homeId, query);
  } else if (category) {
    result = await TransactionService.getByCategory(category, query);
  } else {
    result = await TransactionService.getAll(query);
  }

    sendSuccess(res, result, 'Transactions retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const transaction = await TransactionService.getById(req.params.id);
    sendSuccess(res, transaction, 'Transaction retrieved successfully');
  }

  static async getByHome(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await TransactionService.getByHome(req.query.homeId as string, query);
    sendSuccess(res, result, 'Home transactions retrieved successfully');
  }

  static async getByCategory(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await TransactionService.getByCategory(req.query.category as string, query);
    sendSuccess(res, result, 'Category transactions retrieved successfully');
  }

  static async getSummary(req: AuthRequest, res: Response): Promise<void> {
    const summary = await TransactionService.getSummary();
    sendSuccess(res, summary, 'Financial summary retrieved successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const transaction = await TransactionService.update(req.params.id, req.body);
    sendSuccess(res, transaction, 'Transaction updated successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await TransactionService.delete(req.params.id);
    sendSuccess(res, {}, 'Transaction deleted successfully');
  }
}
