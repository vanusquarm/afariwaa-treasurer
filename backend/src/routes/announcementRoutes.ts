import { Router } from 'express';
import { AnnouncementController } from '@controllers/announcementController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { announcementValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin', 'secretary', 'moderator'),
  validate(announcementValidation.create),
  asyncHandler((req, res) => AnnouncementController.create(req, res))
);

router.get('/', authenticate, asyncHandler((req, res) => AnnouncementController.getAll(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => AnnouncementController.getById(req, res)));

router.get('/priority/:priority', authenticate, asyncHandler((req, res) => AnnouncementController.getByPriority(req, res)));

router.post('/:id/like', authenticate, asyncHandler((req, res) => AnnouncementController.like(req, res)));

router.post('/:id/unlike', authenticate, asyncHandler((req, res) => AnnouncementController.unlike(req, res)));

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'secretary', 'moderator'),
  validate(announcementValidation.update),
  asyncHandler((req, res) => AnnouncementController.update(req, res))
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'secretary', 'moderator'),
  asyncHandler((req, res) => AnnouncementController.delete(req, res))
);

export default router;
