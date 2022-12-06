import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Typography } from "@mui/material";

function createData(name, size, price, date, img) {
  return { name, size, price, date, img };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, "https://picsum.photos/100/100"),
  createData("Ice cream sandwich", 237, 9.0, 37, "https://picsum.photos/50/50"),
  createData("Eclair", 262, 16.0, 24, "https://picsum.photos/50/50"),
  createData("Cupcake", 305, 3.7, 67, "https://picsum.photos/50/50"),
  createData("Gingerbread", 356, 16.0, 49, "https://picsum.photos/50/50"),
];

export default function DropTable() {
  return (
    <TableContainer component={"div"} sx={{ pb: 5 }}>
      <Table aria-label="simple table" sx={{ maxWidth: "md", mx: "auto" }}>
        <TableHead>
          <TableRow sx={{ "& th": { color: "white", fontSize: "10" } }}>
            <TableCell>Project</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  alt="Remy Sharp"
                  src={row.img}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell align="left">
                <Typography variant="h5" textAlign="center">
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell align="left">{row.size}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
