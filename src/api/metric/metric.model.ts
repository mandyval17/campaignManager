import { z } from 'zod';

export const MetricSchema = z.object({
  id: z.string(),
  campaignName: z.string().nonempty('Campaign Name is required'),
  date: z.coerce.date({ required_error: 'Date is required' }),
  impressions: z.number({ required_error: 'Impressions is required' }).min(0, 'Impressions must be greater then -1'),
  clicks: z.number({ required_error: 'Clicks is required' }).min(0, 'Clicks must be greater then -1'),
  conversions: z.number({ required_error: 'Conversions is required' }).min(0, 'Conversions must be greater then -1'),
  userId: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const CreateMetricSchema = MetricSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateMetric = z.infer<typeof CreateMetricSchema>;
export type TMetric = z.infer<typeof MetricSchema>; 