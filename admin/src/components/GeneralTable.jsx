import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import TableRowsLoader from "./TableRowsLoader";

const GeneralTable = ({
  headers,
  data,
  handleEditRow,
  handleClickOpen,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  labelRowsPerPage,
  tableRowsLoaderRows,
  tableRowsLoaderColumns,
  paginationTotalCount,
  roomTypeTranslations = {},
  statusTranslations = {},
  defineRole = {},
  defineStatus = {},
  loading = false,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers
                .filter((header) => header !== "index")
                .map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data || loading ? (
              <TableRowsLoader
                rowsNum={tableRowsLoaderRows}
                columns={tableRowsLoaderColumns}
              />
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(row).map((key, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {key === "type"
                        ? roomTypeTranslations[row[key]] || row[key]
                        : key === "status"
                        ? statusTranslations[row[key]] ||
                          defineStatus[row[key]] ||
                          row[key]
                        : key === "role"
                        ? defineRole[row[key]] || row[key]
                        : row[key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => handleEditRow(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleClickOpen(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={paginationTotalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={labelRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          return "" + from + "-" + to + " của " + count;
        }}
      />
    </>
  );
};

export default GeneralTable;
