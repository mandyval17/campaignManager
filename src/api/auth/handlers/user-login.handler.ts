import { NextFunction, Request, Response } from 'express';
import prisma from '../../../db';
import MessageResponse from '../../../interfaces/message-response';
import { TUserLogin } from '../user-login.model';
import { TUserJwtPayload } from '../user-jwt-payload.model';
import { cookie, generateTokens } from '../../../utils/jwt';

export type UserLoginRequest = Request<{}, {}, TUserLogin, {}>;

export const userLogin = async (req: UserLoginRequest, res: Response<MessageResponse>, next: NextFunction) => {
  try {
    const data = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: null,
        dataCount: 0,
      });
    }

    // Prepare payload for JWT
    const payload: TUserJwtPayload = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const { authToken, refreshToken } = generateTokens(payload);
    res.cookie(cookie.AUTH_TOKEN, authToken, cookie.Options.AUTH_TOKEN);
    res.cookie(cookie.REFRESH_TOKEN, refreshToken, cookie.Options.REFRESH_TOKEN);

    res.json({
      data: {
        ...user,
        authToken,
        refreshToken,
      },
      message: 'Logged In Successfully',
      dataCount: 1,
    });
  } catch (error) {
    return next(error);
  }
}; 