export type UserRole = 'resident' | 'admin' | 'secretary' | 'treasurer' | 'moderator';
export type PaymentStatus = 'paid' | 'unpaid' | 'partial' | 'overdue';
export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  houseNumber: string;
  street: string;
  createdAt: string;
}

export interface Resident extends User {
  occupants: number;
  occupantNames?: string[];
  paymentStatus: PaymentStatus;
  totalDuesOwed: number;
  lastPaymentDate?: string;
  initialsColor: string;
}

export type TransactionCategory = 'Dues' | 'Projects' | 'Events' | 'Maintenance' | 'Emergency' | 'Other';
export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  residentId?: string;
  createdBy: string;
  icon?: 'wallet' | 'tool' | 'calendar' | 'wrench' | 'alert' | 'box';
}

export interface FinancialSummary {
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

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image?: string;
  status: EventStatus;
  attendees: number;
  estimatedBudget?: number;
  organizer: string;
  createdAt: string;
}

export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  category: string;
  image?: string;
  author: string;
  authorRole: UserRole;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

export type MaintenanceStatus = 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceCategory = 'plumbing' | 'electrical' | 'structural' | 'general' | 'landscaping' | 'security' | 'other';

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  location: string;
  requesterName: string;
  requesterPhone: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  completionDate?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
}

export interface Poll {
  id: string;
  question: string;
  description?: string;
  options: string[];
  votes: Record<string, number>;
  createdBy: string;
  createdAt: string;
  endsAt: string;
  status: 'active' | 'closed';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  reactions?: Record<string, number>;
}

export interface ChatGroup {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdBy: string;
  createdAt: string;
  icon?: string;
}
