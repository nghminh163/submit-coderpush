import { badRequest } from '@/utils/httpResponse';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.user = jwt.verify(bearerToken, 'THIS_IS_SECRET_STRiNG') as User;
      next();
    } else {
      badRequest(res);
    }
  } catch (err) {
    badRequest(res, err?.message);
  }
};

export default authMiddleware;
