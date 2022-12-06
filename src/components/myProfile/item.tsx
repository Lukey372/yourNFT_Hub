import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { handleImageError } from "src/common/utils/handleImageError";
import Clamp from "react-multiline-clamp";
import Link from "next/link";
import Image from "next/image";

const ListItem = ({ title, image, curPrice, lastPrice, sx }) => {

  return (
    <Link href={`/item-details/[address]`} as={`/item-details/item`} passHref>
      <Box
        sx={{

          width: `17vw`,
          flex: `0 0 17vw`,
          maxWidth: `17vw`,
          "&:hover": {
            cursor: `pointer`
          },
          ...sx
        }}
      >
        <Box className="imageWrapper">
          <Box className="imageOver"
            sx={{
              transition: `all 0.5s`,
              "&:hover": {
                cursor: `pointer`,
                transform: `scale(1.1)`
              }
            }}>
            <img
              src={`/images/marketplace/nfts/${Math.floor(Math.random() * 16)}.png`}
              alt="POPULAR IMAGE"
              style={{
                borderTopRightRadius: `8px`,
                borderTopLeftRadius: `8px`,
              }}
            />
          </Box>
        </Box>

        <Box className={`pt-16 pr-16 pl-16 pb-16`}
          sx={{
            borderBottomRightRadius: `8px`,
            borderBottomLeftRadius: `8px`,
            background: "linear-gradient(180deg, #000000 0%, #27272A 100%)",
          }}>

          <Typography variant="body1" className={`mb-16`}>Crypto bull #4034</Typography>
          <Grid container alignItems={`center`} justifyContent={`space-between`}>
            <Grid item md={6}>
              <Typography variant="caption" sx={{ color: '#71717A' }}>Price</Typography>
              <Box className={`d-flex align-items-center`}>
                <img
                  src={`/images/solana.svg`}
                  alt="POPULAR IMAGE"
                  width="20"
                />
                <Typography variant="body1" className={`ml-8`}>{curPrice}</Typography>
              </Box>
            </Grid>

            <Grid item md={6}>
              <Typography variant="caption" sx={{ color: '#71717A' }}>Last Price</Typography>
              <Box className={`d-flex align-items-center`}>
                <img
                  src={`/images/solana.svg`}
                  alt="POPULAR IMAGE"
                  width="20"
                />
                <Typography variant="body1" className={`ml-8`}>{lastPrice}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link >
  );
};

export default ListItem;
