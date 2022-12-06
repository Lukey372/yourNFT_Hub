import { Box, Container, Grid, Link, Skeleton } from "@mui/material";
import {
  fetchNewsStart,
  fetchSingleNewsStart,
} from "src/common/slices/news.slice";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/footer";
import GuidesnLists from "src/components/guidesnLists";
import Header from "src/components/header";
import NewsDetail from "src/components/newsDetailComponents/newsDetail";
import NewsLatest from "src/components/newsDetailComponents/newsLatest";

import { useRouter } from "next/router";
import RelatedArticles from "src/components/newsDetailComponents/relatedArticles";
import Advert from "src/components/advert";
import {
  fetchAdvertStart,
  fetchCategoriesStart,
} from "src/common/slices/assets.slice";
import { advertSelector, categoriesSelector } from "src/common/selectors/";
import { handleImageError } from "src/common/utils/handleImageError";
import getCategories from "src/components/newsDetailComponents/utils";

export default function News() {
  const dispatch = useDispatch();
  const categoriesState = useSelector(categoriesSelector);

  const router = useRouter();
  const { newsId } = router.query;
  const dummyPages = [
    { title: "BlockChain", url: "/news/?cat=1" },
    { title: "NFTs", url: "/news/?cat=2" },
    { title: "Opinions", url: "/news/?cat=3" },
    { title: "Tech", url: "/news/?cat=4" },
    // { title: "Cat 5", url: "/news/?cat=5" },
    { title: "All News", url: "/news/" },
  ];

  //Categories from api
  const categories = getCategories(categoriesState);

  const pages = categories?.length ? [...categories] : dummyPages;

  useEffect(() => {
    dispatch(fetchAdvertStart());
    if (!categoriesState?.rows) dispatch(fetchCategoriesStart());
  }, []);

  const advert = useSelector(advertSelector);

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(fetchSingleNewsStart({ id: newsId }));
  }, [newsId]);
  return (
    <Fragment>
      <Header pages={pages} collapseMenuAfter={3} />
      <Container maxWidth="xl">
        <Box sx={{ height: { md: "10vh", xs: "4vh" } }} />
        <Grid container maxWidth="lg" spacing={2} mx="auto">
          <Grid item md={8} xs={11}>
            <NewsDetail />
          </Grid>
          <Grid item md={4} xs={11}>
            <Box sx={{ height: "450px" }}>
              <Link href={advert?.[0]?.ad_link} target="_blank">
                <img
                  src={advert?.[0]?.image}
                  alt=""
                  onError={handleImageError}
                  height="100%"
                  width="100%"
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </Box>
            <NewsLatest asSidebar={false} />
          </Grid>
        </Grid>

        <Box sx={{ height: "10vh" }} />
        <RelatedArticles />
        {/* <Box sx={{ height: "200px" }} /> */}
        <Box sx={{ height: "10vh" }} />
        {/* <Skeleton variant="rectangular" width="100%" height={500} /> */}
      </Container>
      <Advert />
      <Box sx={{ height: "10vh" }} />
      <Footer />
    </Fragment>
  );
}
