import { AxiosError } from 'axios';

import axiosInstance from './axiosInstance';
import { StatusResponse } from './types';

interface AuthResponse {
  success: boolean;
  errorText?: string;
}

export async function authUser(phone: string): Promise<StatusResponse<AuthResponse>> {
  try {
    const { data } = await axiosInstance.post('/auth', { phone });

    return { status: data.success, data };
  } catch (err) {
    const data = (err as AxiosError).response?.data;
    return { status: false, data };
  }
}
