import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import React from "react";
import { convertToIcal } from "../../util/convertToIcal";
import { CallToAction } from "../callToAction";
import { ExportDialog } from "../exportDialog";
import { Footer } from "../footer";
import { ImportDialog } from "../importDialog";
import { ImportedJson } from "../importDialog/types";
import { Table } from "../table";
import { TableRow } from "../table/types";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

export const Layout = () => {
  const classes = useStyles();

  const [data, setData] = React.useState<TableRow[] | null>(null);

  const handleCheck = (e: TableRow[]) => {
    setData(e);
  };

  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [importDialogOpen, setImportDialogOpen] = React.useState(false);

  const handleClickExport = () => {
    setExportDialogOpen(true);
  };

  const handleClickImport = () => {
    setImportDialogOpen(true);
  };

  const handleClose = () => {
    setExportDialogOpen(false);
    setImportDialogOpen(false);
  };

  const handleConfirmExport = () => {
    if (data) {
      const formatted = convertToIcal(data);
      const file = new File([formatted], "export.csv", { type: "utf8" });
      const el = document.createElement("a");
      el.href = URL.createObjectURL(file);
      el.download = file.name;
      el.click();
      URL.revokeObjectURL(el.href);
    }
  };

  const handleConfirmImport = (e: string): void => {
    const json: ImportedJson = JSON.parse(e);
    const jsonToTableRows = json.Data.map((entry) => {
      const tableRow: TableRow = {
        date: entry.Date,
        done: entry.Status === "Completed",
        id: entry.Id,
        title: entry.Title + ": " + entry.Description,
      };
      return tableRow;
    });
    setData(jsonToTableRows);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Business Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <CallToAction
              mainButton={
                <Button
                  onClick={handleClickExport}
                  variant="contained"
                  color="primary"
                >
                  Exportera
                </Button>
              }
              secondaryButton={
                <Button
                  onClick={handleClickImport}
                  variant="outlined"
                  color="primary"
                >
                  Importera
                </Button>
              }
              primaryText={<>Att göra</>}
              secondaryText={
                <>
                  Börja med att importera listan för ditt företag från Bokio.se.
                  <br />
                  <br />
                  Arbeta dig ned genom listan och bocka av raderna. När du
                  känner dig klar för dagen så kan du exportera listan till en
                  fil som du sedan kan importera till din kalender för att få
                  påminnelser när datumen börjar närma sig.
                </>
              }
            />
          </Container>
          <Table
            handleCheck={handleCheck}
            headers={["Datum", "Titel", "Klar"]}
            rows={data}
          />
        </div>
      </main>
      <Footer />
      <ExportDialog
        open={exportDialogOpen}
        handleConfirm={handleConfirmExport}
        handleClose={handleClose}
      />
      <ImportDialog
        handleClose={handleClose}
        handleConfirm={handleConfirmImport}
        open={importDialogOpen}
      />
    </React.Fragment>
  );
};
