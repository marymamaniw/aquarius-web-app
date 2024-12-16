import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { handleLogin, loginError} = useAuth();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      setLoading(true); 
      try {
        await handleLogin(email, password);
        console.log("Login exitoso");
      } catch (error) {
        console.error("Error al iniciar sesión", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{
            borderRadius: '25px',
        }}
      />
      {loginError && (
        <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
          {loginError}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ marginTop: 6, backgroundColor: "#0063a7", borderRadius: "14px"}}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
