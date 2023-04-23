import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { DeleteTaskType } from "../../service/api.service";
import { useAppSelector } from "../../store/hooks";

interface ModalDeleteProps {
  id: string;
  handleConfirmClose: () => void;
  handleConfirmModal: (task: DeleteTaskType) => void;
  isOpen: boolean;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  id,
  handleConfirmClose: handleCloseModal,
  handleConfirmModal: handleDeleteModal,
  isOpen
}) => {
  const loginRedux = useAppSelector((state) => state.login);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja excluir a Task?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() =>
              handleDeleteModal({ id, userId: loginRedux.user.id })
            }
          >
            Excluir
          </Button>
          <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
