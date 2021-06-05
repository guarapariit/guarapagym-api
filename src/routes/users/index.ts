import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';
import studentsRouter from './students.routes';
import instructorsRouter from './instructors.routes';
import UserAvatarController from '../../controllers/UserAvatarController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/instructors', instructorsRouter);

routes.patch(
  '/users/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
