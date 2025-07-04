import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/params-with-id';
import { validateRequest } from '../../middlewares/request-validators';
import { CreateMetricSchema, MetricSchema } from './metric.model';
import { createMetric } from './handlers/create-metric';
import { getAllMetrics } from './handlers/get-all-metrics';
import { getMetricById } from './handlers/get-metric-by-id';
import { updateMetric } from './handlers/update-metric';
import { deleteMetric } from './handlers/delete-metric';

const router = Router();

router.get('/', getAllMetrics);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  getMetricById,
);

router.post(
  '/',
  validateRequest({
    body: CreateMetricSchema,
  }),
  createMetric,
);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: MetricSchema.partial(),
  }),
  updateMetric,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  deleteMetric,
);

export const metricRouter = router; 