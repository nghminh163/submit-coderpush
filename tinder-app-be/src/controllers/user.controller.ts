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
      // Ignore self
      const userReq = req.user.id;
      const matches = await this.prisma.match.findMany({
        where: {
          // Ignore liked + matched
          OR: [{ userId: userReq }, { partnerId: userReq, isMatched: true }],
        },
      });
      const ignoreList = [req.user.id, ...matches.map(match => (match.partnerId === userReq ? match.userId : match.partnerId))];

      const data = await this.prisma.user.findMany({
        where: {
          NOT: {
            id: {
              in: ignoreList,
            },
          },
        },
      });
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

  public likeUser = async (req: Request<{ partnerId: string }>, res: Response): Promise<void> => {
    const isMatch = await this.prisma.match.findMany({
      where: {
        OR: [
          {
            userId: req.user.id,
            partnerId: req.body.partnerId,
          },
          {
            partnerId: req.user.id,
            userId: req.body.partnerId,
          },
        ],
      },
    });
    if (isMatch.length > 0) {
      await this.prisma.match.updateMany({
        where: {
          id: {
            in: isMatch.map(m => m.id),
          },
        },
        data: {
          isMatched: true,
        },
      });
      success(res, { isMatch: true });
    } else {
      await this.prisma.match.create({
        data: {
          userId: req.user.id,
          partnerId: req.body.partnerId,
        },
      });
      success(res, { isMatch: false });
    }
  };

  public getLikeList = async (req: Request, res: Response): Promise<void> => {
    try {
      // Ignore self
      const userReq = req.user.id;
      const matches = await this.prisma.match.findMany({
        where: {
          // Get liked from user
          OR: [{ userId: userReq, isMatched: false }],
        },
      });
      const ignoreList = [req.user.id];
      const data = await this.prisma.user.findMany({
        where: {
          id: {
            in: matches.map(match => match.partnerId),
          },
          NOT: {
            id: {
              in: ignoreList,
            },
          },
        },
      });
      success(res, data);
    } catch (err) {
      badRequest(res, err?.message);
    }
  };
  public getMatchLike = async (req: Request, res: Response): Promise<void> => {
    try {
      // Ignore self
      const userReq = req.user.id;
      const matches = await this.prisma.match.findMany({
        where: {
          // Get match from user
          OR: [
            { userId: userReq, isMatched: true },
            { partnerId: userReq, isMatched: true },
          ],
        },
      });
      console.log(matches);
      const ignoreList = [req.user.id];
      const data = await this.prisma.user.findMany({
        where: {
          id: {
            in: matches.map(match => (match.partnerId === userReq ? match.userId : match.partnerId)),
          },
          NOT: {
            id: {
              in: ignoreList,
            },
          },
        },
      });
      success(res, data);
    } catch (err) {
      badRequest(res, err?.message);
    }
  };
}
