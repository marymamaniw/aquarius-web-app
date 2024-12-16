import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, CircularProgress, Snackbar } from '@mui/material';
import { Area } from '../../../models/AreaModels';
import { Employee, EmployeeFormModel } from '../../../models/EmployeeModels';
import { useEmployees } from '../hooks/useEmployees';

interface EmployeeFormProps {
    onClose: () => void;
    areas: Area[];
    employeeToEdit?: Employee | null;
}

const EmployeeForm = ({ onClose, areas, employeeToEdit }: EmployeeFormProps) => {
    const [selectedArea, setSelectedArea] = useState(employeeToEdit?.area.code || '');
    const [name, setName] = useState(employeeToEdit?.name || '');
    const [email, setEmail] = useState(employeeToEdit?.email || '');
    const [phone, setPhone] = useState(employeeToEdit?.phoneNumber || ''); 

    const { addEmployee, editEmployee, loading, error } = useEmployees();

    const handleAreaChange = (event: SelectChangeEvent<string>) => {
        setSelectedArea(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEmployee: EmployeeFormModel = {
        name,
        email,
        phoneNumber: phone,
        areaCode: selectedArea,
    };

    if (employeeToEdit) {
        await editEmployee(employeeToEdit.code, newEmployee);
    } else {
        await addEmployee(newEmployee);
    }
    onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Nombres"
                margin="normal"
                variant="outlined"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Área</InputLabel>
                <Select
                value={selectedArea}
                onChange={handleAreaChange}
                label="Área"
                >
                {areas.map((area) => (
                    <MenuItem key={area.code} value={area.code}>
                    {area.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Correo"
                margin="normal"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                fullWidth
                label="Celular"
                margin="normal"
                variant="outlined"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {error && (
                <Snackbar
                open={true}
                autoHideDuration={6000}
                message={error}
                />
            )}
    
            <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 6,
            }}
            >
                {loading 
                ? 
                <CircularProgress sx={{ marginTop: 2 }}/> 
                : 
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#0063a7', borderRadius: "14px" }}>
                Guardar
                </Button>
                }
                
                <Button variant="outlined" onClick={onClose} sx={{borderRadius: "14px" }}>
                Cancelar
                </Button>
            </Box>
        </Box>
    );
};
export default EmployeeForm;
