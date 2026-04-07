import { Router } from 'express';
import { UserController } from '@controllers/userController';
import { authenticate, authorize } from '@middleware/auth';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authenticate, authorize('admin'), asyncHandler((req, res) => UserController.getAll(req, res)));

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', authenticate, asyncHandler((req, res) => UserController.getById(req, res)));
/**
 * @swagger
 * /users/:id:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/:id', authenticate, asyncHandler((req, res) => UserController.update(req, res)));
/**
 * @swagger
 * /users/:id:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:id', authenticate, authorize('admin'), asyncHandler((req, res) => UserController.delete(req, res)));
/**
 * @swagger
 * /users/:id/toggle-active:
 *   patch:
 *     summary: Toggle user active status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.patch('/:id/toggle-active', authenticate, authorize('admin'), asyncHandler((req, res) => UserController.toggleActive(req, res)));

export default router;
