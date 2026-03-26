import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '@utils/appError';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      throw new AppError(messages, 400);
    }

    req.body = value;
    next();
  };
};
