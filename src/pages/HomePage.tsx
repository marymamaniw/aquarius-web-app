import TopBar from "../components/TopBar";
import { Button, Container, Typography } from "@mui/material";
import EmployeeList from "../features/employee/components/EmployeeList";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import CreateEmployeeModal from "../features/employee/components/CreateEmployeeModal";
import { Employee } from "../models/EmployeeModels";

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null); 

    const handleOpenModal = (employee?: Employee) => {
        setEmployeeToEdit(employee || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
  
    return (
    <>
        <TopBar/>
        <Container
            component="main"
            sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            }}
        >
            <Typography 
            variant="h4"
            component="h2"
            sx={{ marginTop: 8 }} 
            >
                    Lista de Empleados
            </Typography>
            <div>
            <Button
            onClick={() => handleOpenModal()}
            size="medium"
            variant="contained"
            startIcon= {<Add/>}
            sx={{ marginTop: 6, backgroundColor: "#0063a7", borderRadius: "14px"}}>
                Nuevo Empleado
            </Button>
            </div>
            <EmployeeList onEdit={handleOpenModal}/>
            <CreateEmployeeModal open={isModalOpen} onClose={handleCloseModal} employeeToEdit={employeeToEdit} />
        </Container>
    </>
    );
};

export default HomePage;