import express from 'express';
import MessageResponse from '../interfaces/message-response';
import emojis from './emojis';
import { authenticate, refreshTokenMiddleware } from '../middlewares/authenticate';
import { userLoginRouter } from './auth/auth.router';
import { metricRouter } from './metric/router';

const router = express.Router();


router.get<{}, MessageResponse>('/ping', (req, res) => {
  res.json({
    data: null,
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/auth', userLoginRouter);
router.use(authenticate, refreshTokenMiddleware);
router.use('/metric', metricRouter);
// router.use('/report', report);
export default router;

export { metricRouter } from './metric/router';
