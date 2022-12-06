import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";

const SliderItem = () => {
  return (
    <Fragment>
      <Card
        sx={{
          maxWidth: "xl",
          backgroundImage: `url("https://picsum.photos/1500/800")`,
          height: 500,
        }}
      >
        <div
          style={{
            height: "inherit",
            background:
              "linear-gradient(rgb(0, 0, 0) 25%, rgba(100, 100, 100, 0) 95%)",
          }}
        >
          <CardContent>
            <Container maxWidth="lg">
              <Grid container>
                <Grid item md={8}>
                  <Typography gutterBottom variant="h3">
                    Your NFT Hub: Your OneStop for anything nft related
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="h6">Powered by Nova Nerds</Typography>
                </Grid>
              </Grid>
            </Container>
          </CardContent>

          {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
        </div>
      </Card>
    </Fragment>
  );
};

export default SliderItem;
