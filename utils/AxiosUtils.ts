import axios from 'axios';

enum URLS {
  DEV = 'http://192.168.0.8:8000',
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const instance = axios.create({
  baseURL: URLS.DEV,
  timeout: 10000,
});

export interface ServerResponse<D> {
  code: number;
  success: boolean;
  data: D;
  stack?: any;
}

export async function axiosServerRequest<D>(
  method: Methods,
  url: string,
  data?: any
): Promise<ServerResponse<D>> {
  const res = await instance({ url, data });
  return res.data;
}
