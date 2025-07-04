import { NextFunction, Request, Response } from 'express';
import MessageResponse from '../../../interfaces/message-response';
import prisma from '../../../db';
import { TMetric } from '../metric.model';

type UpdateMetricRequest = Request<{ id: string }, {}, Partial<TMetric>, {}>;

export const updateMetric = async (req: UpdateMetricRequest, res: Response<MessageResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await prisma.metric.update({
      where: { id },
      data,
    });
    res.json({
      data: result,
      message: 'Metric updated successfully',
      dataCount: 1,
    });
  } catch (error) {
    return next(error);
  }
}; 