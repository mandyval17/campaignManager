import { NextFunction, Request, Response } from 'express';
import prisma from '../../../db';
import MessageResponse from '../../../interfaces/message-response';
import { TMetric } from '../metric.model';

type GetAllMetricsRequest = Request<{}, {}, TMetric, {}>;

export const getAllMetrics = async (req: GetAllMetricsRequest, res: Response<MessageResponse>, next: NextFunction) => {
  const data = await prisma.metric.findMany();
  res.json({
    data,
    message: 'Metrics fetched successfully',
    dataCount: data.length,
  });
}; 