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

function createData(name, size, price, date, image) {
  return { name, size, price, date, image };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, "https://picsum.photos/100/100"),
  createData("Ice cream sandwich", 237, 9.0, 37, "https://picsum.photos/50/50"),
  createData("Eclair", 262, 16.0, 24, "https://picsum.photos/50/50"),
  createData("Cupcake", 305, 3.7, 67, "https://picsum.photos/50/50"),
  createData("Gingerbread", 356, 16.0, 49, "https://picsum.photos/50/50"),
];

const dateFunctn = rawdate => {
  const date = new Date(rawdate);

  const options = { day: "numeric", month: "long" };

  return date.toLocaleString("en-us", options);
};

// reducer function for adding list to end of droplist
const getReducer = obj => {
  const obj2 = { ...obj };
  const reducer = (x, y) => {
    if (y == "count") return x;
    if (x.hasOwnProperty(y)) {
      x[y] = [...x[y], ...obj2[y]];
      return x;
    } else {
      /*  {...x, [y]: obj2[y]} */
      x[y] = obj2[y];
      return x;
    }
  };
  return reducer;
};

export default function DropTable() {
  const [dropsList, setdropsList] = React.useState({});
  const dropsListraw = useSelector(dropsListSelector);
  const pagination = useSelector(dropsPaginationSelector);
  // dropsList = dropsList.concat(
  //   dropsListraw.filter((item) => dropsList.indexOf(item) < 0)
  // );
  // dropsList = { ...dropsList, ...dropsListraw };

  React.useEffect(() => {
    if (pagination.page_num < 2) {
      setdropsList(dropsListraw || {});
      return;
    } else {
      const temp = Object.keys(dropsListraw).reduce(getReducer(dropsListraw), {
        ...dropsList,
      });
      setdropsList(temp);
    }
  }, [dropsListraw]);

  const print = x => {

  };


  return (
    <TableContainer component={"div"} sx={{ pb: 5 }}>
      <StyleTable aria-label='Drops List' sx={{ maxWidth: "xl", mx: "auto" }}>
        <TableBody>
          {Object.keys(dropsList)
            // .sort() // slice used to remove last element ie count
            .map((x, index) => {
              if (!dropsList[x].length) return; //just to remove count key.
              return (
                <Fragment key={x}>
                  <TableRow>
                    <TableCell align='center' component='td' colSpan={6} variant='head'>
                      <Typography variant='h5' textAlign='center' color='grey.500'>
                        {x === 'tba' ? 'TBA' : dateFunctn(x)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {index == 0 && (
                    <TableRow
                      sx={{
                        "& th": { color: "text.secondary", fontSize: "10" },
                        "& td": {
                          fontSize: theme => theme.typography.h5.fontSize,
                          color: "text.secondary",
                        },
                      }}>
                      <TableCell align='left' variant='head'>Project</TableCell>
                      <TableCell align='left' variant='head'>
                        Links
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        Time
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        Count
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        Price
                      </TableCell>
                      <TableCell align='left' variant='head'>
                        YNH Score
                      </TableCell>
                    </TableRow>
                  )}

                  {dropsList[x].map?.(row => (
                    <TableRow
                      key={row.id}
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
                            {row.is_verified && (
                              <img
                                src='/images/drops_check_tick.svg'
                                alt=''
                                style={{
                                  position: "absolute",
                                  right: "2%",
                                  top: "2%",
                                  zIndex: 1,
                                }}
                                width='18px'
                              />
                            )}
                            <Avatar
                              alt='Remy Sharp'
                              src={row.image}
                              sx={{ width: 80, height: 80, border: 2 }}
                              imgProps={{ onError: handleImageError }}>
                              <img src='https://picsum.photos/200' alt='fallback image' />
                            </Avatar>
                          </Box>
                          <Link
                            href={`drops/[dropsId]/[dropSlug]`}
                            as={`drops/${row.id}/${getSlug(row.title)}`}
                            passHref>
                            <Linkm href='#'>
                              <Typography variant='h5' textAlign='center' color='text.primary' pl={3}>
                                {row.title} &nbsp;
                                <img
                                  src={getCryptoSvg(row.crypto_type, false)}
                                  alt=''
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "sub",
                                  }}
                                />
                              </Typography>
                            </Linkm>
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>
                        {/* Conditional social links  */}
                        {row.twitter_link && (
                          <IconButton aria-label='discord' href={row.twitter_link} target='_blank'>
                            <Image src={TwitterIcon} alt='' width={24} />
                          </IconButton>
                        )}
                        {row.discord_link && (
                          <IconButton aria-label='discord' href={row.discord_link} target='_blank'>
                            <Image src={DiscordIcon} alt='' width={24} />
                          </IconButton>
                        )}
                        {row.website_link && (
                          <IconButton aria-label='discord' href={row.website_link} target='_blank'>
                            <Image src={LinkIcon} alt='' width={26} />
                          </IconButton>
                        )}
                        {/* Conditional social links ends */}
                      </TableCell>
                      <TableCell align='left'>
                        {row.launch_date === null ? "TBA" : `${moment.utc(row.launch_date).format("hh:mm A")} UTC`}
                        {print(row.launch_date)}
                      </TableCell>
                      <TableCell align='left'>{row.supply_content}</TableCell>
                      <TableCell align='left'>{row.mint_price + " " + row.crypto_type}</TableCell>
                      <TableCell align='left' className='trend' sx={{ whiteSpace: "nowrap" }}>
                        <TextLogo fontSize='small' sx={{ mr: 1, verticalAlign: "text-top" }} mr={1} />
                        {row.overall_score}
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              );
            })}
        </TableBody>
      </StyleTable>
    </TableContainer>
  );
}