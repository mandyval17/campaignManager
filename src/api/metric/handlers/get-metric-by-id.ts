import { NextFunction, Request, Response } from 'express';
import MessageResponse from '../../../interfaces/message-response';
import prisma from '../../../db';

type GetMetricByIdRequest = Request<{ id: string }, {}, {}, {}>;

export const getMetricById = async (req: GetMetricByIdRequest, res: Response<MessageResponse>, next: NextFunction) => {
  const { id } = req.params;

  const data = await prisma.metric.findFirst({
    where: {
      id,
    },
  });
  res.json({
    data,
    message: 'Metric fetched successfully',
    dataCount: 1,
  });
}; 