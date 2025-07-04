import { CustomError } from '@/hooks/tanstackCustom/useCustomQuery';

export function errorMessageFormatter(error: CustomError) {

  if (error.code === 'ERR_NETWORK') {
    return 'Server is not reachable';
  }

  return error.response?.data?.message ?? error.message;
}