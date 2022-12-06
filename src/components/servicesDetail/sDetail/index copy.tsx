import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { StyledPaper } from "./styledPaper";
import { handleImageError } from "src/common/utils/handleImageError";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StartBanner = () => {
  const servicesList = [
    {
      title: "Dao Verification",
      image: "images/services/dao.svg",
      content: "",
    },
    {
      title: "Twitter Sales Bot",
      image: "images/services/twitter.svg",
      content: "",
    },
    {
      title: "Promote with us",
      image: "images/services/pramote.svg",
      content: "",
    },
    {
      title: "NFT Website Dev. & Designing",
      image: "images/services/nft_web.svg",
      content: "",
    },
    {
      title: "Mint Website Development",
      image: "images/services/mint_web.svg",
      content: "",
    },
    {
      title: "Airdrop Claims",
      image: "images/services/airdrop.svg",
      content: "",
    },
  ];
  return (
    <>
      <StyledPaper sx={{ bgcolor: "transparent" }}>
        <Container maxWidth="lg">
          <Stack maxWidth="md" mx="15%" alignItems="center" spacing={3} mt={2}>
            <Typography variant="h3" component="div">
              Our Excellent Service
            </Typography>
            <Typography
              variant="body2"
              fontSize={"1.25rem"}
              textAlign="center"
              component="p"
              sx={{ my: 7, mx: "auto" }}
              width={{ md: "90%", xs: "95%" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <Box
              sx={{
                borderRadius: "20px",
                border: "2px solid #3F3F46",
                width: "70%",
                display: "flex",
                justifyContent: "space-evenly",
                py: 3,
              }}
            >
              <Button variant="text">Email Us</Button>
              <Button variant="text">Contact Us</Button>
              <Button variant="text">FAQs</Button>
            </Box>
          </Stack>
          <Box height="20vh"></Box>
          <Grid container spacing={4}>
            {servicesList.map((service) => (
              <Grid item md={4}>
                <Card>
                  <CardActionArea sx={{ p: 4 }}>
                    <Stack alignItems="center" spacing={1}>
                      <img src={service.image} alt="" width="64" />

                      <Typography
                        variant="h5"
                        component="div"
                        align="center"
                        width="70%"
                        minHeight="65px"
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        fontSize={"1.1rem"}
                        align="center"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        ut aliquam, purus sit amet luctus venenatis, lectus
                        magna fringilla urna, porttitor
                      </Typography>
                    </Stack>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledPaper>
    </>
  );
};

export default StartBanner;
