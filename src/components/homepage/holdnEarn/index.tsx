import { Box, Stack, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import ButtonWhite from "src/theme/buttonWhite";

const HoldNEarn = () => {
  return (
    <>
      <StyledBox
        sx={{
          height: {
            xs: "60vh",
            md: "50vh",
          },
          backgroundPosition: { xs: "left", md: "center" },
        }}
      >
        <Container sx={{ height: "100%" }}>
          <Stack alignItems={"center"} justifyContent="center" height="inherit">
            <Typography variant="h3" textAlign="center" gutterBottom>
              HOLD & EARN 25% PROFIT
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              gutterBottom
              width={{ md: "45%" }}
              fontSize={"1.25rem"}
            >
              Earn 25% profit sharing of Your NFT Hub by owning Nova Nerds &
              Waifu Nerds NFT for next 2 years and 10% henceforth.
            </Typography>
            <Box
              sx={{
                display: { xs: "flex" },
                // height: { xs: "100px" },
                // flexDirection: { xs: "column" },
              }}
            >
              <ButtonWhite
                sx={{ p: 2, px: 4, mx: 1 }}
                href={process.env.NEXT_PUBLIC_NOVA_URL}
                target="_blank"
              >
                Buy Nova Nerds
              </ButtonWhite>
              <ButtonWhite
                sx={{ p: 2, px: 4, mx: 1 }}
                href={process.env.NEXT_PUBLIC_WAIFU_URL}
                target="_blank"
              >
                Buy Waifu Nerds
              </ButtonWhite>
            </Box>
          </Stack>
        </Container>
      </StyledBox>
    </>
  );
};

const StyledBox = styled(Box)(
  ({ theme }) => `
    background-image: url("images/hold_earn_bg.png");
    background-position: center;
    background-position-y: bottom;
    background-size: cover;
    height: 50vh;  
    ${theme.breakpoints.values.xs} {
      height: 70vh;
    }
    `
);
export default HoldNEarn;
