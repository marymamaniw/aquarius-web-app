import { Area } from "./AreaModels";

export interface Employee {
    code: string;
    name: string;
    area: Area;
    email: string;
    phoneNumber: string;
}

export interface EmployeeFormModel {
    name: string;
    areaCode: string;
    email: string;
    phoneNumber: string;
}