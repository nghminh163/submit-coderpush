import { Router } from 'express';
import { Route } from '@interfaces/route.interface';
import UserController from '@/controllers/user.controller';
import authMiddleware from '@/middleware/auth.middleware';

class UserRoute implements Route {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/like`, authMiddleware, this.userController.getLikeList);
    this.router.get(`${this.path}/match`, authMiddleware, this.userController.getMatchLike);

    this.router.post(`${this.path}/create`, this.userController.createUser);
    this.router.get(`${this.path}`, authMiddleware, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUser);
    this.router.post(`${this.path}/like`, authMiddleware, this.userController.likeUser);

    // this.router.post(`${this.path}/:id`, this.userController.getUser);
  }
}

export default UserRoute;
