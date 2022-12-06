import { Container, Box } from "@mui/material";
import { Fragment } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import HomeDropsList from "src/components/homeDropsList";
import Header from "src/components/header";
import LargeCorousel from "src/components/largeCorousel";
import NewsCorousel from "src/components/newsCorousel";
import Footer from "src/components/footer";
import Marketplace from "src/components/homepage/marketplace";
import Feed from "src/components/homepage/feed";
import HoldNEarn from "src/components/homepage/holdnEarn";
import NavsInfo from "src/components/homepage/navsInfo";

export default function Home() {
  const messages = useIntl();
  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  return (
    <>
      <Header pages={pages} />
      {/* Preiviously xl container was here */}
      <LargeCorousel />
      <Box sx={{ height: "10vh" }} />
      <NavsInfo />
      <Box sx={{ height: "10vh" }} />

      <NewsCorousel />
      <Box sx={{ height: "10vh" }} />

      <HomeDropsList />
      <Box sx={{ height: "10vh" }} />
      <Marketplace />
      <Box sx={{ height: "10vh" }} />
      <Feed />
      <Box sx={{ height: "10vh" }} />
      <HoldNEarn />
      <Box sx={{ height: "10vh" }} />
      <Footer />
    </>
  );
}
