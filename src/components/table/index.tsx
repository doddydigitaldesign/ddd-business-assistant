import { Checkbox } from "@material-ui/core";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import MuiTableRow from "@material-ui/core/TableRow";
import React from "react";
import { TableHeader, TableRow } from "./types";

interface Props {
  rows: TableRow[] | null;
  headers: TableHeader;
  handleCheck: (e: TableRow[]) => void;
}

export const Table = (props: Props) => {
  return (
    <React.Fragment>
      <MuiTable size="small">
        <TableHead>
          <MuiTableRow>
            {props.headers &&
              props.headers.map((header) => <TableCell>{header}</TableCell>)}
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {props.rows &&
            props.rows.map((row, i) => (
              <MuiTableRow key={row.id}>
                <TableCell>
                  {new Intl.DateTimeFormat("sv-SE").format(new Date(row.date))}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={row.done}
                    onChange={(e, checked) => {
                      const updatedRows = props.rows ? [...props.rows] : [];
                      updatedRows[i].done = checked;
                      props.handleCheck(updatedRows);
                    }}
                  />
                </TableCell>
              </MuiTableRow>
            ))}
        </TableBody>
      </MuiTable>
    </React.Fragment>
  );
};
