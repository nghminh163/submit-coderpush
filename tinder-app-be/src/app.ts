import express from 'express';
import { Request, Response } from 'express';
import { Route } from './interfaces/route.interface';
import cors from 'cors';
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializePingPong();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializePingPong() {
    this.app.get('/ping', (req: Request, res: Response) => res.send('pong'));
  }
}

export default App;
