import { Router } from 'express';
import multer from 'multer';


import uploadConfig from '@config/upload'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ProfilerUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfilerUserController();

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)

export { usersRoutes }