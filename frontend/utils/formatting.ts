export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getRandomColor = (): string => {
  const colors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#EF4444', '#14B8A6'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'critical':
      return '#EF4444';
    case 'high':
    case 'urgent':
      return '#F59E0B';
    case 'medium':
      return '#3B82F6';
    case 'low':
      return '#10B981';
    default:
      return '#6B7280';
  }
};

export const getStatusBadgeColor = (status: string): { bg: string; text: string } => {
  switch (status) {
    case 'paid':
    case 'completed':
    case 'ongoing':
      return { bg: '#D1FAE5', text: '#059669' };
    case 'partial':
    case 'pending':
      return { bg: '#FEF3C7', text: '#D97706' };
    case 'unpaid':
    case 'failed':
    case 'cancelled':
    case 'overdue':
      return { bg: '#FEE2E2', text: '#DC2626' };
    case 'assigned':
    case 'in-progress':
      return { bg: '#DBEAFE', text: '#1D4ED8' };
    default:
      return { bg: '#F3F4F6', text: '#6B7280' };
  }
};

export const getRoleColor = (role: string): string => {
  const roleColors: Record<string, string> = {
    admin: '#EF4444',
    treasurer: '#3B82F6',
    secretary: '#8B5CF6',
    moderator: '#F59E0B',
    resident: '#10B981',
  };
  return roleColors[role] || '#6B7280';
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+233 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

export const getDaysUntil = (dateString: string): number => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const timeDiff = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'completed':
    case 'paid':
      return '✓';
    case 'pending':
    case 'partial':
      return '⏱';
    case 'failed':
    case 'unpaid':
      return '✗';
    default:
      return '●';
  }
};
