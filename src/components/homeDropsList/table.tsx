import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Typography } from "@mui/material";

import { dropsListSelector } from "src/common/selectors";
import { useSelector } from "react-redux";
import TextLogo from "src/theme/textLogo";

import { getSlug } from "../../helper/generateSlug";
import Linkm from "@mui/material/Link";
import Link from "next/link";
import moment from "moment";

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
  const dropsList = useSelector(dropsListSelector)?.rows;
  return (
    <TableContainer component={"div"} sx={{ pb: 5 }}>
      <Table
        aria-label='simple table'
        sx={{
          maxWidth: "md",
          mx: "auto",
          minWidth: "70%",
          borderCollapse: "separate",
          borderSpacing: "0 2rem",
        }}>
        <TableHead>
          <TableRow
            sx={{
              border: 0,
              "& th": { color: "text.secondary", fontSize: "10" },
              "& td": { fontSize: "1.2 rem", color: "text.secondary" },
              "& td, & th": { border: 0 },
            }}>
            <TableCell>Project</TableCell>
            <TableCell align='left'>Size</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='left'>Date</TableCell>
            <TableCell align='left'>YNH Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            " .MuiTableCell-root": { borderBottom: "2px solid #27272a" },
          }}>
          {dropsList?.map((row, index) => {
            if (index > 10) return;
            return (
              <TableRow
                key={row.id}
                sx={{
                  borderBottom: 1,
                  // "& td, & th": { border: 0 },
                  "& td, th": {
                    fontSize: "1.2rem",
                    color: "text.secondary",
                    p: "20px",
                  },
                  "&:last-child": { border: 0 },
                  boxShadow: "inset 0px -3px 0px #71717a",
                  borderRadius: "8px",
                  "&:hover": {
                    boxShadow: "0px 0px 64px -30px #FFFFFF",
                  },
                }}>
                <TableCell component='th' scope='row' sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ position: "relative" }}>
                    {/* <img
                      src="/images/drops_check_tick.svg"
                      alt=""
                      style={{
                        position: "absolute",
                        right: "4%",
                        top: "4%",
                        zIndex: 1,
                      }}
                      width="45px"
                    /> */}
                    <Avatar alt='Remy Sharp' src={row.image} sx={{ width: 80, height: 80, border: 2 }}>
                      <img src='https://picsum.photos/200' alt='fallback image' />
                    </Avatar>
                  </Box>
                  <Link href={`drops/[dropsId]/[dropSlug]`} as={`drops/${row.id}/${getSlug(row.title)}`} passHref>
                    <Linkm href='#'>
                      <Typography variant='h5' textAlign='center' color='text.primary' pl={3}>
                        {row.title}
                      </Typography>
                    </Linkm>
                  </Link>
                </TableCell>
                <TableCell align='left'>{row.supply_content}</TableCell>
                <TableCell align='left'>{row.mint_price + " " + row.crypto_type} </TableCell>
                <TableCell align='left'>
                  {row.launch_date === null ? "TBA" : moment(row.launch_date).format("MMMM DD, YYYY")}
                </TableCell>
                <TableCell align='left' sx={{ whiteSpace: "nowrap" }}>
                  <TextLogo fontSize='small' sx={{ verticalAlign: "text-top", mr: 1 }} mr={1} />
                  {row.overall_score}
                </TableCell>
              </TableRow>
            );
          })}
          {!dropsList?.length && (
            <TableRow>
              <TableCell>
                <Typography variant='body1' textAlign='center' color='text.primary' component='p' pl={3}>
                  No records found
                </Typography>
              </TableCell>
              /
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
