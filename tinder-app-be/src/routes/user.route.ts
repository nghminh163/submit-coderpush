import { Router } from 'express';
import { Route } from '@interfaces/route.interface';
import UserController from '@/controllers/user.controller';

class UserRoute implements Route {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.userController.createUser);
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUser);

  }
}

export default UserRoute;
