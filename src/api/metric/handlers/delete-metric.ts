import { NextFunction, Request, Response } from 'express';
import MessageResponse from '../../../interfaces/message-response';
import prisma from '../../../db';

type DeleteMetricRequest = Request<{ id: string }, {}, {}, {}>;

export const deleteMetric = async (req: DeleteMetricRequest, res: Response<MessageResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.metric.delete({
      where: { id },
    });
    res.json({
      data: null,
      message: 'Metric deleted successfully',
      dataCount: 1,
    });
  } catch (error) {
    return next(error);
  }
}; 