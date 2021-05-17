import { Router } from 'express';
import ensureManager from '../middlewares/ensureManager';
// import multer from 'multer';
// import uploadConfig from '@config/upload';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StudentsController from '../controllers/StudentsController';
import InstructorsController from '../controllers/InstructorsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// import UserAvatarController from '../controllers/UserAvatarController';

const studentsController = new StudentsController();
const instructorsController = new InstructorsController();
const usersRouter = Router();
// const userAvatarController = new UserAvatarController();
// const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/students',
  ensureAuthenticated,
  ensureManager,
  studentsController.create,
);
usersRouter.post(
  '/teachers',
  ensureAuthenticated,
  ensureManager,
  instructorsController.create,
);

// usersRouter.patch(
//   '/avatar',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default usersRouter;
