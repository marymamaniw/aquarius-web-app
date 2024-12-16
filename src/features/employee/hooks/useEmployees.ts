import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { createNewEmployee, deleteExistingEmployee, fetchEmployees, updateExistingEmployee } from "../employeeSlice";
import { EmployeeFormModel } from "../../../models/EmployeeModels";

export const useEmployees = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { employees, loading, error } = useSelector((state: RootState) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const refreshEmployees = () => {
        dispatch(fetchEmployees());
    };

    const addEmployee = async (data: EmployeeFormModel) => {
        await dispatch(createNewEmployee(data));
    };
    
    const editEmployee = async (employeeCode: string, data: EmployeeFormModel) => {
        await dispatch(updateExistingEmployee({ employeeCode, data }));
    };
    
    const removeEmployee = async (employeeCode: string) => {
        await dispatch(deleteExistingEmployee(employeeCode));
    };
    
    return {
        employees,
        loading,
        error,
        addEmployee,
        editEmployee,
        removeEmployee,
        refreshEmployees
    };
};