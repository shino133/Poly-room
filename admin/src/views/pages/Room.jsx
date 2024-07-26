import { getRoomData } from "../../Api";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { statusTranslations, roomTypeTranslations } from "../Constants";
import TablePagination from "@mui/material/TablePagination";

export default function Room() {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    getRoomData()
      .then(({ data }) => {
        setRooms(data);
        console.log("rooms", data);
      })
      .catch((error) => {
        console.log("error22222", error);
      });
  }, []);

  const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-blue-950 text-3xl m-4">
        Quản lý phòng
      </h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Mã phòng</TableCell>
              <TableCell>Thể loại phòng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!rooms ? (
              <TableRowsLoader rowsNum={15} />
            ) : (
              rooms.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>
                    {roomTypeTranslations[row.type] || row.type}
                  </TableCell>
                  <TableCell>
                    {statusTranslations[row.status] || row.status}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
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
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
