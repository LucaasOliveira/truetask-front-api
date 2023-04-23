import React, { useState } from "react";
import { AlertColor, Box } from "@mui/material";
import { Card } from "../components/Card/Card";
import { useThunkAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import BasicAlert from "../components/Alerts/BasicAlert";
import FormLogin from "../components/FormLogin/FormLogin";
import { loginAction } from "../store/modules/LoginSlice";
import { LoginUserType } from "../service/api.service";

const Login: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [color, setColor] = useState<AlertColor>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const thunkDispatch = useThunkAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (user: LoginUserType) => {
    const result = await thunkDispatch(
      loginAction({ email: user.email, password: user.password })
    ).unwrap();
    if (!result.ok) {
      setIsOpen(true);
      setColor("error");
      setAlertMessage(result.message);
      return;
    }
    navigate("/src/pages/TaskList.tsx");
  };

  return (
    <Card title="Iniciar Sessão">
      <Box>
        <FormLogin handleLogin={handleLogin} />
        <BasicAlert
          message={alertMessage}
          openAlert={isOpen}
          setOpenAlert={setIsOpen}
          alertColor={color}
        />
      </Box>
    </Card>
  );
};

export default Login;
