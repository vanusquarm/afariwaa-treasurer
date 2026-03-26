import { Router } from 'express';
import { UserController } from '@controllers/userController';
import { authenticate, authorize } from '@middleware/auth';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.get('/', authenticate, authorize('admin'), asyncHandler((req, res) => UserController.getAll(req, res)));

router.get('/:id', authenticate, asyncHandler((req, res) => UserController.getById(req, res)));

router.put('/:id', authenticate, asyncHandler((req, res) => UserController.update(req, res)));

router.delete('/:id', authenticate, authorize('admin'), asyncHandler((req, res) => UserController.delete(req, res)));

router.patch('/:id/toggle-active', authenticate, authorize('admin'), asyncHandler((req, res) => UserController.toggleActive(req, res)));

export default router;
