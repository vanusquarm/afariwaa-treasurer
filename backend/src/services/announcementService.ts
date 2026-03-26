import { Announcement } from '@models/Announcement';
import { IAnnouncement, PaginationQuery, PaginatedResponse } from '@types/index';
import { AppError } from '@utils/appError';

export class AnnouncementService {
  static async create(announcementData: any, userId: string, userRole: string): Promise<IAnnouncement> {
    const announcement = await Announcement.create({
      ...announcementData,
      author: userId,
      authorRole: userRole,
    });

    return announcement.populate('author');
  }

  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<IAnnouncement>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter: any = {};
    if (query.search) {
      searchFilter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { content: { $regex: query.search, $options: 'i' } },
      ];
    }

    const announcements = await Announcement.find(searchFilter)
      .populate('author')
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-createdAt');

    const total = await Announcement.countDocuments(searchFilter);

    return {
      data: announcements,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<IAnnouncement> {
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author');

    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }

    return announcement;
  }

  static async getByPriority(priority: string, query: PaginationQuery): Promise<PaginatedResponse<IAnnouncement>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const announcements = await Announcement.find({ priority })
      .populate('author')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await Announcement.countDocuments({ priority });

    return {
      data: announcements,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async likeAnnouncement(id: string, userId: string): Promise<IAnnouncement> {
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      {
        $addToSet: { likedBy: userId },
        $inc: { likes: 1 },
      },
      { new: true }
    ).populate('author');

    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }

    return announcement;
  }

  static async unlikeAnnouncement(id: string, userId: string): Promise<IAnnouncement> {
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      {
        $pull: { likedBy: userId },
        $inc: { likes: -1 },
      },
      { new: true }
    ).populate('author');

    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }

    return announcement;
  }

  static async update(id: string, updateData: any): Promise<IAnnouncement> {
    const announcement = await Announcement.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('author');

    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }

    return announcement;
  }

  static async delete(id: string): Promise<void> {
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }
  }
}
