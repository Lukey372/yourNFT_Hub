import React from "react";
import StyledGradPaper from "src/common/shared/components/gradPaper";
import { Box, Stack, Typography } from "@mui/material";

import Image from "next/image";

import feedComingSoon from "public/images/feed_coming_soon.png";
import feedTop from "public/images/feed_top.png";
import { handleImageError } from "src/common/utils/handleImageError";

const Feed = ({ stickyHead = true }) => {
  return (
    <>
      {stickyHead && (
        <Box sx={{ marginBottom: "-10%", position: "relative", zIndex: -2 }}>
          {/* <img
            src="images/feed_top.png"
            alt=""
            width={"100%"}
            style={{ objectFit: "contain" }}
          /> */}
          <Image
            src={feedTop || "https://picsum.photos/200"}
            alt="Feed Top"
            layout="responsive"
            height="30%"
            width="100vw"
            objectFit="contain"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0TgMAANIAm3/ipYoAAAAASUVORK5CYII="
            placeholder="blur"
            onError={handleImageError}
          />
        </Box>
      )}
      <StyledGradPaper>
        <Stack sx={{ justifyContent: "center" }}>
          <Typography variant="h3" textAlign="center" my={8} gutterBottom>
            Feed
          </Typography>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{ position: "absolute", left: 0, right: 0, zIndex: 1 }}
          >
            Coming Soon
          </Typography>

          <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            className="img-div"
          >
            <Image
              src={feedComingSoon || "https://picsum.photos/200"}
              alt="Marketplace Coming Soon"
              layout="responsive"
              height="70%"
              width="100vw"
              objectFit="contain"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0TgMAANIAm3/ipYoAAAAASUVORK5CYII="
              placeholder="blur"
              onError={handleImageError}
            />
          </div>
          {/* <img
            src="images/feed_coming_soon.png"
            alt="market place coming soon"
          /> */}
        </Stack>
      </StyledGradPaper>
    </>
  );
};

export default Feed;
