import React, { Fragment } from "react";
import Clamp from "react-multiline-clamp";

import Link from "next/link";
import Image from "next/image";

import {
  Box,
  Typography,
} from "@mui/material";

import { handleImageError } from "src/common/utils/handleImageError";
import { serverUrl } from "src/common/config";

import { getSlug } from "src/helper/generateSlug";
import { getLongDate } from "src/helper/utility";

const ListItem = ({ date, title, image, symbol }) => {

  return (
    <Fragment>
      {/* <Link href={`/launch/[collection]`} as={`/launch/${symbol}`} passHref> */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          '&:hover': {
            cursor: `pointer`
          }
        }}
      >
        <Box sx={{
          width: '88%',
          margin: '0 6%',
          paddingBottom: '88%',
          position: 'absolute'
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Box
              component="img"
              src={`${serverUrl}${image}`}
              alt='Picture of the collection'
              sx={{
                width: '100%',
                height: '100%',
                verticalAlign: 'middle',
                objectFit: 'cover',
                borderRadius: '8px',
                transition: `all 0.5s`,
                '&:hover': {
                  marginTop: `-16px`
                },
                mb: 12
              }}
              onError={handleImageError}
            />
          </Box>
        </Box>

        <Box sx={{
          paddingTop: '50%'
        }}>

        </Box>

        <Box sx={{
          paddingTop: '32%',
          paddingBottom: '8%',
          borderRadius: `8px`,
          background: "radial-gradient(farthest-corner at 50% -12%, rgb(161, 161, 170) 20%, rgb(63, 63, 70) 64%)",
          width: "100%",
          zIndex: -1,
          textAlign: 'center',
        }}>

          <Typography variant="h4">
            {title}
          </Typography>

          <Typography variant="body1" color={`grey.400`} sx={{ mt: 2 }}>
            {getLongDate(date)}
          </Typography>
        </Box>
      </Box>
      {/* </Link> */}
    </Fragment>
  );
};

export default ListItem;
