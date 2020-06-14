import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";

interface Props {
  open: boolean;
  handleClose: (arg?: any) => void;
  handleConfirm: (arg: string) => void;
}

export const ImportDialog = (props: Props) => {
  const { handleClose, handleConfirm, open } = props;

  const [bokioId, setBokioId] = useState("");
  const bokioLink =
    "https://app.bokio.se/" +
    bokioId +
    "/Common/ImportantDate?searchTerm=&showHidden=true&showCompleted=true";

  const [textFieldValue, setTextFieldValue] = useState("");

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
            Logga in på Bokio.se och klistra in ditt ID (det som mellan:
            https://app.bokio.se/ och /dashboard i addressfältet) för att skapa
            en länk automatiskt.
            <br />
            <br /> Öppna sedan länken, kopiera innehållet och klistra in det i
            fältet "Bokio data".
            <br />
            <br />
          </DialogContentText>

          <form noValidate autoComplete="off">
            <TextField
              id="bokio-id"
              variant="outlined"
              fullWidth
              value={bokioId}
              label={"Bokio ID"}
              onChange={(e) => {
                setBokioId(e.target.value);
              }}
            />
            <br />
            <br />
            {bokioId.length === 36 ? (
              <a href={bokioLink} target="_blank" rel="noreferrer noopener">
                {bokioLink}
              </a>
            ) : (
              <span>{bokioLink}</span>
            )}

            <br />
            <br />
            <TextField
              id="bokio-todos"
              multiline
              variant="outlined"
              rows={4}
              label={"Bokio data"}
              fullWidth
              rowsMax={4}
              value={textFieldValue}
              onChange={(e) => {
                setTextFieldValue(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Avbryt
          </Button>
          <Button
            onClick={() => {
              handleConfirm(textFieldValue);
              setTextFieldValue("");
              setBokioId("");
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
