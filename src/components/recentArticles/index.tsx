import React, { Fragment } from "react";
import SliderItem from "./sliderItem";
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
import ArticleItem from "./articleItem";
import {
  recentNewsSelector,
  recentNewsPaginationSelector,
} from "src/common/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentNewsStart } from "src/common/slices/news.slice";
import { duplicateRemover } from "./utils";

// taken from latest news

const RecentArticles = ({ category }) => {
  const [resultList, setResultList] = React.useState([]);
  const dispatch = useDispatch();

  const divStyle = {
    position: "relative",
    top: "-200px",

    height: "270px",
    background: "linear-gradient(180deg, #000 0%, #3F3F46 100%)",
    marginBottom: "-200px",
  };

  const recentNews = useSelector(recentNewsSelector);
  const recentNewsList = recentNews?.recentNewsList?.rows
    ? recentNews?.recentNewsList.rows
    : [];

  const handleLoadmore = (e) => {
    dispatch(
      fetchRecentNewsStart({
        ...recentNews?.pagination,
        page_num: recentNews?.pagination?.page_num + 1,
      })
    );
  };

  React.useEffect(() => {

  }, [resultList]);

  React.useEffect(() => {
    if (!recentNewsList?.length) return;
    const tempNews = [...resultList, ...recentNewsList];
    setResultList(() => duplicateRemover(tempNews));
  }, [recentNewsList]);

  React.useEffect(() => {
    setResultList([]);
    dispatch(
      fetchRecentNewsStart({
        row_per_page: 10,
        page_num: 1,
        category_id: category ? category : "",
      })
    );
  }, [category]);
  return (
    <Fragment>
      <Paper
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
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Typography
            variant="h3"
            textAlign="center"
            component="div"
            sx={{ my: 7 }}
          >
            Recent Articles
          </Typography>

          {resultList?.map((news, index) => (
            <ArticleItem key={index} news={news} />
          ))}

          {!resultList?.length && (
            <Typography
              variant="h5"
              textAlign="center"
              component="div"
              sx={{
                my: 7,
              }}
            >
              No News Found...
            </Typography>
          )}
          {/* <ArticleItem />
          <ArticleItem /> */}

          {recentNewsList?.length ? (
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
        <div style={divStyle}></div>
      </Paper>
    </Fragment>
  );
};

export default RecentArticles;
