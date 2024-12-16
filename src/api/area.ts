import { Area } from "../models/AreaModels";
import apiClient from "./apiClient";

export const getAllAreas = async (): Promise<Area[]> => {
    const response = await apiClient.get<Area[]>('/v1/areas');
    return response.data;
};