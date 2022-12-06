import { Box, Container } from "@mui/material";
import { fetchSingleGuidesStart } from "src/common/slices/guides.slice";
import { fetchSingleServicesStart } from "src/common/slices/services.slice";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import Footer from "src/components/footer";
import GuideDetail from "src/components/guideDetailComponents/guideDetail";
import Header from "src/components/header";
import PrivacyPolicy from "src/components/privacyPolicy";
import TermsAndCondition from "src/components/termsOfCondition";

export default function Privacy() {
  const dispatch = useDispatch();
  const messages = useIntl();

  const router = useRouter();
  const { guidesId } = router.query;

  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //     dispatch(fetchSingleGuidesStart({ id: guidesId }));
  //   }, [guidesId]);
  return (
    <Fragment>
      <Header pages={pages} />

      <Box sx={{ height: "10vh" }} />
      <PrivacyPolicy />
      <Box sx={{ height: "10vh" }} />
      {/* <Testimonials />
      <Box sx={{ height: "10vh" }} /> */}
      {/* <Advert /> */}

      <Box sx={{ height: "5vh" }} />
      <Footer />
    </Fragment>
  );
}
