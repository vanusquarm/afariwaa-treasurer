import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '@types/index';
import { MaintenanceService } from '@services/maintenanceService';
import { sendSuccess } from '@utils/response';

export class MaintenanceController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const request = await MaintenanceService.create(req.body);
    sendSuccess(res, request, 'Maintenance request created successfully', 201);
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      search: req.query.search as string,
    };

    const result = await MaintenanceService.getAll(query);
    sendSuccess(res, result, 'Maintenance requests retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const request = await MaintenanceService.getById(req.params.id);
    sendSuccess(res, request, 'Maintenance request retrieved successfully');
  }

  static async getByStatus(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await MaintenanceService.getByStatus(req.params.status, query);
    sendSuccess(res, result, 'Maintenance requests retrieved successfully');
  }

  static async getByPriority(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await MaintenanceService.getByPriority(req.params.priority, query);
    sendSuccess(res, result, 'Maintenance requests retrieved successfully');
  }

  static async assign(req: AuthRequest, res: Response): Promise<void> {
    const { assignedToUserId } = req.body;
    const request = await MaintenanceService.assignRequest(req.params.id, assignedToUserId);
    sendSuccess(res, request, 'Maintenance request assigned successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const request = await MaintenanceService.update(req.params.id, req.body);
    sendSuccess(res, request, 'Maintenance request updated successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await MaintenanceService.delete(req.params.id);
    sendSuccess(res, {}, 'Maintenance request deleted successfully');
  }
}
