import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (validator: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {  
    const { error } = validator.validate(req.body);

    if (error) {
      res.status(400).json({ errors: error.details });
      return 
    }

    next();  
  };
};