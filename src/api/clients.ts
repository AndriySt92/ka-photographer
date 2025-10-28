import type { AxiosRequestConfig } from 'axios';

import axiosClient from './axiosClient';

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const res = await axiosClient.get<T>(url, config);
  return res.data as T;
}

export async function post<T, B>(url: string, body: B, config?: AxiosRequestConfig) {
  const res = await axiosClient.post<T>(url, body, config);
  return res.data as T;
}

export async function put<T, B>(url: string, body: B, config?: AxiosRequestConfig) {
  const res = await axiosClient.put<T>(url, body, config);
  return res.data as T;
}

export async function remove<T>(url: string, config?: AxiosRequestConfig) {
  const res = await axiosClient.delete<T>(url, config);
  return res.data as T;
}
