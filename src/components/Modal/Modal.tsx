/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UpdateTaskType } from "../../service/api.service";
import { useAppSelector } from "../../store/hooks";
import { selectById } from "../../store/modules/TasksSlice";

interface ModalProps {
  handleCloseEdit: () => void;
  handleEdit: (task: UpdateTaskType) => void;
  isOpen: boolean;
  id: string;
}

const Modal: React.FC<ModalProps> = ({
  id,
  handleCloseEdit: handleClose,
  handleEdit,
  isOpen
}) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const loginRedux = useAppSelector((state) => state.login);
  const taskId = useAppSelector((state) => selectById(state, id));

  useEffect(() => {
    if (id !== "") {
      setNewTitle(taskId?.title as string);
      setNewDescription(taskId?.description as string);
    }
  }, [taskId]);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nova tarefa"
          type="text"
          fullWidth
          variant="outlined"
          value={newTitle}
          onChange={(ev) => setNewTitle(ev.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nova descrição"
          type="text"
          fullWidth
          variant="outlined"
          value={newDescription}
          onChange={(ev) => setNewDescription(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            handleEdit({
              userId: loginRedux.user.id,
              id,
              title: newTitle,
              description: newDescription,
              archived: false
            })
          }
        >
          Editar
        </Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
