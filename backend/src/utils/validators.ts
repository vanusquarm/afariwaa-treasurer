import Joi from 'joi';

export const authValidation = {
  register: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    phone: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/),
    password: Joi.string().required().min(6),
    passwordConfirm: Joi.string().required().valid(Joi.ref('password')),
    role: Joi.string().valid('admin', 'treasurer', 'secretary', 'moderator', 'resident').default('resident'),
    houseNumber: Joi.string().required(),
    street: Joi.string().required(),
  }),

  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

  resetPassword: Joi.object({
    password: Joi.string().required().min(6),
    passwordConfirm: Joi.string().required().valid(Joi.ref('password')),
  }),
};

export const residentValidation = {
  update: Joi.object({
    name: Joi.string().min(2).max(50),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
    houseNumber: Joi.string(),
    street: Joi.string(),
    occupants: Joi.number().min(1),
    occupantNames: Joi.array().items(Joi.string().trim()),
  }),

  updatePaymentStatus: Joi.object({
    paymentStatus: Joi.string().valid('paid', 'unpaid', 'partial', 'overdue').required(),
    totalDuesOwed: Joi.number().min(0),
  }),
};

export const transactionValidation = {
  create: Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().trim(),
    amount: Joi.number().required().positive(),
    type: Joi.string().valid('credit', 'debit').required(),
    category: Joi.string().valid('Dues', 'Projects', 'Events', 'Maintenance', 'Emergency', 'Other').required(),
    date: Joi.date(),
    homeId: Joi.string(),
    residentId: Joi.string(),
  }),
};

export const homeValidation = {
  create: Joi.object({
    houseNumber: Joi.string().required(),
    street: Joi.string().required(),
    ownerId: Joi.string().required(),
    monthlyDue: Joi.number().required().positive(),
  }),

  update: Joi.object({
    houseNumber: Joi.string(),
    street: Joi.string(),
    monthlyDue: Joi.number().positive(),
    paymentStatus: Joi.string().valid('paid', 'unpaid', 'partial', 'overdue'),
  }),
};

export const billValidation = {
  create: Joi.object({
    homeId: Joi.string().required(),
    amount: Joi.number().required().positive(),
    dueDate: Joi.date().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
  }),

  update: Joi.object({
    amount: Joi.number().positive(),
    dueDate: Joi.date(),
    description: Joi.string(),
    isPaid: Joi.boolean(),
  }),
};

export const eventValidation = {
  create: Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().greater(Joi.ref('startDate')),
    location: Joi.string().required().trim(),
    estimatedBudget: Joi.number().positive(),
  }),

  update: Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    location: Joi.string().trim(),
    status: Joi.string().valid('upcoming', 'ongoing', 'completed', 'cancelled'),
    estimatedBudget: Joi.number().positive(),
  }),
};

export const announcementValidation = {
  create: Joi.object({
    title: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
    priority: Joi.string().valid('low', 'medium', 'high', 'critical'),
  }),

  update: Joi.object({
    title: Joi.string().trim(),
    content: Joi.string().trim(),
    category: Joi.string().trim(),
    priority: Joi.string().valid('low', 'medium', 'high', 'critical'),
  }),
};

export const maintenanceValidation = {
  create: Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    category: Joi.string()
      .valid('plumbing', 'electrical', 'structural', 'general', 'landscaping', 'security', 'other')
      .required(),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
    location: Joi.string().required().trim(),
    requesterName: Joi.string().required().trim(),
    requesterPhone: Joi.string().required(),
    requesterEmail: Joi.string().required().email(),
  }),

  update: Joi.object({
    status: Joi.string().valid('open', 'assigned', 'in-progress', 'completed', 'cancelled'),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
    estimatedCost: Joi.number().positive(),
    actualCost: Joi.number().positive(),
    notes: Joi.string().trim(),
  }),
};

export const paginationValidation = Joi.object({
  page: Joi.number().default(1).min(1),
  limit: Joi.number().default(10).min(1).max(100),
  sort: Joi.string(),
  search: Joi.string(),
});
