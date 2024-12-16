import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { login, logout } from "../../../api/auth";
import { LoginRequest } from "../../../models/AuthModels";
import { useState } from "react";
import { ErrorResponse } from "../../../models/ErrorModels";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { clearCredentials, setCredentials } from "../authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, refreshToken, username } = useSelector(
    (state: RootState) => state.auth
  );

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const loginData: LoginRequest = { email, password };
      const response = await login(loginData);
      const { token, refreshToken, name } = response;

      dispatch(
        setCredentials({
          token,
          refreshToken,
          username: name,
        })
      );

      setLoginError(null);
      navigate('/');
    } catch (error) {

      if (error instanceof AxiosError && error.response?.data) {
        const errorData: ErrorResponse = error.response.data;

        setLoginError(errorData.message);
      } else {
        setLoginError("Ocurrió un error al intentar iniciar sesión.");
      }

      throw error;
    }
  };

  const handleLogout = async () => {
    if (!token) {
      return;
    }

    try {
      await logout();
      dispatch(clearCredentials());
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  };

  return {
    token,
    refreshToken,
    username,
    handleLogin,
    handleLogout,
    isAuthenticated: !!token,
    loginError,
  };
};

export default useAuth;

