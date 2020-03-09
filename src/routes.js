import { Router } from 'express';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import ProviderController from './app/controllers/providerController';
import AppointmentController from './app/controllers/appointmentController';
import ScheduleController from './app/controllers/scheduleController';
import NotificationController from './app/controllers/notificationController';

import authMiddleware from './app/middleware/auth';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

//responsible to create users
routes.post('/users', UserController.store);

//responsible to authenticate in app
routes.post('/sessions',SessionController.store);

routes.use(authMiddleware); //define global middleware

//responsible to update users
routes.put('/users',UserController.update);

//responsible to list all providers
routes.get('/providers',ProviderController.index);

//responsible to persist appointment
routes.post('/appointments',AppointmentController.store);

//responsible to delete appointment
routes.delete('/appointments/:id',AppointmentController.delete);

//responsible to list appointment
routes.get('/appointments',AppointmentController.index);

//responsible to upload files
routes.post('/files',upload.single('file'),FileController.store);

//responsible to list schedule from provider
routes.get('/schedule', ScheduleController.index);

//responsible to list notifications
routes.get('/notifications', NotificationController.index);

//responsible to update notifications (param id)
routes.put('/notifications/:id', NotificationController.update);

export default routes;