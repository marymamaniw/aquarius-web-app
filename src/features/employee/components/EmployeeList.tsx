import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress } from "@mui/material";
import { useEmployees } from "../hooks/useEmployees";
import { Employee } from "../../../models/EmployeeModels";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useState } from "react";

const EmployeeList: React.FC<{ onEdit: (employee: Employee) => void }> = ({ onEdit }) => {
  const { employees, loading, error, removeEmployee } = useEmployees();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    const employee = employees.find(emp => emp.code === id);
    if (employee) onEdit(employee);
  };

  const handleDelete = (id: string) => {
    setEmployeeToDelete(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      removeEmployee(employeeToDelete);
      setIsDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  if (loading) return <CircularProgress sx={{ marginTop: 2 }}/> ;
  if (error) return <p>{error}</p>;
  return (
    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#0063a7", fontWeight: 'bold' }}>Empleado</TableCell>
            <TableCell sx={{ color: "#0063a7", fontWeight: 'bold' }}>Celular</TableCell>
            <TableCell sx={{ color: "#0063a7", fontWeight: 'bold' }}>Correo</TableCell>
            <TableCell sx={{ color: "#0063a7", fontWeight: 'bold' }}>Área</TableCell>
            <TableCell sx={{ color: "#0063a7", fontWeight: 'bold' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.code}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phoneNumber}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.area.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(employee.code)} color="info">
                  <EditOutlined />
                </IconButton>
                <IconButton onClick={() => handleDelete(employee.code)} color="info">
                  <DeleteOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de eliminar al empleado?"
      />
    </TableContainer>
  );
};

export default EmployeeList;