import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { badRequest, notFound, success } from '@/utils/httpResponse';
import UserValidator from '@/validators/user.validator';
import _ from 'lodash';
import { User } from '@/interfaces/user.interface';
export default class UserController {
  private prisma = new PrismaClient();
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await UserValidator.validateAsync(req.body);
      const data = { ...req.body, dob: new Date(req.body.dob) } as User;
      await this.prisma.user.create({
        data,
      });
      success(res, data);
    } catch (err) {
      if (err?.code === 'P2002') {
        badRequest(res, 'User already exists');
        return;
      }
      badRequest(res, err?.message);
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.prisma.user.findMany({});
      success(res, data);
    } catch (err) {
      badRequest(res, err?.message);
    }
  };
  public getUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const data = await this.prisma.user.findUnique({
        where: { id },
      });
      if (data) {
        success(res, data);
      } else {
        notFound(res, 'User not found');
      }
    } catch (err) {
      badRequest(res, 'Invalid ID');
    }
  };
}
