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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledPaper } from "./styledPaper";
import { handleImageError } from "src/common/utils/handleImageError";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchServicesStart } from "src/common/slices/services.slice";
import { servicesListSelector } from "src/common/selectors";
import Link from "next/link";

const StartBanner = () => {
  const dispatch = useDispatch();

  // const servicesList = useSelector(servicesListSelector);
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

  React.useEffect(() => {
    dispatch(fetchServicesStart());
  }, []);

  return (
    <>
      <StyledPaper sx={{ bgcolor: "transparent" }}>
        <Container maxWidth="lg">
          <Stack
            maxWidth="md"
            alignItems="center"
            spacing={3}
            mt={2}
            sx={{
              mx: {
                sm: "15%",
              },
            }}
          >
            <Typography variant="h3" component="div">
              Your NFT Hub Services
            </Typography>
            <Typography
              variant="body2"
              fontSize={"1.25rem"}
              textAlign="center"
              component="p"
              sx={{ my: 7, mx: "auto" }}
              width={{ md: "90%", xs: "95%" }}
            >
              Your NFT Hub Services is a place where you can avail all the
              services required to build and maintain the NFT Project on Solana
              blockchain With a strong & reliable team of developers, awesome
              customer support and a quick turnaround time. You don’t have to
              worry about anything related to your NFT Project, we will take
              care of it.
            </Typography>
            <Box
              sx={{
                borderRadius: "20px",
                border: "2px solid #3F3F46",
                width: "70%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                py: 3,
              }}
            >
              <Button
                variant="text"
                href={process.env.NEXT_PUBLIC_EMAIL_US}
                target="_blank"
              >
                Email Us
              </Button>
              <Button
                variant="text"
                href={process.env.NEXT_PUBLIC_SEND_DM}
              >
                Contact Us
              </Button>
              <Button variant="text" href={""} target="_blank">
                FAQs
              </Button>
            </Box>
          </Stack>
          <Box height="20vh"></Box>
          <Grid container spacing={4}>
            {servicesList?.map((service) => (
              <Grid item md={4} key={service.id}>
                <Link href={"services/" + service.id}>
                  <Card>
                    <CardActionArea sx={{ p: 4 }}>
                      <Stack alignItems="center" spacing={1}>
                        <img src={service.icon} alt="" height="64" />

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
                          {service.short_description}
                        </Typography>
                      </Stack>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledPaper>
    </>
  );
};

export default StartBanner;
