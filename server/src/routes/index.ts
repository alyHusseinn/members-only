import auth from './auth';
import user from './user';
import post from './post';
import club from './club';
import { Router } from 'express';

const routes = Router();

routes.use('/auth', auth);

routes.use('/club', club);

routes.use('/user', user);

routes.use('/post', post);

export default routes;
