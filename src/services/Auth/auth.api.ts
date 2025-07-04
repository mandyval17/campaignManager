import { TUserJwtPayload } from '@/components/types/models/user-jwt-payload.model';
import { Response } from '@/components/types/responseTypes';
import { axiosInstance } from '../axios';
// import { axiosInstance } from '../axios';
// import { axiosInstance } from '@services/axios';


const mockJwtPayload: TUserJwtPayload = {
  id: '22222222-2222-2222-2222-222222222222',
  email: 'testuser@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

function mockResponse<T>(data: T): Promise<Response<T>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data, message: 'Success', status: 200 }), 500);
  });
}
// --- END MOCK DATA ---

export default class AuthApis {

  // This is for the user roles and example of how to use it
  static async getUserRoles() {
    // MOCK: Return a list of user roles
    return mockResponse([mockJwtPayload]);
  }

  // static async getUserRoles() {
  //   const response = await axiosInstance.get<Response<TUserRole[]>>('/auth/roles');
  //   return response.data;
  // }

  static async userLogin({ email, password }: { email: string, password: string }) {
    const response = await axiosInstance.post<Response<TUserJwtPayload>>('/auth/login', { email, password });
    return response.data;
  }

  static async userLogout() {
    // MOCK: Always succeed
    const response = await axiosInstance.post<Response<TUserJwtPayload>>('/auth/logout');
    return response.data;
  }

}