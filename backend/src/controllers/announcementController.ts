import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '@types/index';
import { AnnouncementService } from '@services/announcementService';
import { sendSuccess } from '@utils/response';

export class AnnouncementController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const announcement = await AnnouncementService.create(req.body, req.userId!, req.user!.role);
    sendSuccess(res, announcement, 'Announcement created successfully', 201);
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      search: req.query.search as string,
    };

    const result = await AnnouncementService.getAll(query);
    sendSuccess(res, result, 'Announcements retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const announcement = await AnnouncementService.getById(req.params.id);
    sendSuccess(res, announcement, 'Announcement retrieved successfully');
  }

  static async getByPriority(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await AnnouncementService.getByPriority(req.params.priority, query);
    sendSuccess(res, result, 'Announcements retrieved successfully');
  }

  static async like(req: AuthRequest, res: Response): Promise<void> {
    const announcement = await AnnouncementService.likeAnnouncement(req.params.id, req.userId!);
    sendSuccess(res, announcement, 'Announcement liked successfully');
  }

  static async unlike(req: AuthRequest, res: Response): Promise<void> {
    const announcement = await AnnouncementService.unlikeAnnouncement(req.params.id, req.userId!);
    sendSuccess(res, announcement, 'Announcement unliked successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const announcement = await AnnouncementService.update(req.params.id, req.body);
    sendSuccess(res, announcement, 'Announcement updated successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await AnnouncementService.delete(req.params.id);
    sendSuccess(res, {}, 'Announcement deleted successfully');
  }
}
