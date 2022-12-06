import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton, SvgIcon, Typography, Box } from "@mui/material";

import Linkm from "@mui/material/Link";

import Link from "next/link";
import { useSelector } from "react-redux";
import { dropsListSelector, dropsPaginationSelector } from "src/common/selectors";
import Image from "next/image";

import DiscordIcon from "public/images/discord.svg";
import LinkIcon from "public/images/link.svg";
import TwitterIcon from "public/images/twitter.svg";
import StyleTable from "./styles/styledTable";
import moment from "moment";

import TextLogo from "src/theme/textLogo";
import { handleImageError } from "src/common/utils/handleImageError";
import getCryptoSvg from "src/common/utils/getCryptoSvg";
import { Fragment } from "react";
import { getSlug } from "../../helper/generateSlug";

export default function DropTable() {

  return (
    <TableContainer component={"div"} sx={{ pb: 5, marginTop: `3%`, width: `96%`, marginLeft: `auto`, marginRight: `auto` }}>
      <StyleTable aria-label='Drops List'>
        <TableBody>
          {
            new Array(37).fill(null).map((x, index) => {
              return (
                <Fragment key={index}>
                  {index == 0 && (
                    <TableRow
                      sx={{
                        "& th": { color: "text.secondary", fontSize: "10" },
                        "& td": {
                          fontSize: theme => theme.typography.h5.fontSize,
                          color: "text.secondary",
                        },
                      }}>
                      <TableCell align='left' variant='head'>NFTs</TableCell>
                      <TableCell align='left' variant='head'>
                        Type
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        Price
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        From
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        To
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        Placed
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow
                    key={index}
                    sx={{
                      // "&:last-child td, &:last-child th": { border: 0 },
                      "& td": {
                        color: "text.secondary",
                        fontSize: theme => theme.typography.h5.fontSize,
                      },
                    }}>
                    <TableCell align='center' component='td' className='trstart'>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            alt='Remy Sharp'
                            src={``}
                            sx={{ width: 80, height: 80, border: 2 }}
                            imgProps={{ onError: handleImageError }}>
                            <img src='https://miro.medium.com/max/1400/1*KEvDO3KjbB4PkdJt5BjGmw.png' alt='fallback image' />
                          </Avatar>
                        </Box>
                        <Link
                          href={`/`}
                          as={`/`}
                          passHref>
                          <Linkm href='#'>
                            <Typography variant='h5' textAlign='center' color='text.primary' pl={3}>
                              Degen Ape #6739
                            </Typography>
                          </Linkm>
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align='left'>
                      Sale
                    </TableCell>
                    <TableCell align='left'>
                      55.5555
                    </TableCell>
                    <TableCell align='left'>8XPe...HUaV</TableCell>
                    <TableCell align='left'>7GhM...ud4z</TableCell>
                    <TableCell align='left' className='trend' sx={{ whiteSpace: "nowrap" }}>
                      6 hours ago
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
        </TableBody>
      </StyleTable>
    </TableContainer>
  );
}