import express from 'express';

import AccessController from './controllers/AccessController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const usersController = new UsersController();
const accessController = new AccessController();

routes.get('/users', usersController.index);

routes.get('/users/:id', usersController.show);

routes.get('/access_control', accessController.index);
routes.post('/access_control', accessController.create);



export default routes;