import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

interface Props {
  open: boolean;
  handleClose: (arg?: any) => void;
  handleConfirm: (arg?: any) => void;
}

export const ExportDialog = (props: Props) => {
  const { handleClose, handleConfirm, open } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Är du säker på att du vill exportera listan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Avbryt
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Exportera
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
