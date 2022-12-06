import React, { Fragment } from "react";
import SliderItem from "./sliderItem";
import Carousel from "react-material-ui-carousel";

const LargeCorousel = () => {
  return (
    <Fragment>
      <Carousel
        indicatorIconButtonProps={{
          style: {
            color: "black", // 3
            border: "2px solid white",
            borderColor: "white",
            margin: 2,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            padding: "0.2rem", // 1
            color: "white", // 3
            border: "2px solid white",
            backgroundColor: "white",
          },
        }}
      >
        <SliderItem />
        {/* <SliderItem /> */}
      </Carousel>
    </Fragment>
  );
};

export default LargeCorousel;
