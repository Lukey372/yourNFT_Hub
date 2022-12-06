import { Box } from "@mui/material";
import Feed from "src/components/homepage/feed";
import Marketplace from "src/components/homepage/marketplace";
import Footer from "src/components/footer";
import Header from "src/components/header";

export default function Home() {
  //   const messages = useIntl();
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

      <Box sx={{ height: "10vh" }} />
      <Feed stickyHead={false} />
      <Box sx={{ height: "10vh" }} />

      <Footer />
    </>
  );
}
