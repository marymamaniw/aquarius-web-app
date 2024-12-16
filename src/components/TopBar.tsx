import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import useAuth from "../features/auth/hooks/useAuth";
import { Logout } from "@mui/icons-material";

const TopBar = () => {
    const { handleLogout, username } = useAuth();
    
    return (
      <AppBar 
      position="static"
      sx={{"--AppBar-background": "#0063a7",}}
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hola, {username}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{ textTransform: "none" }}
          >
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
    );
};

export default TopBar;