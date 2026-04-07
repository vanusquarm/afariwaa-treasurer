import { Router } from 'express';
import { TransactionController } from '@controllers/transactionController';
import { authenticate, authorize } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { transactionValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Record a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post(
  '/',
  authenticate,
  authorize('admin', 'treasurer'),
  validate(transactionValidation.create),
  asyncHandler((req, res) => TransactionController.create(req, res))
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: homeId
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -createdAt
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authenticate, asyncHandler((req, res) => TransactionController.getAll(req, res)));

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Get transaction summary
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/summary', authenticate, asyncHandler((req, res) => TransactionController.getSummary(req, res)));

/**
 * @swagger
 * /transactions/:id:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
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
router.get('/:id', authenticate, asyncHandler((req, res) => TransactionController.getById(req, res)));

/**
 * @swagger
 * /transactions/:id:
 *   put:
 *     summary: Update transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 */ 
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => TransactionController.update(req, res))
);

/**
 * @swagger
 * /transactions/:id:
 *   delete:
 *     summary: Delete transaction by ID
 *     tags: [Transactions]
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
router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'treasurer'),
  asyncHandler((req, res) => TransactionController.delete(req, res))
);

export default router;
