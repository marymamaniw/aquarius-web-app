import React from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';
import useAreas from '../hooks/useAreas';
import EmployeeForm from './EmployeeForm';
import { Employee } from '../../../models/EmployeeModels';

interface CreateEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employeeToEdit?: Employee | null;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ open, onClose, employeeToEdit }) => {
    const { areas, loading } = useAreas();

    return (
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="create-employee-title"
        aria-describedby="create-employee-description"
        >
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            }}
        >
            <Typography id="create-employee-title" variant="h6" component="h2">
                {employeeToEdit ? 'Editar Empleado' : 'Crear Nuevo Empleado'}
            </Typography>
            {loading ? <CircularProgress /> : <EmployeeForm onClose={onClose} areas={areas} employeeToEdit ={employeeToEdit}/>}
        </Box>
        </Modal>
    );
};

export default CreateEmployeeModal;
