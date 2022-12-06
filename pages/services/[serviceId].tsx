import { Box, Container } from "@mui/material";
import { fetchSingleServicesStart } from "src/common/slices/services.slice";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import Footer from "src/components/footer";
import Header from "src/components/header";

import Testimonials from "src/components/services/testimonials";
import ServiceDetail from "src/components/servicesDetail/sDetail";

export default function News() {
  const dispatch = useDispatch();
  const messages = useIntl();

  const router = useRouter();
  const { serviceId } = router.query;

  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(fetchSingleServicesStart({ id: serviceId }));
  }, [serviceId]);
  return (
    <Fragment>
      <Header pages={pages} />

      <Box sx={{ height: "10vh" }} />
      <ServiceDetail />
      <Box sx={{ height: "10vh" }} />
      <Testimonials />
      <Box sx={{ height: "10vh" }} />
      {/* <Advert /> */}

      <Box sx={{ height: "5vh" }} />
      <Footer />
    </Fragment>
  );
}
