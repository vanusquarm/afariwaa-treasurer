import { Router } from 'express';
import { MaintenanceController } from '@controllers/maintenanceController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { maintenanceValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/',
  validate(maintenanceValidation.create),
  asyncHandler((req, res) => MaintenanceController.create(req, res))
);

router.get('/', authenticate, asyncHandler((req, res) => MaintenanceController.getAll(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => MaintenanceController.getById(req, res)));

router.get('/status/:status', authenticate, asyncHandler((req, res) => MaintenanceController.getByStatus(req, res)));

router.get('/priority/:priority', authenticate, asyncHandler((req, res) => MaintenanceController.getByPriority(req, res)));

router.post(
  '/:id/assign',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => MaintenanceController.assign(req, res))
);

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(maintenanceValidation.update),
  asyncHandler((req, res) => MaintenanceController.update(req, res))
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => MaintenanceController.delete(req, res))
);

export default router;
