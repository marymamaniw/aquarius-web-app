import { LoginRequest, LoginResponse } from "../models/AuthModels";
import apiClient from "./apiClient";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/v1/auth/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/v1/auth/logout');
};
