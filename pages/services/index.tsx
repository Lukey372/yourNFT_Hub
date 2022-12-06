import { Box, Container } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import Footer from "src/components/footer";
import Header from "src/components/header";

import Advert from "src/components/advert";
import StartBanner from "src/components/services/startBanner";
import Testimonials from "src/components/services/testimonials";

export default function News() {
  const dispatch = useDispatch();
  const messages = useIntl();

  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  useEffect(() => {
    // dispatch(fetchNewsStart());
  }, []);
  return (
    <Fragment>
      <Header pages={pages} />

      <Box sx={{ height: "10vh" }} />
      <StartBanner />
      <Box sx={{ height: "10vh" }} />
      <Testimonials />
      <Box sx={{ height: "10vh" }} />
      {/* <Advert /> */}

      <Box sx={{ height: "5vh" }} />
      <Footer />
    </Fragment>
  );
}
