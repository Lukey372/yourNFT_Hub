import { Paper, Container, Typography, Stack, Grid } from "@mui/material";
import React, { Fragment } from "react";
import ButtonTransparent from "src/theme/buttonTransparent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { getSlug } from "src/helper/generateSlug";

const BigWrapper = ({ headNews, children }) => {
  if (!headNews) return <></>; //fallback code
  return (
    <Fragment>
      <Grid container spacing={3} sx={{ minHeight: "500px" }}>
        <Grid item md={6} xs={12}>
          <Paper
            sx={{
              backgroundImage: `url(${headNews?.image}), url('https://picsum.photos/800/600')`,
              backgroundSize: "cover",
              borderRadius: "20px",
              height: "100%",
            }}>
            <div
              style={{
                height: "inherit",
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 79.59%)",
              }}>
              <Stack
                sx={{
                  p: 5,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  height: "inherit",
                }}>
                <Typography variant='h4'>{headNews?.title}</Typography>
                {/* <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        NFTs are much easier to understand than most people
                        think. This guide aims to demystify NFTs and give you a
                        basic understanding of what they are, what they do, and
                        most importantly, why they matter.
                      </Typography> */}
                <Link
                  href={`/news/[newsId]/[newsSlug]`}
                  as={`/news/${headNews?.id}/${getSlug(headNews?.title)}`}
                  passHref>
                  <ButtonTransparent
                    sx={{
                      textTransform: "capitalize",
                      mt: 1.5,
                      fontSize: "1rem",
                      px: 4,
                      py: 2,
                      border: "1px solid white",
                    }}>
                    read more
                    <ArrowForwardIcon sx={{ ml: 0.5, fontSize: "1.1rem" }} />
                  </ButtonTransparent>
                </Link>
              </Stack>
            </div>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default BigWrapper;
