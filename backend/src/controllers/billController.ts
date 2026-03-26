import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '@types/index';
import { BillService } from '@services/billService';
import { sendSuccess } from '@utils/response';

export class BillController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const bill = await BillService.create(req.body);
    sendSuccess(res, bill, 'Bill created successfully', 201);
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
    };

    const result = await BillService.getAll(query);
    sendSuccess(res, result, 'Bills retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const bill = await BillService.getById(req.params.id);
    sendSuccess(res, bill, 'Bill retrieved successfully');
  }

  static async getByHome(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await BillService.getByHome(req.params.homeId, query);
    sendSuccess(res, result, 'Home bills retrieved successfully');
  }

  static async getUnpaidBills(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await BillService.getUnpaidBills(query);
    sendSuccess(res, result, 'Unpaid bills retrieved successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const bill = await BillService.update(req.params.id, req.body);
    sendSuccess(res, bill, 'Bill updated successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await BillService.delete(req.params.id);
    sendSuccess(res, {}, 'Bill deleted successfully');
  }
}
