import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { handleImageError } from "src/common/utils/handleImageError";

import marketComingSoon from "public/images/market_coming_soon.png";

const Marketplace = () => {
  return (
    <>
      <Stack sx={{ justifyContent: "center" }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Marketplace
        </Typography>
        <Typography
          variant="h3"
          textAlign="center"
          gutterBottom
          sx={{ position: "absolute", left: 0, right: 0, zIndex: 2 }}
        >
          Coming Soon
        </Typography>

        <Box
          sx={{ position: "relative", "& img": { mx: "auto" } }}
          className="img-div"
        >
          <Image
            src={marketComingSoon || "https://picsum.photos/200"}
            alt="Marketplace Coming Soon"
            layout="responsive"
            height="70%"
            width="100vw"
            objectFit="contain"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0TgMAANIAm3/ipYoAAAAASUVORK5CYII="
            placeholder="blur"
            onError={handleImageError}
          />
        </Box>

        {/* <img
          src="images/market_coming_soon.png"
          alt="market place coming soon"
        /> */}
      </Stack>
    </>
  );
};

export default Marketplace;
