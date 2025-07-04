
import { errorMessageFormatter } from '@/utilities/errorMessageFormatter';
import { TTQOptions, useCustomMutation, useCustomQuery } from '@hooks/tanstackCustom/useCustomQuery';
import toast from 'react-hot-toast';
import AuthApis from './auth.api';

export default class AuthService {

  //This is for the user roles and example of how to use it
  static useGetUserRoles(options: TTQOptions = {}) {
    return useCustomQuery({
      queryKey: ['userRoles'],
      queryFn: AuthApis.getUserRoles,
      ...options,
    })
  }

  static useUserLoginMutation() {
    return useCustomMutation({
      mutationFn: AuthApis.userLogin,
      onSettled: async (data, error, _variables) => {
        if (error) {
          toast.error(errorMessageFormatter(error));
        }
        else {
          toast.success(data?.message ?? '');
        }
      }
    })
  }

  static useUserLogoutMutation() {
    return useCustomMutation({
      mutationFn: AuthApis.userLogout,
      onSettled: async (data, error, _variables) => {
        if (error) {
          toast.error(errorMessageFormatter(error));
        }
        else {
          toast.success(data?.message ?? '');
        }
      }
    })
  }

}