import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import React from "react";
import { UpdateTaskType } from "../../service/api.service";
import { useAppSelector } from "../../store/hooks";
import { selectById } from "../../store/modules/TasksSlice";

interface ModalArchivedProps {
  handleCloseEdit: () => void;
  handleEdit: (task: UpdateTaskType) => void;
  isOpen: boolean;
  id: string;
}

const ModalArchived: React.FC<ModalArchivedProps> = ({
  id,
  handleCloseEdit: handleClose,
  handleEdit,
  isOpen
}) => {
  const loginRedux = useAppSelector((state) => state.login);
  const task = useAppSelector((state) => selectById(state, id));
  if (!task) {
    return null;
  }
  const alternative = task.archived ? "desarquivar" : "arquivar";

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Você deseja {alternative} a task? </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            handleEdit({
              userId: loginRedux.user.id,
              ...task,
              archived: !task.archived
            })
          }
        >
          {alternative}
        </Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalArchived;
