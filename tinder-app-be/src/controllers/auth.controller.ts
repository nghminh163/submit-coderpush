import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { badRequest, success } from '@/utils/httpResponse';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
export default class AuthController {
  private prisma = new PrismaClient();
  public getRandomUser = async (req: Request, res: Response): Promise<void> => {
    // Get random user for Login
    try {
      const data = await this.prisma.user.findMany({});
      if (data.length > 0) {
        const user = _.sample(data);
        return success(res, {
          user,
          token: jwt.sign(user, 'THIS_IS_SECRET_STRiNG'),
        });
      } else {
        badRequest(res, 'No user');
      }
    } catch (err) {
      badRequest(res, err?.message);
    }
  };

  public getMe = async (req: Request, res: Response): Promise<void> => {
    return success(res, { user: req.user });
  };
}
