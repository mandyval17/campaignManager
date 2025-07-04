import { TCreateMetric, TMetric } from '@/components/types/models/metric.model';
import { useCustomMutation, useCustomQuery } from '@/hooks/tanstackCustom/useCustomQuery';
import { errorMessageFormatter } from '@/utilities/errorMessageFormatter';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import MetricApis from './metric.api';

export default class MetricService {
  static useGetAllMetrics() {
    return useCustomQuery({
      queryKey: ['metric', 'all'],
      queryFn: () => MetricApis.getAllMetrics(),
      throwOnError: (error) => {
        toast.error(errorMessageFormatter(error));
        return false;
      }
    });
  }

  static useGetMetricById(id: string) {
    return useCustomQuery({
      queryKey: ['metric', id],
      queryFn: () => MetricApis.getMetricById(id),
      enabled: !!id,
      throwOnError: (error) => {
        toast.error(errorMessageFormatter(error));
        return false;
      }
    });
  }

  static useCreateMetricMutation() {
    const queryClient = useQueryClient();
    return useCustomMutation({
      mutationFn: (data: TCreateMetric) => MetricApis.createMetric(data),
      onSettled: async (_data, error) => {
        if (error) {
          toast.error(errorMessageFormatter(error));
        } else {
          toast.success('Metric created!');
        }
        await queryClient.invalidateQueries({ queryKey: ['metric', 'all'] });
      }
    });
  }

  static useUpdateMetricMutation() {
    const queryClient = useQueryClient();
    return useCustomMutation({
      mutationFn: ({ id, data }: { id: string, data: Partial<TMetric> }) => MetricApis.updateMetric(id, data),
      onSettled: async (_data, error) => {
        if (error) {
          toast.error(errorMessageFormatter(error));
        } else {
          toast.success('Metric updated!');
        }
        await queryClient.invalidateQueries({ queryKey: ['metric', 'all'] });
      }
    });
  }

  static useDeleteMetricMutation() {
    const queryClient = useQueryClient();
    return useCustomMutation({
      mutationFn: (id: string) => MetricApis.deleteMetric(id),
      onSettled: async (_data, error) => {
        if (error) {
          toast.error(errorMessageFormatter(error));
        } else {
          toast.success('Metric deleted!');
        }
        await queryClient.invalidateQueries({ queryKey: ['metric', 'all'] });
      }
    });
  }
} 