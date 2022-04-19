import 'dotenv/config';
import App from '@/app';

// Routes
import UserRoute from './routes/user.route';
import AuthRoute from './routes/auth.route';

const app = new App([new UserRoute(), new AuthRoute()]);

app.listen();
