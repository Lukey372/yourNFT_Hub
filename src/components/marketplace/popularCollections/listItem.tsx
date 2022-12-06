import React, { Fragment } from "react";

import Link from "next/link";

import {
  Box,
  Typography,
} from "@mui/material";

import { serverUrl } from "src/common/config";
import { handleImageError } from "src/common/utils/handleImageError";

const ListItem = ({ descript, title, image, symbol }) => {

  return (
    <Fragment>
      <Link href={`/marketplace/[collection]`} as={`/marketplace/${symbol}`} passHref>
        <Box sx={{ '&:hover': { cursor: `pointer` } }}>
          <Box className="imageWrapper">
            <Box className="imageOver">
              <Box
                component={`img`}
                src={`${serverUrl}${image}`}
                alt="POPULAR IMAGE"
                className={`border-radius-8`}
                onError={handleImageError}
                sx={{
                  borderBottomRightRadius: `0px !important`,
                  borderBottomLeftRadius: `0px !important`,
                  transition: `all 0.5s`,
                  '&:hover': {
                    transform: `scale(1.1)`
                  }
                }}
              />
            </Box>
          </Box>

          <Box
            className={`pt-16 pr-16 pl-16 pb-16`}
            sx={{
              background: (theme) => `linear-gradient(0deg, #27272A 50.28%, ${theme.palette.background.default} 100%)`,
              borderRadius: `0px 0px 8px 8px`,
              flex: `none`,
              order: `1`,
              flexGrow: 0,
              p: 0
            }}
          >
            <Typography variant="body1">{title}</Typography>
            <Typography
              variant="body1"
              color={`grey.500`}
              sx={{
                fontSize: `0.8rem`,
                '-webkit-box-orient': `vertical`,
                '-webkit-line-clamp': `2`,
                display: `-webkit-box`,
                maxHeight: `42px`,
                minHeight: `42px`,
                overflow: `hidden`
              }}
            >
              {descript}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Fragment>
  );
};

export default ListItem;
