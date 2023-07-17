import { UserData } from '@/types/user';

import axiosInstance from './axiosInstance';
import { StatusResponse } from './types';

export async function getUserData(): Promise<StatusResponse<UserData>> {
  try {
    const { data } = await axiosInstance.get('GET_USER_DATA');

    return { status: true, data };
  } catch (err) {
    console.error(err);
    return { status: false };
  }
}
