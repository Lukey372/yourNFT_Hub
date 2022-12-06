import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { Fragment } from "react";
import ButtonTransparent from "src/theme/buttonTransparent";
import ButtonWhite from "src/theme/buttonWhite";
import Link from "next/link";

import { getSlug } from "src/helper/generateSlug";
import { handleImageError } from "src/common/utils/handleImageError";

//Clamp
import Clamp from "react-multiline-clamp";

const LatestItem = ({ news, asSidebar }) => {
  return (
    <>
      <CardActionArea>
        <Link href={`/news/${news.id}/${getSlug(news.title)}`} passHref>
          <Grid container spacing={1} justifyContent='center' sx={{ my: 0 }}>
            <Grid item md={3}>
              <Paper //Should had used box instead of paper
                sx={{
                  overflow: "hidden",
                  bgcolor: "inherit",
                  img: {
                    width: { md: "60px", sm: "70%" },
                    height: { md: "60px" },
                    objectFit: "cover",
                    mx: "auto",
                  },
                }}>
                <img
                  // width={"60px"}
                  // height={"60px"}
                  src={news.image}
                  onError={handleImageError}
                />
              </Paper>
            </Grid>
            <Grid item md={9}>
              <Paper
                sx={{
                  bgcolor: "inherit",
                }} /*Should had used box instead of paper*/
              >
                <Typography variant='body1'>
                  <Clamp withTooltip lines={2}>
                    {news.title}
                  </Clamp>
                </Typography>

                {/* <ButtonTransparent
                  sx={{
                    textTransform: "capitalize",
                    mt: 1,
                    fontSize: ".7rem",
                    px: 1,
                    "&:hover": {
                      backgroundColor: "#1e1e1e",
                    },
                  }}
                >
                  read more {"  "}
                  <ArrowForwardIcon sx={{ ml: 2, fontSize: "1.1rem" }} />
                </ButtonTransparent> */}
              </Paper>
            </Grid>
          </Grid>
        </Link>
      </CardActionArea>
    </>
  );
};

export default LatestItem;
