import 'dotenv/config';
import App from '@/app';

// Routes
import UserRoute from './routes/user.route';

const app = new App([new UserRoute()]);

app.listen();
