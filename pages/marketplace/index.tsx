import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { useSelector, useDispatch } from "react-redux";

import { AxiosPromise, AxiosResponse, AxiosError } from "axios";

import { Backdrop, Box, CircularProgress, Container } from "@mui/material";

import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";

import { dropsLoadingSelector } from "src/common/selectors";

import Header from "src/components/header";
import Footer from "src/components/footer";

import FeatureCarousel from "src/components/marketplace/featureCarousel";
import UpcomingLaunches from "src/components/marketplace/upcomingLaunches";
import NewsCorousel from "src/components/marketplace/newsCorousel";
import PopularCollections from "src/components/marketplace/popularCollections";
import DiscountedItems from "src/components/marketplace/discountedItems";
import LaunchCarousel from "src/components/marketplace/launchCarousel";

export default function Home() {
  const messages = useIntl();
  const [slides, setSlides] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const [populars, setPopulars] = useState([]);
  const loading = useSelector(dropsLoadingSelector);
  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  useEffect(() => {
    (async () => {
      let result: any;
      result = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.FEATURED_COLLECTIONS}`,
      });
      setSlides(result);

      result = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.UPCOMING_LAUNCHES}`,
      });
      setUpcomings(result);

      result = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.POPULAR_COLLECTIONS}`,
      });
      setPopulars(result);

    })()
  }, []);

  return (
    <Fragment>
      <Header pages={pages} />
      <FeatureCarousel />
      <Box sx={{ height: "10vh" }} />
      <UpcomingLaunches
        data={upcomings}
      />
      <Box sx={{ height: "10vh" }} />
      <NewsCorousel />
      <Box sx={{ height: "10vh" }} />
      <PopularCollections data={populars} />
      <Box sx={{ height: "10vh" }} />
      <DiscountedItems />
      <Box sx={{ height: "12vh" }} />
      <LaunchCarousel />
      <Box sx={{ height: "5vh" }} />
      <Footer />

      {loading && (
        <Backdrop
          sx={{ color: "Grey", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" sx={{
            width: `80px`,
            height: `80px`
          }} />
          &nbsp; Loading...
        </Backdrop>
      )}
    </Fragment>
  );
}
