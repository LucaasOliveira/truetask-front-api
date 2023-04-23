import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { LoginUserType } from "../../service/api.service";

interface State {
  password: string;
  showPassword: boolean;
  confirm: string;
  showConfirm: boolean;
}

interface FormSignUpProps {
  handleSignUp: (form: {
    email: string;
    password: string;
    confirm: string;
  }) => void;
}

const FormSignUp: React.FC<FormSignUpProps> = ({ handleSignUp }) => {
  const [email, setEmail] = useState<string>("");
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
    confirm: "",
    showConfirm: false
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleClickShowConfirm = () => {
    setValues({
      ...values,
      showConfirm: !values.showConfirm
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signUp = () => {
    handleSignUp({
      email,
      password: values.password,
      confirm: values.confirm
    });
  };

  return (
    <>
      <TextField
        sx={{ marginBottom: "10px" }}
        onChange={(ev) => setEmail(ev.target.value)}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={email || ""}
        type="adress"
      ></TextField>
      <FormControl fullWidth variant="outlined" sx={{ mb: "10px" }}>
        <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" sx={{ mb: "10px" }}>
        <InputLabel htmlFor="outlined-adornment-confirm">
          Confirme sua senha *
        </InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-confirm"
          type={values.showConfirm ? "text" : "password"}
          value={values.confirm}
          onChange={handleChange("confirm")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirm}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirme sua senha"
        />
      </FormControl>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Button
          onClick={() => signUp()}
          type="submit"
          variant="contained"
          sx={{ width: "180px", mt: 1, mb: 2, backgroundColor: "#212121" }}
        >
          Cadastre-se
        </Button>
        <Link
          href="/"
          variant="body2"
          sx={{ color: "#ab47bc", textDecoration: "none" }}
        >
          {"Já possui uma conta? Então faça o login."}
        </Link>
      </Box>
    </>
  );
};

export default FormSignUp;
