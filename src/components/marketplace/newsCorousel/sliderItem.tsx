import React, { Fragment } from "react";

import {
  Box,
  CardContent,
  Typography,
} from "@mui/material";

import Link from "next/link";

import { serverUrl } from "src/common/config";
import { handleImageError } from "src/common/utils/handleImageError";

import { getLongDate } from "src/helper/utility";

import { StyledCard } from "./styled/styledCard";

const SliderItem = ({ date, title, image, symbol }) => {
  return (
    <Fragment>
      <Link href={`/marketplace/[collection]`} as={`/marketplace/${symbol}`} passHref>
        <StyledCard
          sx={{
            borderRadius: 2,
            bgcolor: "#27272A",
            display: 'block',
            transition: `all 0.5s`,
            '&:hover': {
              cursor: `pointer`
            }
          }}
        >
          <Box className={`imageWrapper`}>
            <Box className={`imageOver pr-8 pl-8 pt-8 pb-8`}>
              <Box
                component={`img`}
                src={`${serverUrl}${image}`}
                alt='Collection Image'
                onError={handleImageError}
                sx={{
                  transition: `all 0.5s`,
                  '&:hover': {
                    transform: `scale(1.1)`
                  }
                }}
                className={`border-radius-8`}
              />
            </Box>
          </Box>

          <CardContent className={`pt-0 pb-32`} >
            <Typography variant="h5" sx={{ my: 2 }}>{title}</Typography>
            <Typography variant="caption" color={`grey.500`}>
              {getLongDate(date)}
            </Typography>
          </CardContent>
        </StyledCard>
      </Link>
    </Fragment >
  );
};

export default SliderItem;
