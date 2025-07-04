import { Router } from 'express';
import { validateRequest } from '../../middlewares/request-validators';
import { UserLoginSchema } from './user-login.model';
import { userLogin } from './handlers/user-login.handler';
import { logout } from './handlers/user-logout.handler';

const router = Router();

router.post('/login',
  validateRequest({ body: UserLoginSchema }),
  userLogin,
);

router.post('/logout', logout);

export const userLoginRouter = router; 