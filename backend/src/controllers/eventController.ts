import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '@types/index';
import { EventService } from '@services/eventService';
import { sendSuccess } from '@utils/response';

export class EventController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const event = await EventService.create(req.body, req.userId!);
    sendSuccess(res, event, 'Event created successfully', 201);
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sort: req.query.sort as string,
      search: req.query.search as string,
    };

    const result = await EventService.getAll(query);
    sendSuccess(res, result, 'Events retrieved successfully');
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const event = await EventService.getById(req.params.id);
    sendSuccess(res, event, 'Event retrieved successfully');
  }

  static async getUpcoming(req: AuthRequest, res: Response): Promise<void> {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await EventService.getUpcoming(query);
    sendSuccess(res, result, 'Upcoming events retrieved successfully');
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const event = await EventService.update(req.params.id, req.body);
    sendSuccess(res, event, 'Event updated successfully');
  }

  static async addAttendee(req: AuthRequest, res: Response): Promise<void> {
    const event = await EventService.addAttendee(req.params.id, req.userId!);
    sendSuccess(res, event, 'Attendee added successfully');
  }

  static async removeAttendee(req: AuthRequest, res: Response): Promise<void> {
    const event = await EventService.removeAttendee(req.params.id, req.userId!);
    sendSuccess(res, event, 'Attendee removed successfully');
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    await EventService.delete(req.params.id);
    sendSuccess(res, {}, 'Event deleted successfully');
  }
}
