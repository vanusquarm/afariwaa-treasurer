import { Router } from 'express';
import Joi from 'joi';
import { AuthController } from '@controllers/authController';
import { authenticate } from '@middleware/auth';
import { validate } from '@middleware/validation';
import { authValidation } from '@utils/validators';
import { asyncHandler } from '@middleware/errorHandler';

const router = Router();

router.post(
  '/register',
  validate(authValidation.register),
  asyncHandler((req, res) => AuthController.register(req, res))
);

router.post(
  '/login',
  validate(authValidation.login),
  asyncHandler((req, res) => AuthController.login(req, res))
);

router.post(
  '/refresh-token',
  validate(Joi.object({ refreshToken: Joi.string().required() })),
  asyncHandler((req, res) => AuthController.refreshToken(req, res))
);

router.get('/profile', authenticate, asyncHandler((req, res) => AuthController.profile(req, res)));

router.put(
  '/profile',
  authenticate,
  asyncHandler((req, res) => AuthController.updateProfile(req, res))
);

router.post('/logout', authenticate, asyncHandler((req, res) => AuthController.logout(req, res)));

router.post('/verify-email', authenticate, asyncHandler((req, res) => AuthController.verifyEmail(req, res)));

export default router;
