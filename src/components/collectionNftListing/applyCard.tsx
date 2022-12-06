import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const ApplyCard = (props) => {
  const bgimage = {
    background: 'url("/images/rocket.svg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
  };
  return (
    <>
      <div
        style={{
          ...bgimage,
          width: "100%",
        }}
      >
        <Stack
          alignItems="center"
          spacing={2}
          sx={{ background: 'url("/images/rocket.svg")' }}
          pb={3}
          {...props}
        >
          <Box height="50vh"></Box>
          <Typography variant="h3">Apply For Listing</Typography>
          <Typography variant="body2">Get your drop listed with us.</Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#1DA1F2", "&:hover": { bgcolor: "#90caf9" } }}
            href={
              "https://twitter.com/messages/compose?recipient_id=1473633931538747395"
            }
            target="_blank"
          >
            Send DM
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default ApplyCard;
