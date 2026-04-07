import { Router } from 'express';
import { HomeController } from '@controllers/homeController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { homeValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();
/**
 * @swagger
 * /homes:
 *   post:
 *     summary: Create a new home
 *     tags: [Homes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Home'
 *     responses:
 *       201:
 *         description: Home created successfully
 */

router.post(
  '/',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(homeValidation.create),
  asyncHandler((req, res) => HomeController.create(req, res))
);

/**
 * @swagger
 * /homes:
 *   get:
 *     summary: Get all homes
 *     tags: [Homes]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/homes', 
  // authenticate, 
  asyncHandler((req, res) => HomeController.getAll(req, res))
);
/**
 * @swagger
 * /homes/:id:
 *   get:
 *     summary: Get home by ID
 *     tags: [Homes]
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
router.get('/homes/:id', authenticate, asyncHandler((req, res) => HomeController.getById(req, res)));
/**
 * @swagger
 * /homes/streets/:id:
 *   get:
 *     summary: Get street by ID
 *     tags: [Streets]
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
router.get('/streets/:street', authenticate, asyncHandler((req, res) => HomeController.getByStreet(req, res)));
/**
 * @swagger
 * /homes/:id:
 *   put:
 *     summary: Update home by ID
 *     tags: [Homes]
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
router.put(
  '/homes/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(homeValidation.update),
  asyncHandler((req, res) => HomeController.update(req, res))
);
/**
 * @swagger
 * /homes/:id/occupants:
 *   post:
 *     summary: Add occupant to home
 *     tags: [Homes]
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
router.post('/:id/occupants', authenticate, authorize('admin', 'treasurer'), asyncHandler((req, res) => HomeController.addOccupant(req, res)));
/**
 * @swagger
 * /homes/:id/occupants:
 *   delete:
 *     summary: Remove occupant from home
 *     tags: [Homes]
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
router.delete('/:id/occupants', authenticate, authorize('admin', 'treasurer'), asyncHandler((req, res) => HomeController.removeOccupant(req, res)));
/**
 * @swagger
 * /homes/:id:
 *   delete:
 *     summary: Delete home by ID
 *     tags: [Homes]
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
router.delete('/:id', authenticate, authorize('admin', 'treasurer'), asyncHandler((req, res) => HomeController.delete(req, res)));

export default router;
