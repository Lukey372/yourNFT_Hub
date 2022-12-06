import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import React, { Fragment } from "react";
import { dropsListSelector, singleDropsSelector } from "src/common/selectors";
import { useSelector } from "react-redux";
import getDate from "src/common/utils/dateFormater";
import { StyledPaper } from "./styledPaper";
import { handleImageError } from "src/common/utils/handleImageError";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Icons
import TwitterIcon from "@mui/icons-material/Twitter";
import { faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { grey } from "@mui/material/colors";
import { RWebShare } from "react-web-share";

//Clamp
import Clamp from "react-multiline-clamp";
import getCryptoSvg from "src/common/utils/getCryptoSvg";
import { useRouter } from "next/router";
import { getSlug } from "src/helper/generateSlug";
import SeoHeader from "src/components/seoHeader";

const DropsDetail = () => {
  const singleDrops = useSelector(singleDropsSelector);

  const isLaunched = () => {
    return singleDrops.type == "launched";
  };

  const router = useRouter();
  return (
    <Fragment>
      <SeoHeader
        title={singleDrops?.title}
        description={singleDrops?.description}
        keywords={singleDrops?.keywords}
        image={singleDrops?.banner ? singleDrops.banner : singleDrops.image}
        date={singleDrops?.created_at}
        website={"http://www.yournfthub.com/"}
        type='drop'
      />
      <StyledPaper sx={{ bgcolor: "primary.main" }}>
        <Grid container direction='row' justifyContent='center' alignItems='center' columnSpacing={2}>
          <Grid item md={1}></Grid>
          <Grid item xs={10}>
            <Grid container direction='row' justifyContent='center' alignItems='flex-end' columnSpacing={2}>
              <Grid item xs={2} md={1}>
                <ThumbUpOutlinedIcon fontSize='large' />
                <Typography variant='caption' component='p' fontFamily='Sen, sans-serif' align='center'>
                  {singleDrops.likes} Likes
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Box sx={{ position: "relative" }}>
                  {singleDrops.is_verified && (
                    <img
                      src='/images/drops_check_tick.svg'
                      alt=''
                      style={{
                        position: "absolute",
                        right: "4%",
                        top: "4%",
                        zIndex: 1,
                      }}
                      width='45px'
                    />
                  )}
                  <Avatar
                    alt='Remy Sharp'
                    src={singleDrops.image}
                    sx={{
                      width: "100%",
                      maxWidth: 160,
                      height: "auto",
                    }}
                    onError={handleImageError}>
                    <img src='https://picsum.photos/200' alt='fallback image' />
                  </Avatar>
                </Box>
              </Grid>
              <Grid item xs={2} md={1}>
                <ThumbDownOutlinedIcon fontSize='large' />
                <Typography variant='caption' component='p' fontFamily='Sen, sans-serif' align='center'>
                  {singleDrops.dislikes} Dislikes
                </Typography>
              </Grid>
            </Grid>

            <Stack maxWidth='md' alignItems='center' spacing={3} mt={2} sx={{ mx: { sm: "15%", xs: "5%" } }}>
              <Typography variant='h3' component='div'>
                {singleDrops.title}&nbsp;
                <img
                  src={getCryptoSvg(singleDrops.crypto_type, true)}
                  alt=''
                  style={{
                    display: "inline-block",
                    verticalAlign: "sub",
                  }}
                />
              </Typography>
              {/* <Box>
              <Button variant="contained">Metaverse</Button>
              <Button variant="contained">Game</Button>
            </Box> */}

              <Grid
                container
                sx={{
                  "& .MuiGrid-item": {
                    bgcolor: "grey.900",
                    p: 2,
                    border: "1px solid black",
                    "&:first-of-type": {
                      borderRadius: { md: "1rem 0 0 1rem" },
                    },
                    "&:last-child": {
                      borderRadius: { md: "0 1rem 1rem 0" },
                    },
                    "& .MuiTypography-root": {
                      textAlign: "center",
                    },
                  },
                }}>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {singleDrops.launch_date === null
                      ? "TBA"
                      : moment.utc(singleDrops.launch_date)
                        .format("MMMM DD, YYYY" + (isLaunched() ? " hh:mm A" : ""))}
                  </Typography>
                  <Typography variant='body2'>{isLaunched() ? " Date Time" : "Date"}</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {isLaunched()
                      ? `${singleDrops.listed_item}/${singleDrops.supply_content}`
                      : singleDrops.launch_date === null
                        ? "TBA"
                        : moment.utc(singleDrops.launch_date)
                          .format("hh:mm A" + " UTC")}
                  </Typography>
                  <Typography variant='body2'>{isLaunched() ? "Listed item/ Total Supply " : "Time"}</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {isLaunched()
                      ? singleDrops.mint_price === "TBA"
                        ? "TBA"
                        : singleDrops.mint_price + " USD"
                      : singleDrops.supply_content}
                  </Typography>
                  <Typography variant='body2'>{isLaunched() ? "Floor Price " : "Total Supply"}</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {isLaunched()
                      ? singleDrops.floor_mc + " USD"
                      : singleDrops.mint_price === "TBA"
                        ? "TBA"
                        : singleDrops.mint_price + " " + singleDrops.crypto_type}
                  </Typography>
                  <Typography variant='body2'>{isLaunched() ? "Floor MC(USD)" : "Mint Price"}</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Typography
              variant='body2'
              fontSize={"1.25rem"}
              textAlign='center'
              component='p'
              sx={{ my: 3, mx: "auto" }}
              width={{ md: "60%", xs: "95%" }}>
              <Clamp withTooltip lines={3}>
                {singleDrops?.description} &nbsp;
              </Clamp>
            </Typography>
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
            mt={"-10%"}
            sx={{
              mt: {
                xs: 3,
              },
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "center",
              }}
              className='icon-box'>
              <IconButton aria-label='link' sx={{ color: grey[600] }} href={singleDrops.website_link} target='_blank'>
                <FontAwesomeIcon icon={faLink} />
              </IconButton>
              <IconButton
                aria-label='delete'
                sx={{ fontSize: { md: "1.2rem" } }}
                href={singleDrops.discord_link}
                target='_blank'>
                <FontAwesomeIcon icon={faDiscord} />
              </IconButton>
              <IconButton aria-label='delete' href={singleDrops.twitter_link} target='_blank'>
                <TwitterIcon />
              </IconButton>
              <RWebShare
                data={{
                  text: "Checkout this Drop at Your NFT Hub",
                  url: singleDrops.website_link,
                  title: singleDrops.title,
                }}>
                <IconButton aria-label='Share Drop'>
                  <FontAwesomeIcon icon={faShare} />
                </IconButton>
              </RWebShare>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Fragment>
  );
};

export default DropsDetail;
