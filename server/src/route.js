const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/users', UserController.index);

routes.post('/users', UserController.store);

routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

module.exports = routes;
