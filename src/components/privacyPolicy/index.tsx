import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { StyledPaper } from "./styledPaper";
import { handleImageError } from "src/common/utils/handleImageError";
import moment from "moment";

import { privacyContent } from "./content";

const PrivacyPolicy = () => {
  // const singleGuide = useSelector(singleGuidesSelector);
  // const loading = useSelector(guidesLoadingSelector);

  // const { next, previous } = singleGuide;
  // const current = singleGuide;

  return (
    <>
      <StyledPaper>
        <Container maxWidth="md">
          <Box maxWidth={"720px"} mx="auto">
            <Typography variant="h3" component="div">
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              fontSize={"1.25rem"}
              // textAlign="center"
              component="div"
              sx={{
                my: 3,
                mx: "auto",
                h2: {
                  color: "text.primary",
                  typography: "h5",
                },
              }}
              //   width={{ md: "90%", xs: "95%" }}
            >
              {privacyContent}
            </Typography>

            {/* <Stack
              direction="row"
              justifyContent="space-between"
              spacing={0}
              my={3}
            >
              <NewsNavButton
                href={`/guides/${previous?.id}`}
                title="Previous"
                body={previous?.title}
                sx={{ width: "48%" }}
                disabled={!previous}
              />
              <NewsNavButton
                href={`/guides/${next?.id}`}
                title="Next"
                body={next?.title}
                sx={{ width: "48%" }}
                disabled={!next}
              />
            </Stack> */}
          </Box>
        </Container>
      </StyledPaper>
    </>
  );
};

export default PrivacyPolicy;
