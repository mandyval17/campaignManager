import { Error } from '@/components/ui/error';
import { CustomError } from '@/hooks/tanstackCustom/useCustomQuery';
import { Box } from '@mui/material';
import React from 'react';
import { Loader } from '../ui/loader';

type WrapperComponentProps<T> = {
  isLoading: boolean;
  isError: boolean;
  error: CustomError | null;
  data: T | undefined;
  children: (data: T) => React.ReactNode;
};

export function ErrorAndLoaderWrapper<T>({
  isLoading,
  isError,
  error,
  data,
  children,
}: WrapperComponentProps<T>) {
  return (
    <Box>
      {isLoading ? (
        <Loader sx={{
          minHeight: '40dvh'
        }} />
      ) : isError ? (
        <Error
          sx={{
            minHeight: '40dvh'
          }}
          errorMessage={error?.response?.data?.message ?? error?.message}
        />
      ) : (
        data && children(data)
      )}
    </Box>
  );
}