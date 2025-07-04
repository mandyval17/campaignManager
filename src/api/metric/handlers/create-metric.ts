import { NextFunction, Request, Response } from 'express';
import MessageResponse from '../../../interfaces/message-response';
import prisma from '../../../db';
import { TMetric } from '../metric.model';

type GetCreateMetricRequest = Request<{}, {}, TMetric, {}>;

export const createMetric = async (req: GetCreateMetricRequest, res: Response<MessageResponse>, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await prisma.metric.create({ data });
    res.json({
      data: result,
      message: 'Metric Created Successfully',
      dataCount: 1,
    });
  } catch (error) {
    return next(error);
  }
}; 