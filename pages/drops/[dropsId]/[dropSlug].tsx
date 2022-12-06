import { Box, Container, Grid, Skeleton } from "@mui/material";
import {
  fetchNewsStart,
  fetchSingleNewsStart,
} from "src/common/slices/news.slice";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/footer";
import GuidesnLists from "src/components/guidesnLists";
import Header from "src/components/header";

import { useRouter } from "next/router";
import { fetchSingleDropsStart } from "src/common/slices/drops.slice";
import Overview from "src/components/dropsDetailComponents/overview";
import DropsDetail from "src/components/dropsDetailComponents/dropsDetail";
import Advert from "src/components/advert";

export default function News() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { dropsId } = router.query;
  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(fetchSingleDropsStart({ id: dropsId }));
  }, [dropsId]);
  return (
    <Fragment>
      <Header pages={pages} />
      <Box
        sx={{
          height: { md: "150px", xs: "80px" },
          borderRadius: "0px 0px 60px 60px",
        }}
        bgcolor="grey.900"
      />
      <Container maxWidth="lg">
        <DropsDetail />
        {/* <Box sx={{ height: "50px" }} /> */}
      </Container>
      <Overview />
      {/* <Box sx={{ height: "200px" }} /> */}
      <Box sx={{ height: "10vh" }} />
      <Advert />
      <Box sx={{ height: "10vh" }} />

      <Footer />
    </Fragment>
  );
}
