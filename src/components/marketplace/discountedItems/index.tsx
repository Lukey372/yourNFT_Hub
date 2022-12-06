import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { url } from "inspector";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";

import ButtonWhite from "src/theme/buttonWhite";

import ListItem from "./listItem";

const DiscountedItems = () => {
  const dispatch = useDispatch();

  const [discounts, setDiscounts] = React.useState<any[]>([]);
  const [originalDiscounts, setOriginalDiscounts] = React.useState<any[]>([]);
  const [refresh, setRefresh] = React.useState<boolean>(true);

  const [offset, setOffset] = React.useState<number>(1);

  React.useEffect(() => {
    (async () => {
      const temp: any = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.DISCOUNTED_NFTS}`,
      });
      setOriginalDiscounts([...temp]);
      const result = temp.slice(0, offset * 4);
      setDiscounts(result);
    })()
  }, [refresh]);

  React.useEffect(() => {
    (async () => {
      if (offset > 1) {
        const temp = originalDiscounts;
        const rest = temp.slice(0, offset * 4);
        setDiscounts([...rest]);
      }

    })()
  }, [offset]);

  return (
    <Fragment>
      <Paper
        sx={{
          position: 'relative',
          borderRadius: 10,
          mt: 5,
          pt: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: theme => theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Typography
            variant="h3"
            textAlign="center"
            component="p"
            sx={{ my: 7 }}
          >
            Discounted Items
          </Typography>

          <Grid
            container
            direction="row"
            alignItems="flex-start"
            spacing={3}
            className="mt-56"
          >
            {Array.isArray(discounts) && discounts?.map((item: any, index: number) => {
              return (
                <Grid item md={3} sm={4} xs={6} key={index}>
                  <ListItem
                    image={item.image}
                    descript={item.name}
                    title={item.name}
                    address={item.mintAddress}
                    data={item}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    walletAddress={item?.walletAddress}
                  />
                </Grid>
              );
            })}
          </Grid>

          {!discounts || discounts?.length < 1 && (
            <Typography
              variant="h5"
              textAlign="center"
              component="p"
              sx={{
                my: 7,
              }}
            >
              No Items ...
            </Typography>
          )}
        </Container>

        {discounts && discounts?.length > 0 && discounts.length < originalDiscounts.length &&
          <Box className="d-flex align-items-center justify-content-center mt-48">
            <ButtonWhite
              sx={{
                textTransform: "capitalize",
                fontSize: "1rem",
                px: { md: 4, sm: 3 },
                py: 2,
              }}
              onClick={() => {
                setOffset(offset + 1);
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }} component="p">Explore</Typography>
            </ButtonWhite>
          </Box>
        }

        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "270px",
          background: "linear-gradient(180deg, #3F3F46 0%, #000 100%)",
        }}></Box>
      </Paper>
    </Fragment>
  );
};

export default DiscountedItems;
