import { Limit } from '@/types/limit';

import axiosInstance from './axiosInstance';
import { StatusResponse } from './types';

interface GetLimitsResponse {
  limits: Limit[];
}

export async function getLimits(): Promise<StatusResponse<GetLimitsResponse>> {
  try {
    const { data } = await axiosInstance.get('GET_LIMITS');

    return { status: true, data };
  } catch (err) {
    console.error(err);
    return { status: false };
  }
}
