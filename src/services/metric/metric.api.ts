import { TCreateMetric, TMetric } from '@/components/types/models/metric.model';
import { Response } from '@components/types/responseTypes';
import { axiosInstance } from '@services/axios';

export default class MetricApis {
  static async getAllMetrics() {
    const response = await axiosInstance.get<Response<TMetric[]>>('/metric');
    return response.data;
  }

  static async getMetricById(id: string) {
    const response = await axiosInstance.get<Response<TMetric>>(`/metric/${id}`);
    return response.data;
  }

  static async createMetric(data: TCreateMetric) {
    const response = await axiosInstance.post<Response<TMetric>>('/metric', data);
    return response.data;
  }

  static async updateMetric(id: string, data: Partial<TMetric>) {
    const response = await axiosInstance.put<Response<TMetric>>(`/metric/${id}`, data);
    return response.data;
  }

  static async deleteMetric(id: string) {
    const response = await axiosInstance.delete<Response<null>>(`/metric/${id}`);
    return response.data;
  }
} 