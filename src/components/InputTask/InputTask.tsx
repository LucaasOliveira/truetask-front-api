import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { CreateTaskType } from "../.././service/api.service";
import { useAppSelector } from "../.././store/hooks";
import BasicAlert from "../Alerts/BasicAlert";

interface InputTaskProps {
  handleAddTask: (task: CreateTaskType) => void;
}

const InputTask: React.FC<InputTaskProps> = ({ handleAddTask }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setAlertMessage] = useState<string>("");
  const [color, setColor] = useState<AlertColor>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loginRedux = useAppSelector((state) => state.login);

  const task = () => {
    if (title === "" || description === "") {
      setIsOpen(true);
      setColor("error");
      setAlertMessage("Adicione o nome e/ou a descrição da tarefa.");
      return;
    }
    handleAddTask({
      userId: loginRedux.user.id,
      id: loginRedux.user.id,
      title: title,
      description: description,
      archived: false
    });
    handleClear();
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          mt: "20px",
          mx: "10px",
          fontFamily: "Cutive Mono",
          color: "text.secondary",
          fontSize: "45px"
        }}
      >
        Minhas Tarefas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid",
          borderColor: "text.disabled",
          borderRadius: "8px",
          padding: "10px",
          mx: "70px",
          mt: "20px"
        }}
      >
        <TextField
          variant="standard"
          id="title"
          name="title"
          autoComplete="title"
          autoFocus
          placeholder="Tarefa"
          InputProps={{
            disableUnderline: true
          }}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></TextField>
        <TextField
          sx={{ my: 1 }}
          id="description"
          name="description"
          autoComplete="description"
          variant="standard"
          placeholder="Descrição"
          InputProps={{
            disableUnderline: true
          }}
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mx: "70px",
          mt: "5px",
          mb: "15px"
        }}
      >
        <Button
          onClick={() => task()}
          variant="contained"
          size="small"
          startIcon={<AddIcon sx={{ color: "background.default" }} />}
          sx={{
            fontFamily: "Poppins",
            color: "background.default",
            backgroundColor: "#4a148c"
          }}
        >
          Adicionar
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: "Poppins",
            color: "background.default",
            backgroundColor: "#ab47bc",
            margin: "10px"
          }}
          onClick={() => handleClear()}
        >
          Limpar
        </Button>
      </Box>
      <BasicAlert
        message={message}
        openAlert={isOpen}
        setOpenAlert={setIsOpen}
        alertColor={color}
      />
    </>
  );
};

export default InputTask;
