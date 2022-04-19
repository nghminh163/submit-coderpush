import { Router } from 'express';
import { Route } from '@interfaces/route.interface';
import AuthController from '@/controllers/auth.controller';
import authMiddleware from '@/middleware/auth.middleware';

class UserRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.authController.getRandomUser);
    this.router.post(`${this.path}/me`, authMiddleware, this.authController.getMe);
  }
}

export default UserRoute;
