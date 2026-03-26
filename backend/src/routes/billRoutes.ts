import { Router } from 'express';
import { BillController } from '@controllers/billController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { billValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(billValidation.create),
  asyncHandler((req, res) => BillController.create(req, res))
);

router.get('/', authenticate, asyncHandler((req, res) => BillController.getAll(req, res)));

router.get('/unpaid', authenticate, asyncHandler((req, res) => BillController.getUnpaidBills(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => BillController.getById(req, res)));

router.get('/home/:homeId', authenticate, asyncHandler((req, res) => BillController.getByHome(req, res)));

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(billValidation.update),
  asyncHandler((req, res) => BillController.update(req, res))
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => BillController.delete(req, res))
);

export default router;
