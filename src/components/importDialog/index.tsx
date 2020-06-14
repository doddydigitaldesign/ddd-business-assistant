import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";

interface Props {
  open: boolean;
  handleClose: (arg?: any) => void;
  handleConfirm: (arg: string) => void;
}

export const ImportDialog = (props: Props) => {
  const { handleClose, handleConfirm, open } = props;
  const initialValue = `{
      "Data":[
        {
          "Id":"${uuidV4()}",
          "Date":"${new Date(Date.now()).toISOString()}",
          "Status":"Completed",
          "Title":"Du ska ha betalat in",
          "Description":"Debiterad preliminärskatt",
          "CategoryId":"${uuidV4()}",
          "HiddenCategory":false,
          "HiddenDate":false,
          "State":"Completed"
        }
      ]
    }`;
  const [textFieldValue, setTextFieldValue] = useState(initialValue);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Importera"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Kopiera JSON-svaret för ditt bolags "Viktiga datum" från Bokio och
            klistra in i rutan.
          </DialogContentText>

          <TextField
            id="bokio-todos"
            multiline
            variant="outlined"
            rows={10}
            fullWidth
            rowsMax={10}
            value={textFieldValue}
            onChange={(e) => {
              setTextFieldValue(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Avbryt
          </Button>
          <Button
            onClick={() => {
              handleConfirm(textFieldValue);
              setTextFieldValue(initialValue);
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Importera
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
