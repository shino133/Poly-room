import React from "react";
import { TableRow, TableCell } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const TableRowsLoader = ({ rowsNum, columns }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      {[...Array(columns)].map((_, colIndex) => (
        <TableCell key={colIndex} component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableRowsLoader;
