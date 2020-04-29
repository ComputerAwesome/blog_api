import {Router} from 'express';
import blog from './blog.routes';
import auth from './auth.routes';

const app = Router();

app.use('/api/blog', blog);
app.use('/auth', auth);

export default app;
