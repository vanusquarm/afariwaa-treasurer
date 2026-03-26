import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '@types/index';
import { HomeService } from '@services/homeService';
import { sendSuccess } from '@utils/response';

export class HomeController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const home = await HomeService.create(req.body);
    sendSuccess(res, home, 'Home created successfully', 201);
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      search: req.query.search as string,
    };

    const result = await HomeService.getAll(query);
    sendSuccess(res, result, 'Homes retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const home = await HomeService.getById(req.params.id);
    sendSuccess(res, home, 'Home retrieved successfully');
  }

  static async getByStreet(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
    };

    const result = await HomeService.getByStreet(req.params.street, query);
    sendSuccess(res, result, 'Homes retrieved successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const home = await HomeService.update(req.params.id, req.body);
    sendSuccess(res, home, 'Home updated successfully');
  }

  static async addOccupant(req: AuthRequest, res: Response): Promise<void> {
    const { userId } = req.body;
    const home = await HomeService.addOccupant(req.params.id, userId);
    sendSuccess(res, home, 'Occupant added successfully');
  }

  static async removeOccupant(req: AuthRequest, res: Response): Promise<void> {
    const { userId } = req.body;
    const home = await HomeService.removeOccupant(req.params.id, userId);
    sendSuccess(res, home, 'Occupant removed successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await HomeService.delete(req.params.id);
    sendSuccess(res, {}, 'Home deleted successfully');
  }
}
