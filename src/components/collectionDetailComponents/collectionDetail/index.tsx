import React, { Fragment } from "react";

import { useSelector } from "react-redux";

import Clamp from "react-multiline-clamp";

import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { grey } from "@mui/material/colors";

import TwitterIcon from "@mui/icons-material/Twitter";

import { RWebShare } from "react-web-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

import { serverUrl } from "src/common/config";
import SeoHeader from "src/components/seoHeader";
import { handleImageError } from "src/common/utils/handleImageError";

import { StyledPaper } from "./styledPaper";

const CollectionDetail = ({ data, owners, supply, totalVolume, floorPrice }: any) => {
  // let { data, owners, supply, price, floorPrice } = props;
  const [isshow, setShow] = React.useState(false)
  const router = useRouter();
  const theme = createTheme()
  return (
    <Fragment>
      <SeoHeader
        title={data?.name}
        description={data?.description}
        keywords={data?.keywords}
        image={data?.baseImage}
        date={data?.created_at}
        website={"http://www.yournfthub.com/"}
        type='collection'
      />
      <StyledPaper sx={{ bgcolor: "primary.main" }}>
        <Grid container direction='row' justifyContent='center' alignItems='center' columnSpacing={2}>
          <Grid item md={1}></Grid>
          <Grid item xs={10}>
            <Grid container direction='row' justifyContent='center' alignItems='flex-end' columnSpacing={2}>
              <Grid item xs={2} md={1}>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Box sx={{ position: "relative" }}>
                  {/* {true && ( // Missing
                    <Box
                      component={`img`}
                      src='/images/drops_check_tick.svg'
                      alt=''
                      style={{
                        position: "absolute",
                        right: "4%",
                        bottom: "4%",
                        zIndex: 1,
                      }}
                      width='45px'
                    />
                  )} */}
                  <Avatar
                    alt='Collection Image'
                    sx={{
                      width: {
                        lg: `156px`,
                        xs: `144px`
                      },
                      height: {
                        lg: `156px`,
                        xs: `144px`
                      },
                    }}
                  >
                    <Box
                      component={`img`}
                      sx={{ height: `100%`, objectFit: `cover` }}
                      src={`${serverUrl}${data?.baseImage}`}
                      alt='fallback image'
                      onError={handleImageError}
                    />
                  </Avatar>
                </Box>
              </Grid>
              <Grid item xs={2} md={1}>
              </Grid>
            </Grid>

            <Stack maxWidth='md' alignItems='center' spacing={3} mt={2} sx={{ mx: { sm: "12%", xs: "3%" } }}>
              <Typography variant='h3' component='div'>
                {data?.name}
              </Typography>

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
                  <Typography variant='h5' component="p">
                    {owners}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Owners</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {supply}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Supply</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5' sx={{
                    display: `flex`,
                    justifyContent: `center`
                  }} >
                    {totalVolume}
                    <Box
                      component={`img`}
                      src={`/images/solana.svg`}
                      alt="SOLANA ICON"
                      width="20"
                      sx={{
                        ml: 0.5
                      }}
                    />
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Total Volume   </Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5' sx={{
                    display: `flex`,
                    justifyContent: `center`
                  }} >
                    {floorPrice}
                    <Box
                      component={`img`}
                      src={`/images/solana.svg`}
                      alt="SOLANA ICON"
                      width="20"
                      sx={{
                        ml: 0.5
                      }}
                    />
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Floor Price</Typography>
                </Grid>
              </Grid>
            </Stack>

            <Typography
              variant='body2'
              fontSize={"1.25rem"}
              textAlign='center'
              component='p'
              sx={{ my: 3, mx: "auto" }}
              width={{ md: "76%", xs: "95%" }}>
              {/* <Clamp withTooltip lines={3}>
                {data?.description}
              </Clamp> */}
              {data?.description}
            </Typography>
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
            sx={{
              mt: {
                md: `-10%`,
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
              <IconButton aria-label='link' sx={{ color: grey[600] }} href={data?.websiteLink} target='_blank'>
                <FontAwesomeIcon icon={faLink} />
              </IconButton>
              <IconButton
                aria-label='delete'
                sx={{ fontSize: { md: "1.2rem" } }}
                href={data?.discordLink}
                target='_blank'>
                <FontAwesomeIcon icon={faDiscord} />
              </IconButton>
              <IconButton aria-label='delete' href={data?.twitterLink} target='_blank'>
                <TwitterIcon />
              </IconButton>
              <RWebShare
                data={{
                  text: "Checkout this Drop at Your NFT Hub",
                  url: data?.websiteLink,
                  title: data?.name,
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

export default CollectionDetail;
