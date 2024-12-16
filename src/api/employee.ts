import { Employee, EmployeeFormModel } from "../models/EmployeeModels";
import apiClient from "./apiClient";

export const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>('/v1/employees');
    return response.data;
};

export const createEmployee = async (data: EmployeeFormModel): Promise<Employee> => {
    const response = await apiClient.post<Employee>('/v1/employees', data);
    return response.data;
};

export const updateEmployee = async (employeeCode: string, data: EmployeeFormModel): Promise<Employee> => {
    const response = await apiClient.put<Employee>(`/v1/employees/${employeeCode}`, data);
    return response.data;
};

export const deleteEmployee = async (employeeCode: string): Promise<string> => {
    const response = await apiClient.delete<string>(`/v1/employees/${employeeCode}`);
    return response.data;
};