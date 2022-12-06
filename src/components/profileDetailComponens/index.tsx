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

const ProfileDetail = (props: { data: any; }) => {
  const singleDrops = useSelector(singleDropsSelector);
  let { data } = props;
  if (data) {

  }

  const isLaunched = () => {
    return singleDrops.type == "launched";
  };

  const getGCD = (x: number, y: number) => {
    try {
      if (x == 0 || y == 0) {
        return 1;
      }
      x = Math.abs(x);
      y = Math.abs(y);
      while (y) {
        let t = y;
        y = x % y;
        x = t;
      }
      console.log(`x`, x)
      return x < 1 ? 1 : x;
    }
    catch {
      return 1;
    }
  }

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
          <Grid item md={12}>
            <Stack maxWidth='lg' alignItems='center' spacing={3} mt={2} sx={{ mx: { sm: "12%", xs: "3%" } }}>
              <Grid
                container
                sx={{
                  "& .MuiGrid-item": {
                    bgcolor: "grey.900",
                    p: 2,
                    border: "1px solid black",
                    "&:first-of-type": {
                      borderRadius: { md: "1rem 0 0 0" },
                    },
                    "&:nth-of-type(4)": {
                      borderRadius: { md: "0 1rem 0 0" },
                    },
                    "&:nth-of-type(5)": {
                      borderRadius: { md: "0 0 0 1rem" },
                    },
                    "&:last-child": {
                      borderRadius: { md: "0 0 1rem 0" },
                    },
                    "& .MuiTypography-root": {
                      textAlign: "center",
                    },
                  },
                }}>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5' component="p" sx={{
                    display: `flex`,
                    justifyContent: `center`
                  }}>
                    {data?.minWallet || 0} <Box
                      component={`img`}
                      src={`/images/solana.svg`}
                      alt="SOLANA ICON"
                      width="20"
                      sx={{
                        ml: 0.5
                      }} />
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Min Wallet value  </Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {data?.owned || 0}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Owned NFTs</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {data?.listed || 0}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Listed NFTs</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5' sx={{
                    display: `flex`,
                    justifyContent: `center`
                  }} >
                    {data?.amountTraded?.toFixed(2) || 0}
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
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Amount Traded</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5' component="p">
                    {data?.offerReceived || 0}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Offer Received</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {data?.offerPlaced || 0}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Offer Placed</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {
                      !(data?.purchased / getGCD(data?.sold, data?.purchased)) ? 0 :
                        (data?.purchased / getGCD(data.sold, data?.purchased))
                    }
                    :
                    {
                      !(data?.sold / getGCD(data.sold, data.purchased)) ? 0 :
                        (data?.sold / getGCD(data.sold, data.purchased))
                    }
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Ratio Purchase/Sell</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Typography variant='h5'>
                    {data?.messageReceived || 0}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: `1.1rem` }}>Message Received</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </StyledPaper>
    </Fragment>
  );
};

export default ProfileDetail;
