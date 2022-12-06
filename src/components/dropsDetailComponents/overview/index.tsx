import { Grid, Paper, Typography, Container, Tooltip, Box } from "@mui/material";
import { singleDropsSelector } from "src/common/selectors";
import React from "react";
import { useSelector } from "react-redux";
import StyledGradPaper from "./gradPaper";
import { grey } from "@mui/material/colors";
import CustomToolTip from "./customToolTip";
import parse from "html-react-parser";
import MeterSvg from "src/theme/meter";
import { getColor, getDeg } from "./utils";

const Overview = () => {
  const singleDrops = useSelector(singleDropsSelector);

  const fieldList = [
    {
      title: "Roadmap Score",
      value: singleDrops.roadmap_score,
      tooltip:
        "Based on how unique and strong the roadmap is from the other drops. Discord Members: Based on discord size, support and activity on their discord.",
    },
    {
      title: "Discord Score",
      value: singleDrops.discord_member,
      tooltip: "Based on discord activity, active discord users and its size.",
    },
    {
      title: " Twitter Score",
      value: singleDrops.twitter_followers,
      tooltip: "Based on legit interaction, engagement and its size.",
    },
    {
      title: "Team Score",
      value: singleDrops.team_score,
      tooltip: "If Doxxed, Based on the team’s background, experience, and ability to pull off on the roadmap. ",
    },
    {
      title: "Popularity Score",
      value: singleDrops.popularity_score,
      tooltip:
        "Based on how popular the project is among members, influencers and compared to other projects launching along with it.",
    },
    {
      title: "Flip Score",
      value: singleDrops.flip_score,
      tooltip: "Based on how likely it is to make profit when you want to instantly sell it post launch.",
    },
    {
      title: "Hodl Score",
      value: singleDrops.hodl_score,
      tooltip:
        "Based on the long term plans of the project, team dedication towards completing it and competency to complete it.",
    },
    {
      title: "Community Score",
      value: singleDrops.community_score,
      tooltip: "Based on how strong of a community they have built.",
    },
  ];

  return (
    <StyledGradPaper sx={{ bgcolor: "transparent" }}>
      <Container maxWidth='lg'>
        <Typography variant='h3' textAlign='center' component='div' sx={{ my: 7 }}>
          Overview
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            "& .MuiPaper-root": {
              border: "2px solid #3F3F46",
              bgcolor: "black",
              p: 2,
            },
          }}>
          <Grid item md={3} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <Typography variant='body2' align='center' fontSize={"1.25rem"}>
              YNH Overall Score
            </Typography>
            <Typography variant='h3' gutterBottom align='center' className='ovScore'>
              {singleDrops.overall_score}/100
            </Typography>
            <Tooltip
              title={
                <Box sx={{}}>
                  <Typography variant='body2' fontSize={".8rem"} color='text.secondary'>
                    Based on the average of all the scores and YNH team conclusion about the drop.
                  </Typography>
                </Box>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: grey[800],
                    maxWidth: "200px",
                    p: 2,
                  },
                },
                arrow: {
                  sx: {
                    color: grey[800],
                  },
                },
              }}
              placement='right'
              arrow>
              <div style={{ width: "100%" }}>
                <MeterSvg color={getColor(singleDrops.overall_score)} rotation={getDeg(singleDrops.overall_score)} />
              </div>

              {/* <img src="/images/meter.svg" alt="" style={{ width: "100%" }} /> */}
            </Tooltip>
            {/* <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                YNH Overall Score
              </Typography>
              <Typography variant="h4">{singleDrops.overall_score}</Typography>
            </Paper> */}
          </Grid>
          <Grid item md={3} xs={12}></Grid>
          {fieldList?.map(field => (
            <Grid item md={3} xs={12} key={field.title}>
              <CustomToolTip
                title={
                  <Typography variant='body2' fontSize={".8rem"} color='text.secondary'>
                    {field.tooltip}
                  </Typography>
                }>
                <Paper>
                  <Typography variant='body2' fontSize={"1.25rem"}>
                    {field.title}
                  </Typography>
                  <Typography variant='h4'>{field.value}</Typography>
                </Paper>
              </CustomToolTip>
            </Grid>
          ))}
        </Grid>
        <Typography variant='h3' textAlign='center' component='div' sx={{ my: 3, mt: 12 }}>
          Our Take
        </Typography>
        <Typography
          variant='body1'
          textAlign='center'
          paragraph
          component='div'
          color='text.secondary'
          sx={{ mx: "auto" }}
          width={{ md: "55%", xs: "95%" }}>
          {parse(singleDrops?.our_take_description || "")}
        </Typography>
      </Container>
    </StyledGradPaper>
  );
};

export default Overview;

//old grid code
{
  /* <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Roadmap Score
              </Typography>
              <Typography variant="h4">{singleDrops.roadmap_score}</Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Discord member
              </Typography>
              <Typography variant="h4">{singleDrops.discord_member}</Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Twitter Followers
              </Typography>
              <Typography variant="h4">
                {singleDrops.twitter_followers}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Team Score
              </Typography>
              <Typography variant="h4">{singleDrops.team_score}</Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Popularity Score
              </Typography>
              <Typography variant="h4">
                {singleDrops.popularity_score}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Flip Score
              </Typography>
              <Typography variant="h4">{singleDrops.flip_score}</Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Hodl Score
              </Typography>
              <Typography variant="h4">{singleDrops.hodl_score}</Typography>
            </Paper>
          </Grid>
          <Grid item md={3} xs={12}>
            <Paper>
              <Typography variant="body2" fontSize={"1.25rem"}>
                Community Score
              </Typography>
              <Typography variant="h4">
                {singleDrops.community_score}
              </Typography>
            </Paper>
          </Grid> */
}
