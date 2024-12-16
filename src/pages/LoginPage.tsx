import { Box, CardMedia, Container, Typography } from "@mui/material";
import LoginForm from "../features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <Container
            component="main"
            sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            }}
        >
            <CardMedia
                    component="img"
                    image="/logo-horizontal.png"
                    alt="Logo"
                    sx={{
                        width: "350px",
                        height: "auto",
                        margin: "0 auto",
                        marginY: 8,
                    }}
                />
            <Box
            sx={{
                maxWidth: "xs",
                padding: 3,
                borderRadius: "12px",
                boxShadow: 3,
                backgroundColor: "#fff",
            }}
            >
                <Typography 
                variant="h4"
                component="h2"
                sx={{ marginBottom: 3 }} 
                >
                    Iniciar sesión
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    );
};

export default LoginPage;
