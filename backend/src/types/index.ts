import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type UserRole = 'admin' | 'treasurer' | 'secretary' | 'moderator' | 'resident';
export type PaymentStatus = 'paid' | 'unpaid' | 'partial' | 'overdue';
export type Gender = 'male' | 'female' | 'other';
export type TransactionCategory = 'Dues' | 'Projects' | 'Events' | 'Maintenance' | 'Emergency' | 'Other';
export type TransactionType = 'credit' | 'debit';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'critical';
export type MaintenanceStatus = 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceCategory = 'plumbing' | 'electrical' | 'structural' | 'general' | 'landscaping' | 'security' | 'other';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  profileImage?: string;
  houseNumber: string;
  street: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateAuthToken(): string;
  generateRefreshToken(): string;
}

export interface IResident extends IUser {
  occupants: number;
  occupantNames?: string[];
  paymentStatus: PaymentStatus;
  totalDuesOwed: number;
  lastPaymentDate?: Date;
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
  userId?: string;
}

export interface IHome {
  _id: string;
  houseNumber: string;
  street: string;
  owner: IUser;
  occupants: IUser[];
  monthlyDue: number;
  totalPaid: number;
  balance: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  homeId?: string;
  residentId?: string;
  createdBy: string;
  attachment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFinancialSummary {
  totalCollected: number;
  totalExpenses: number;
  balance: number;
  pendingAmount: number;
  residents: {
    paid: number;
    partial: number;
    unpaid: number;
  };
}

export interface IBill {
  _id: string;
  homeId: string;
  amount: number;
  dueDate: Date;
  type: string;
  description: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  image?: string;
  status: EventStatus;
  attendees: string[];
  estimatedBudget?: number;
  actualBudget?: number;
  organizer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  category: string;
  image?: string;
  author: string;
  authorRole: UserRole;
  views: number;
  likes: number;
  likedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMaintenanceRequest {
  _id: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  location: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  completionDate?: Date;
  notes?: string;
}

export interface INotification {
  _id: string;
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  type: 'reminder' | 'payment' | 'announcement' | 'maintenance';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatMessage {
  _id: string;
  senderId: string;
  senderName: string;
  groupId: string;
  content: string;
  reactions?: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatGroup {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  createdBy: string;
  icon?: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPoll {
  _id: string;
  question: string;
  description?: string;
  options: string[];
  votes: Record<string, number>;
  voters: string[];
  createdBy: string;
  createdAt: Date;
  endsAt: Date;
  status: 'active' | 'closed';
}

export interface IDocument {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  uploadedBy: string;
  uploadedAt: Date;
  size: number;
}

export interface PaginationQuery {
  page: number;
  limit: number;
  sort?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ApiError extends Error {
  statusCode: number;
  isOperational?: boolean;
}
