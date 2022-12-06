import React from "react";
import { Box, CardActionArea, Link, Typography } from "@mui/material";

const UsingBox = ({ item, dummy }) => {
  const handleImageError1 = (e) => {
    e.target.src = dummy.image;
  };
  return (
    <>
      <Box>
        <CardActionArea
          href={item.link}
          target="_blank"
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          <img
            src={item.icon}
            alt=""
            onError={handleImageError1}
            className="using-image"
          />
          <Typography
            variant="body2"
            fontSize={"1.25rem"}
            textAlign="center"
            component="p"
            sx={{
              my: 1,
              //  mx: "auto"
            }}
            width={{ md: "90%", xs: "95%" }}
          >
            {item.name}
          </Typography>
        </CardActionArea>
      </Box>
    </>
  );
};

export default UsingBox;
