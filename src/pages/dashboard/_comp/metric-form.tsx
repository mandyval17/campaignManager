import { CreateMetricSchema, TCreateMetric, TMetric } from '@/components/types/models/metric.model';
import { MyDialogActions } from '@/components/ui/modal';
import { useAuth } from '@/hooks/auth/useAuth';
import MetricService from '@/services/metric/metric.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface MetricFormProps {
  onSuccess: () => void;
  initialMetric?: TMetric | null;
}

export default function MetricForm({ onSuccess, initialMetric }: MetricFormProps) {
  const { user } = useAuth();
  const createMetricMutation = MetricService.useCreateMetricMutation();
  const updateMetricMutation = MetricService.useUpdateMetricMutation();

  const isEdit = !!initialMetric;

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TCreateMetric>({
    resolver: zodResolver(CreateMetricSchema),
    defaultValues: initialMetric
      ? {
        campaignName: initialMetric.campaignName,
        date: initialMetric.date,
        impressions: initialMetric.impressions,
        clicks: initialMetric.clicks,
        conversions: initialMetric.conversions,
        userId: initialMetric.userId,
      }
      : {
        campaignName: '',
        date: new Date(),
        impressions: 0,
        clicks: 0,
        conversions: 0,
        userId: '',
      },
  });

  // Reset form when initialMetric changes or modal closes
  useEffect(() => {
    if (initialMetric) {
      reset({
        campaignName: initialMetric.campaignName,
        date: initialMetric.date,
        impressions: initialMetric.impressions,
        clicks: initialMetric.clicks,
        conversions: initialMetric.conversions,
        userId: initialMetric.userId,
      });
    } else {
      reset({
        campaignName: '',
        date: new Date(),
        impressions: 0,
        clicks: 0,
        conversions: 0,
        userId: '',
      });
    }
  }, [initialMetric, reset]);

  const onSubmit = async (data: TCreateMetric) => {
    if (isEdit && initialMetric) {
      updateMetricMutation.mutate(
        { id: initialMetric.id, data: { ...data, userId: user?.id || '' } },
        { onSuccess }
      );
    } else {
      createMetricMutation.mutate(
        { ...data, userId: user?.id || '' },
        { onSuccess }
      );
    }
  };

  const isPending = isEdit ? updateMetricMutation.isPending : createMetricMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Controller
          name="campaignName"
          control={control}
          render={({ field }) => (
            <TextField {...field} sx={{ mt: 2 }} label="Campaign Name" error={!!errors.campaignName} helperText={errors.campaignName?.message} fullWidth />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(value) => field.onChange(value ? value.toDate() : null)}
              slotProps={{ textField: { fullWidth: true, error: !!errors.date, helperText: errors.date?.message } }}
            />
          )}
        />
        <Controller
          name="impressions"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Impressions"
              type="number"
              error={!!errors.impressions}
              helperText={errors.impressions?.message}
              fullWidth
              onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
            />
          )}
        />
        <Controller
          name="clicks"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Clicks"
              type="number"
              error={!!errors.clicks}
              helperText={errors.clicks?.message}
              fullWidth
              onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
            />
          )}
        />
        <Controller
          name="conversions"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Conversions"
              type="number"
              error={!!errors.conversions}
              helperText={errors.conversions?.message}
              fullWidth
              onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
            />
          )}
        />
      </Stack>
      <MyDialogActions>
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || isPending}>
          {isPending ? (isEdit ? 'Saving...' : 'Creating...') : isEdit ? 'Save' : 'Create'}
        </Button>
      </MyDialogActions>
    </form>
  );
} 