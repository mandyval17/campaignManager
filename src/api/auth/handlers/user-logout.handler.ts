import { NextFunction, Request, Response } from 'express';
import MessageResponse from '../../../interfaces/message-response';

type LogoutRequest = Request<{}, {}, {}>;
export async function logout(req: LogoutRequest, res: Response<MessageResponse>, next: NextFunction) {
  try {
    res.clearCookie('auth_token');
    res.clearCookie('refresh_token');

    return res.status(200).json({
      data: null,
      message: 'Logout successful',
    });
  } catch (error) {
    return next(error);
  }
}