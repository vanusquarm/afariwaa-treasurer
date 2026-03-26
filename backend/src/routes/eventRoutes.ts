import { Router } from 'express';
import { EventController } from '@controllers/eventController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { eventValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin', 'secretary', 'moderator'),
  validate(eventValidation.create),
  asyncHandler((req, res) => EventController.create(req, res))
);

router.get('/', authenticate, asyncHandler((req, res) => EventController.getAll(req, res)));

router.get('/upcoming', authenticate, asyncHandler((req, res) => EventController.getUpcoming(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => EventController.getById(req, res)));

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'secretary', 'moderator'),
  validate(eventValidation.update),
  asyncHandler((req, res) => EventController.update(req, res))
);

router.post('/:id/attendees', authenticate, asyncHandler((req, res) => EventController.addAttendee(req, res)));

router.delete('/:id/attendees', authenticate, asyncHandler((req, res) => EventController.removeAttendee(req, res)));

router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'secretary', 'moderator'),
  asyncHandler((req, res) => EventController.delete(req, res))
);

export default router;
