import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

interface ModalLogoutProps {
  handleConfirmClose: () => void;
  handleConfirmModal: () => void;
  isOpen: boolean;
}

const ModalLogout: React.FC<ModalLogoutProps> = ({
  handleConfirmClose: handleCloseModal,
  handleConfirmModal: handleDeleteModal,
  isOpen
}) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja realmente sair?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDeleteModal()}>Sim</Button>
          <Button onClick={() => handleCloseModal()}>Não</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalLogout;
