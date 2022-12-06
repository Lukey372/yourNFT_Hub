import {
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
import moment from "moment";
import Link from "next/link";
import Clamp from "react-multiline-clamp";

import { StyledCard } from "./styled/styledCard";
import { handleImageError } from "src/common/utils/handleImageError";
import { getSlug } from "../../helper/generateSlug";
//Clamp

const SliderItem = ({ date, title, image, id }) => {
  return (
    <Fragment>
      <StyledCard
        sx={{
          // border: "4px solid white",
          borderRadius: 2,

          pb: 7,
          bgcolor: "#27272A",
        }}>
        <Link href={`/news/[newsId]/[newsSlug]`} as={`/news/${id}/${getSlug(title)}`} passHref>
          <CardActionArea>
            <CardMedia
              component='img'
              height='300'
              image={image}
              alt='green iguana'
              sx={{ p: 1 }}
              onError={handleImageError}
            />
            <CardContent>
              <Typography gutterBottom variant='subtitle2' component='div' color='text.secondary'>
                {moment(date).utc().format("MMMM DD, YYYY")}
              </Typography>
              <Typography variant='h5' fontSize={24} color='text.primary'>
                <Clamp withTooltip lines={2}>
                  {title}
                </Clamp>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </StyledCard>
    </Fragment>
  );
};

export default SliderItem;
