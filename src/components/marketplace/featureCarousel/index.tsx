import React, { Fragment, useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";

import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";

import SliderItem from "./sliderItem";

const featureCarousel = () => {
  const [slides, setSlides] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.FEATURED_COLLECTIONS}`,
        });
        setSlides(result);
      }
      catch (err) {

      }
    })()
  }, []);

  return (
    <Fragment>
      <Carousel
        autoPlay={true}
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
        {
          slides?.map((_item: any, _index: any) => {
            return <SliderItem
              key={_index}
              image={`${_item.image}`}
              name={`${_item.name}`}
              title={`${_item.title}`}
              description={`${_item.description}`}
              url={`${_item.url}`}
            />
          })
        }
      </Carousel>
    </Fragment>
  );
};

export default featureCarousel;
