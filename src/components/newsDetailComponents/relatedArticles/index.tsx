import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import {
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  Box,
} from "@mui/material";
import ButtonWhite from "src/theme/buttonWhite";
import { url } from "inspector";

import {
  newsListSelector,
  singleNewsSelector,
  relatedNewsSelector,
} from "src/common/selectors";
import { useDispatch, useSelector } from "react-redux";
import RelatedNewsItem from "./relatedNewsItem";
import { StyledPaper } from "./styles/styledRelNewsPape";
import { fetchRelatedNewsStart } from "src/common/slices/news.slice";
import { duplicateRemover } from "./utils";

// taken from recent article index

const RelatedArticles = () => {
  const [resultList, setResultList] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);
  const dispatch = useDispatch();
  const category = useSelector(singleNewsSelector)?.current?.category_id;
  const divStyle = {
    position: "relative",
    top: "-200px",

    height: "270px",
    background: "linear-gradient(0deg, #000 0%, #3F3F46 100%)",
    marginBottom: "-200px",
  };

  const singleNews = useSelector(singleNewsSelector);
  const relatedNewsraw = useSelector(relatedNewsSelector).relatedNewsList;
  const relatedNews = relatedNewsraw?.rows || [];

  //first api hit is declared in singlenewsSaga
  // only 2nd and else api hits are declared here.
  const handleLoadmore = (e) => {
    dispatch(
      fetchRelatedNewsStart({
        category_id: category ? category : "",
        page_num: pageNo + 1,
        row_per_page: 6,
      })
    );
    setPageNo((state) => state + 1);
  };

  React.useEffect(() => {
    setResultList([]);
    setPageNo(1);
  }, [singleNews]);

  React.useEffect(() => {
    const tempNews = [...resultList, ...relatedNews];
    setResultList(() => duplicateRemover(tempNews));
  }, [relatedNewsraw]);
  return (
    <Fragment>
      <StyledPaper
        sx={{
          borderRadius: 10,
          mt: 5,
          pt: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #3F3F46 0%, #000000 15%);",
        }}
      >
        {/* <div style={divStyle}></div> */}
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Typography
            variant="h3"
            textAlign="center"
            component="div"
            sx={{ my: 7 }}
          >
            Related News
          </Typography>

          <Grid container spacing={3}>
            {resultList?.map?.((news, index) => (
              <Grid item md={4} key={news.title}>
                <RelatedNewsItem key={index} news={news} />
              </Grid>
            ))}
          </Grid>
          {/* <Grid item xs={12} textAlign="center">
            <ButtonWhite> Explore</ButtonWhite>
          </Grid> */}

          {/* <ArticleItem />
          <ArticleItem /> */}

          {relatedNews?.length ? (
            <ButtonWhite
              sx={{
                textTransform: "capitalize",
                mx: "auto",
                display: "block",
                mt: 3,
              }}
              onClick={handleLoadmore}
            >
              Load more
            </ButtonWhite>
          ) : (
            <Typography color="text.secondary" align="center">
              End of List
            </Typography>
          )}
        </Container>
      </StyledPaper>
    </Fragment>
  );
};

export default RelatedArticles;
