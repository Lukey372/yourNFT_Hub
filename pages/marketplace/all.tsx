import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { useSelector, useDispatch } from "react-redux";

import { AxiosPromise, AxiosResponse, AxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Grid,
  Paper,
  Typography,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  InputBase
} from "@mui/material";

import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";

import { dropsLoadingSelector } from "src/common/selectors";

import Header from "src/components/header";
import Footer from "src/components/footer";

import ListItem from "src/components/marketplace/popularCollections/listItem";

import FeatureCarousel from "src/components/marketplace/featureCarousel";
import UpcomingLaunches from "src/components/marketplace/upcomingLaunches";
import NewsCorousel from "src/components/marketplace/newsCorousel";
import PopularCollections from "src/components/marketplace/popularCollections";
import DiscountedItems from "src/components/marketplace/discountedItems";
import LaunchCarousel from "src/components/marketplace/launchCarousel";

export default function Home() {
  const messages = useIntl();
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(``);
  const [loading, setLoading] = useState(false);
  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  const fetchData = async () => {
    setOffset(offset + 12);
    let collections: any = await commonService({
      method: "post",
      route: `${MARKETPLACES_API.ALL_COLLECTIONS}`,
      data: {
        name: search,
        offset: offset + 12,
        limit: 12
      }
    });

    if (collections && Array.isArray(collections)) {
      if (collections.length > 0) {
        setData([...data, ...collections]);

        if (collections.length == 12) {
          setHasMore(true);
        }
        else {
          setHasMore(false);
        }
      }
      else {
        setHasMore(false);
      }
    }
    else {
      setHasMore(false)
    }

  }

  const getDataBySearch = async () => {
    try {
      setLoading(true);
      setOffset(0);
      let collections: any = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.ALL_COLLECTIONS}`,
        data: {
          name: search,
          offset: 0,
          limit: 12
        }
      });
      if (collections && Array.isArray(collections)) {
        if (collections.length > 0) {
          setData([...collections]);

          if (collections.length == 12) {
            setHasMore(true);
          }
          else {
            setHasMore(false);
          }
        }
        else {
          setHasMore(false);
        }
      }
      else {
        setHasMore(false);
      }
      setLoading(false);
    }
    catch (err) {

    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let collections: any = await commonService({
          method: "post",
          route: `${MARKETPLACES_API.ALL_COLLECTIONS}`,
          data: {
            name: ``,
            offset: 0,
            limit: 12
          }
        });
        if (collections && Array.isArray(collections)) {
          if (collections.length > 0) {
            setData([...collections]);

            if (collections.length == 12) {
              setHasMore(true);
            }
            else {
              setHasMore(false);
            }
          }
          else {
            setHasMore(false);
          }

        }
        else {
          setHasMore(false);
        }
      }
      catch {

      }
      setLoading(false);

    })()
  }, []);


  return (
    <Fragment>
      <Header pages={pages} />
      <Box sx={{ height: "5vh" }} />

      <Container maxWidth="lg" sx={{ zIndex: 1, mb: 4 }}>
        <Grid
          container
          direction={`row`}
          alignItems={`center`}
          justifyContent={`space-between`}
        >
          <Grid item xs={6}>
            <InputBase
              sx={{
                border: `solid #27272A 2px`,
                fontSize: `1.4rem`,
                width: `100%`,
                p: 1,
                borderRadius: 1
              }}
              onChange={(event: any) => {
                setSearch(event?.target?.value);
              }}
              onKeyDown={async (event) => {
                if (event.keyCode == 13) {
                  await getDataBySearch();
                }
              }}
              placeholder={`Please Input Collection Name.`}
            />
          </Grid>
        </Grid>
      </Container>

      <InfiniteScroll
        dataLength={data?.length}
        next={async () => { await fetchData() }}
        hasMore={hasMore}
        loader={
          <Typography component={`p`} variant={`h6`} sx={{ mt: 2, mx: `auto`, textAlign: `center` }}>
            Loading...
          </Typography>
        }
      >

        <Paper
          sx={{
            position: 'relative',
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Container maxWidth="lg" sx={{ zIndex: 1 }}>
            <Grid
              container
              direction="row"
              alignItems="stretch"
              spacing={2}
            >
              {data?.map((item: any, index: number) => {
                return (
                  <Grid item md={3} sm={4} xs={6} key={index}>
                    <ListItem
                      image={item.baseImage}
                      descript={item.description}
                      title={item.name}
                      symbol={item.symbol}
                    />
                  </Grid>
                );
              })}
            </Grid>

            {!data || data?.length < 1 && (
              <Typography
                variant="h5"
                textAlign="center"
                component="p"
                sx={{
                  my: 7,
                }}
              >
                No Collections ...
              </Typography>

            )}
          </Container>
        </Paper>
      </InfiniteScroll>

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
