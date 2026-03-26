import { Router } from 'express';
import { TransactionController } from '@controllers/transactionController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { transactionValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(transactionValidation.create),
  asyncHandler((req, res) => TransactionController.create(req, res))
);

router.get('/', authenticate, asyncHandler((req, res) => TransactionController.getAll(req, res)));

router.get('/summary', authenticate, asyncHandler((req, res) => TransactionController.getSummary(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => TransactionController.getById(req, res)));

router.get('/home/:homeId', authenticate, asyncHandler((req, res) => TransactionController.getByHome(req, res)));

router.get('/category/:category', authenticate, asyncHandler((req, res) => TransactionController.getByCategory(req, res)));

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => TransactionController.update(req, res))
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => TransactionController.delete(req, res))
);

export default router;
