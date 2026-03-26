import { MaintenanceRequest } from '@models/MaintenanceRequest';
import { IMaintenanceRequest, PaginationQuery, PaginatedResponse } from '@types/index';
import { AppError } from '@utils/appError';

export class MaintenanceService {
  static async create(requestData: any): Promise<IMaintenanceRequest> {
    const maintenanceRequest = await MaintenanceRequest.create(requestData);
    return maintenanceRequest.populate('assignedTo');
  }

  static async getAll(query: PaginationQuery): Promise<PaginatedResponse<IMaintenanceRequest>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const searchFilter: any = {};
    if (query.search) {
      searchFilter.$or = [{ title: { $regex: query.search, $options: 'i' } }];
    }

    const requests = await MaintenanceRequest.find(searchFilter)
      .populate('assignedTo')
      .skip(skip)
      .limit(limit)
      .sort(query.sort || '-createdAt');

    const total = await MaintenanceRequest.countDocuments(searchFilter);

    return {
      data: requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id: string): Promise<IMaintenanceRequest> {
    const request = await MaintenanceRequest.findById(id).populate('assignedTo');

    if (!request) {
      throw new AppError('Maintenance request not found', 404);
    }

    return request;
  }

  static async getByStatus(status: string, query: PaginationQuery): Promise<PaginatedResponse<IMaintenanceRequest>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const requests = await MaintenanceRequest.find({ status })
      .populate('assignedTo')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await MaintenanceRequest.countDocuments({ status });

    return {
      data: requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getByPriority(priority: string, query: PaginationQuery): Promise<PaginatedResponse<IMaintenanceRequest>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const requests = await MaintenanceRequest.find({ priority })
      .populate('assignedTo')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await MaintenanceRequest.countDocuments({ priority });

    return {
      data: requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async assignRequest(id: string, assignedToUserId: string): Promise<IMaintenanceRequest> {
    const request = await MaintenanceRequest.findByIdAndUpdate(
      id,
      { assignedTo: assignedToUserId, status: 'assigned' },
      { new: true }
    ).populate('assignedTo');

    if (!request) {
      throw new AppError('Maintenance request not found', 404);
    }

    return request;
  }

  static async update(id: string, updateData: any): Promise<IMaintenanceRequest> {
    const request = await MaintenanceRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('assignedTo');

    if (!request) {
      throw new AppError('Maintenance request not found', 404);
    }

    return request;
  }

  static async delete(id: string): Promise<void> {
    const request = await MaintenanceRequest.findByIdAndDelete(id);

    if (!request) {
      throw new AppError('Maintenance request not found', 404);
    }
  }
}
