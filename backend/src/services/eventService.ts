import { Event } from '@models/Event';
import { IEvent, PaginationQuery, PaginatedResponse } from '@types/index';
import { AppError } from '@utils/appError';

export class EventService {
  static async create(eventData: any, userId: string): Promise<IEvent> {
    const event = await Event.create({
      ...eventData,
      organizer: userId,
      attendees: [userId],
    });

    return event.populate('organizer attendees');
  }

  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<IEvent>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter: any = {};
    if (query.search) {
      searchFilter.$or = [{ title: { $regex: query.search, $options: 'i' } }];
    }

    const events = await Event.find(searchFilter)
      .populate('organizer attendees')
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-startDate');

    const total = await Event.countDocuments(searchFilter);

    return {
      data: events,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<IEvent> {
    const event = await Event.findById(id).populate('organizer attendees');

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    return event;
  }

  static async getUpcoming(query: PaginationQuery): Promise<PaginatedResponse<IEvent>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find({
      status: { $in: ['upcoming', 'ongoing'] },
      startDate: { $gte: new Date() },
    })
      .populate('organizer attendees')
      .skip(skip)
      .limit(limit)
      .sort('startDate');

    const total = await Event.countDocuments({
      status: { $in: ['upcoming', 'ongoing'] },
      startDate: { $gte: new Date() },
    });

    return {
      data: events,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async update(id: string, updateData: any): Promise<IEvent> {
    const event = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('organizer attendees');

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    return event;
  }

  static async addAttendee(id: string, userId: string): Promise<IEvent> {
    const event = await Event.findByIdAndUpdate(
      id,
      { $addToSet: { attendees: userId } },
      { new: true }
    ).populate('organizer attendees');

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    return event;
  }

  static async removeAttendee(id: string, userId: string): Promise<IEvent> {
    const event = await Event.findByIdAndUpdate(
      id,
      { $pull: { attendees: userId } },
      { new: true }
    ).populate('organizer attendees');

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    return event;
  }

  static async delete(id: string): Promise<void> {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      throw new AppError('Event not found', 404);
    }
  }
}
