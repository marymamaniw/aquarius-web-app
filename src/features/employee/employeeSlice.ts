import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, EmployeeFormModel } from "../../models/EmployeeModels";
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "../../api/employee";

interface EmployeeState {
employees: Employee[];
loading: boolean;
error: string | null;
}

const initialState: EmployeeState = {
employees: [],
loading: false,
error: null,
};

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async () => {
    return await getAllEmployees();
});

export const createNewEmployee = createAsyncThunk(
    'employees/create',
    async (data: EmployeeFormModel) => {
    return await createEmployee(data);
});

export const updateExistingEmployee = createAsyncThunk(
'employees/update',
async ({ employeeCode, data }: { employeeCode: string; data: EmployeeFormModel }) => {
    return await updateEmployee(employeeCode, data);
});

export const deleteExistingEmployee = createAsyncThunk(
'employees/delete',
async (employeeCode: string) => {
    return await deleteEmployee(employeeCode);
});

const employeeSlice = createSlice({
name: 'employees',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder
    .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
    })
    .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    .addCase(createNewEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
    })
    .addCase(updateExistingEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex((emp) => emp.code === action.payload.code);
        if (index !== -1) {
        state.employees[index] = action.payload;
        }
    })
    .addCase(deleteExistingEmployee.fulfilled, (state, action: PayloadAction<string>) => {
        state.employees = state.employees.filter((emp) => emp.code !== action.payload);
    });
    
},
});
  
export default employeeSlice.reducer;