import { Router } from 'express';
import { HomeController } from '@controllers/homeController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { homeValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(homeValidation.create),
  asyncHandler((req, res) => HomeController.create(req, res))
);

router.get('/', authenticate, asyncHandler((req, res) => HomeController.getAll(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => HomeController.getById(req, res)));

router.get('/street/:street', authenticate, asyncHandler((req, res) => HomeController.getByStreet(req, res)));

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(homeValidation.update),
  asyncHandler((req, res) => HomeController.update(req, res))
);

router.post('/:id/occupants', authenticate, authorize('admin', 'treasurer'), asyncHandler((req, res) => HomeController.addOccupant(req, res)));

router.delete('/:id/occupants', authenticate, authorize('admin', 'treasurer'), asyncHandler((req, res) => HomeController.removeOccupant(req, res)));

router.delete('/:id', authenticate, authorize('admin', 'treasurer'), asyncHandler((req, res) => HomeController.delete(req, res)));

export default router;
