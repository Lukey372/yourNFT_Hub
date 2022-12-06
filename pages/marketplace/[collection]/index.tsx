import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat, { InputAttributes } from 'react-number-format';

import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Button,
  Backdrop,
  Box,
  Container,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  CircularProgress,
  OutlinedInput,
  TextField,
  Typography,
  Tabs,
  Tab,
  Toolbar,
  SvgIcon,
  Avatar
} from "@mui/material";
import Chip from '@mui/material/Chip';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { styled, Theme, CSSObject } from '@mui/material/styles';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiDrawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, responsiveFontSizes } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import RemoveIcon from '@mui/icons-material/Remove';
import Widgets from '@mui/icons-material/List';
import { MARKETPLACES_API, serverUrl } from "src/common/config";
import commonService from "src/common/services/common.service";
import CloseIcon from '@mui/icons-material/Close';
import { dropsLoadingSelector } from "src/common/selectors";

import CollectionDetail from "src/components/collectionDetailComponents/collectionDetail";
import ListItem from "src/components/collectionNftListing/item";
import ActivityListing from "src/components/collectionActivityListing";

import Footer from "src/components/footer";
import Header from "src/components/header";

const pages = [
  { title: "News", url: "/news" },
  { title: "Drops", url: "/drops" },
  { title: "Services", url: "/services" },
  { title: "Marketplace", url: "/marketplace" },
  { title: "Feed", url: "/feed" },
];
const drawerWidth = `20%`;
const drawerAutoWidth = `300px`;

const openedMixin = (theme: Theme): CSSObject => ({
  [theme.breakpoints.up('md')]: { width: drawerWidth },
  [theme.breakpoints.down('md')]: { width: drawerAutoWidth },
  background: `${theme.palette.action.disabledBackground}`,
  borderRight: `solid #27272A 2px`,
  borderTop: `solid #27272A 2px`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: `#18181B`,
  borderRight: `solid #27272A 2px`,
  overflowX: 'hidden',
  width: `76px`
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  "& > div": {
    minHeight: `76px`
  },
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

//FILTER
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {

  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: `#18181B`,
  display: `flex`,
  minHeight: `76px`,
  alignItems: `center`,
  flexDirection: 'row-reverse',
  borderBottom: `2px solid #27272A`,
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    alignItems: `center`,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRight: `none`,
  borderBottom: `2px solid #27272A`,
  background: `#18181B`
}));
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface StyledTabProps {
  label: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </Box>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontFamily: `DM Sans`,
  fontSize: `1.1rem`,
  paddingLeft: `48px`,
  paddingRight: `48px`,
  marginLeft: `24px`,
  marginRight: `24px`,
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.text.primary,
    background: `#18181B`,
    borderRadius: `8px`,
    textDecoration: `none`
  },
  '&.Mui-focusVisible': {

  },
}));

export default function News() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const theme = createTheme()
  const router = useRouter();
  const { collection } = router.query;

  const [tab, setTab] = useState(0);
  const [grid, setGrid] = useState<boolean>(true);

  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [searchByPrice, setSearchByPrice] = useState<boolean>(true);

  const [startSearch, setStartSearch] = useState<boolean>(true);

  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [filter, setFilter] = useState<string>(`recent`);
  const [search, setSearch] = useState<string>(``);
  const [currencyType, setCurrencyType] = useState<string>(`sol`);

  const [hasMore, setHasMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [isshow, setShow] = useState(false)
  const [attributeFilter, setAttributeFilter] = useState<any>([]);

  const [data, setData] = useState({
    collection: {},
    nfts: { count: 0, rows: [] }
  });
  const [detailData, setDetailData] = useState<any>();
  const [nftData, setNftData] = useState<any>();
  const [owners, setOwners] = useState(0)
  const [supply, setSupply] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)
  const [floorPrice, setFloorPrice] = useState(0)

  useEffect(() => {
    (async () => {
      if (collection) {
        setLoading(true);
        let result: any;
        result = await commonService({
          method: "post",
          route: `${MARKETPLACES_API.GET_COLLECTION_DATA}`,
          data: {
            offset: 0,
            limit: 12,
            symbol: collection,
            sort: filter,
            search: search,
            price: {
              min: minPrice || 0.01,
              max: maxPrice || 9999
            },
            attributes: attributeFilter
          }
        });
        setData({ ...result });
        setOffset(0);
        if (result?.nfts?.rows?.length > 0) {
          setNftData([...result.nfts.rows]);
          if (result?.nfts?.rows?.length == 12) {
            setHasMore(true)
          }
        }
        else {
          setNftData([...[]]);
          setHasMore(false)
        }
        setLoading(false);
      }

    })()
  }, [collection, startSearch, filter, searchByPrice, attributeFilter]);

  useEffect(() => {
    (async () => {
      if (collection) {
        new Promise((myResolve, myReject) => {
          const data: any = commonService({
            method: `post`,
            route: `${MARKETPLACES_API.GET_COLLECTION_STATE}`,
            data: {
              symbol: collection,
            }
          });
          myResolve(data);
        }).then(async (res) => {
          const collectionInfo: any = res;
          console.log('collectionInfo', collectionInfo)
          if (collectionInfo?.collection?.symbol) {
            setDetailData({ ...collectionInfo.collection });
            setOwners(collectionInfo.collection.owners || 0)
            setSupply(collectionInfo.collection.totalSupply || 0)
            setTotalVolume(collectionInfo.collection.totalVolume || 0)
            setFloorPrice(collectionInfo.collection.floorPrice || 0)
          }
        });
      }
    })()
  }, [collection, startSearch, filter, searchByPrice, attributeFilter]);

  const getAttrByTrait = (trait: string) => {
    const filtered = attributeFilter.filter((attr) => { return attr?.trait_type == trait });
    if (filtered.length > 0) {
      return filtered[0].value;
    }
    return [];
  }

  const setAttributesFilter = (trait, values) => {
    const temp = attributeFilter;
    const index = temp.findIndex((attr) => { return attr?.trait_type == trait });
    if (index < 0) {
      if (values.length < 1) {
        temp.splice(index, 1);
      }
      else {
        temp.push({
          trait_type: trait,
          value: values
        })
      }
    }
    else {
      if (values.length < 1) {
        temp.splice(index, 1);
      }
      else {
        temp[index].value = values;
      }
    }
    setAttributeFilter([...temp]);
  }

  const fetchData = async () => {
    setOffset(offset + 12);
    let fetched: any;
    fetched = await commonService({
      method: "post",
      route: `${MARKETPLACES_API.GET_COLLECTION_DATA}`,
      data: {
        offset: offset + 12,
        limit: 12,
        symbol: collection,
        sort: filter,
        search: search,
        price: {
          min: minPrice || 0.01,
          max: maxPrice || 9999
        },
        attributes: attributeFilter
      }
    });
    if (fetched?.nfts?.rows?.length > 0 && Array.isArray(nftData)) {
      setNftData([...nftData, ...fetched.nfts.rows]);
    }

    if (fetched?.nfts?.rows?.length < 1) {
      setHasMore(false);
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showTabs = (event: React.SyntheticEvent, tab: number) => {
    setTab(tab);
  };

  return (
    <Fragment>
      <Header pages={pages} />
      <Box
        sx={{
          height: { md: "144px", xs: "88px" },
          borderRadius: { md: "0px 0px 60px 60px", xs: "0px 0px 36px 36px" },
          background: `url(${serverUrl}${detailData?.bannerImage})`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`
        }}
      />
      <Container maxWidth="lg">
        <CollectionDetail
          data={detailData}
          owners={owners}
          supply={supply}
          totalVolume={totalVolume}
          floorPrice={floorPrice}
        />
      </Container>

      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={showTabs} centered>
          <StyledTab label="Items" {...a11yProps(0)} />
          <StyledTab label="Activity" {...a11yProps(1)} />
          <StyledTab label="Price History" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <Box className={`mt-48 mb-48`} sx={{ display: 'flex', position: 'relative' }}>
          <AppBar position="absolute" open={open} sx={{
            ...(!open && { boxShadow: 'none' }),
            [theme.breakpoints.up('md')]: { width: `calc(100 % - 20 %)` },
            [theme.breakpoints.down('md')]: { width: `100%` },
          }}>
            <Toolbar style={{ paddingLeft: 0, paddingRight: 0, alignItems: `stretch`, minHeight: `76px` }}>
              <Box
                sx={{
                  ...(open && { display: 'none' }),
                  background: `#18181B`,
                  width: `76px`,
                  borderTop: `solid #27272Am2px`,
                  borderRight: `solid #27272A 2px`,

                }}
                className={`d-flex align-items-center justify-content-center`}
              >
                <SvgIcon className="d-flex align-items-center justify-content-between" sx={{ '&:hover': { cursor: `pointer` }, ...(open && { display: 'none' }) }} onClick={handleDrawerOpen}>
                  <path d="M10.08 2.08L18 10L10.08 17.92L8.67 16.5L14.17 11H0V9H14.17L8.67 3.5L10.08 2.08ZM18 10V20H20V0H18V10Z" fill="white" />
                </SvgIcon>
              </Box>

              <InputBase
                sx={{ [theme.breakpoints.down('md')]: { ml: 3 }, border: `solid #27272A 2px`, borderLeft: `none`, width: `55%`, fontSize: `1.4rem` }}
                className={`pl-16 pr-16`}
                onChange={(event: any) => {
                  if (!isNaN(event?.target?.value)) {
                    if (event?.target?.value?.length < 1) {
                      setSearch(``);
                    }
                    else {
                      const parsed = parseFloat(event?.target?.value);
                      setSearch(`${parsed}`);
                    }
                  }
                }}
                onKeyDown={async (event) => {
                  if (event.keyCode == 13) {
                    setStartSearch(!startSearch)
                  }
                }}
                value={search}
                placeholder={`Please input NFT Number.`}
              />

              <FormControl
                sx={{
                  border: `solid #27272A 2px`,
                  borderLeft: `none`,
                  width: `calc(45% - 76px - 76px - 4px)`,

                  ...(!open && { width: `calc(45% - 76px - 76px - 76px)` }),
                }}
              >
                <Select
                  displayEmpty
                  value={filter}
                  onChange={(event) => { setFilter(event.target.value) }}
                  input={<OutlinedInput />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    minHeight: `76px`,
                    fontSize: `1.4rem`,
                    "& svg": {
                      color: `primary.contrastText`
                    }
                  }}
                >
                  <MenuItem value="recent">
                    Recently Listed
                  </MenuItem>
                  <MenuItem value="price_low_to_high">
                    Price: Low to High
                  </MenuItem>
                  <MenuItem value="price_high_to_low">
                    Price: High to Low
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  width: `76px`,
                  border: `solid #27272A 2px`,
                  borderLeft: `none`
                }}
                className={`d-flex align-items-center justify-content-center`}
              >
                <GridViewSharpIcon
                  sx={{
                    width: `56px`,
                    color: grid ? 'primary.contrastText' : '#27272A',
                    '&:hover': {
                      cursor: `pointer`,
                      color: 'primary.contrastText'
                    }
                  }}
                  onClick={() => {
                    setGrid(true);
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: `76px`,
                  border: `solid #27272A 2px`,
                  borderLeft: `none`
                }}
                className={`d-flex align-items-center justify-content-center`}
              >
                <ViewComfyIcon
                  sx={{
                    width: `56px`,
                    color: !grid ? 'primary.contrastText' : '#27272A',
                    '&:hover': {
                      cursor: `pointer`,
                      color: 'primary.contrastText'
                    }
                  }}
                  onClick={() => {
                    setGrid(false);
                  }}
                />
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open} sx={{
            // [theme.breakpoints.down(`sm`)]: { position: `fixed` },
            // [theme.breakpoints.down(`sm`)]: { height: ` 100vh` },
            // [theme.breakpoints.down(`sm`)]: { left: 0 },
            // [theme.breakpoints.down(`sm`)]: { top: 0 },
            [theme.breakpoints.up('md')]: { display: 'block' },
            [theme.breakpoints.down('md')]: { display: isshow ? `block` : `none` },
          }} >
            {/* <DrawerHeader sx={{ borderBottom: `2px solid #27272A` }}>
              <Box className={`d-flex align-items-center justify-content-between`}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{
                  border: `none`,
                  '& .MuiAccordionSummary-content': {
                    marginLeft: 0
                  },
                }}>
                  <FilterListIcon sx={{ color: `#71717A` }} />
                  <Typography variant="h6" component="p" sx={{ color: `#71717A`, fontFamily: '"DM Sans", sans-serif' }} className="ml-16">Filter</Typography>
                </AccordionSummary>
              </Box>
              <SvgIcon className="d-flex align-items-center justify-content-between" sx={{ color: '#71717A', '&:hover': { cursor: `pointer` } }} onClick={handleDrawerClose}>
                <path d="M9.92 17.92L2 10L9.92 2.08L11.33 3.5L5.83 9H20V11H5.83L11.34 16.5L9.92 17.92ZM2 10V0H0V20H2V10Z" fill="#71717A" />
              </SvgIcon>
            </DrawerHeader> */}
            {
              open && <Box>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Box className={`d-flex align-items-center justify-content-between col-12`} >
                      <Box className={`d-flex align-items-center justify-content-between`}>
                        <FormatListBulletedIcon />
                        <Typography variant="h6" component="p" sx={{ fontFamily: '"DM Sans", sans-serif' }} className="ml-16">Price</Typography>
                      </Box>

                      <Box className={`d-flex align-items-center justify-content-between`}>
                        {expanded === 'panel1' && <RemoveIcon />}
                        {expanded != 'panel1' && <AddIcon />}
                      </Box>
                    </Box>

                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl
                      sx={{
                        background: `#27272A`,
                        borderRadius: `4px`,
                        width: `100%`,
                        border: `none`,
                        "& *": {
                          border: `none`
                        }
                      }}
                    >
                      <Select
                        displayEmpty
                        value={currencyType}
                        onChange={(event) => { setCurrencyType(event.target.value) }}
                        input={<OutlinedInput />}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                          border: `none`,
                          '& svg': { color: `primary.contrastText` }
                        }}
                      >
                        <MenuItem value="sol">
                          SOL
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <Grid container direction={`row`} alignItems={`center`} justifyContent={`space-between`}>
                      <Grid item md={5}>
                        <Box className={`d-flex align-items-stretch justify-content-center col-12 mt-8`} sx={{ width: `100%`, borderRadius: `4px`, "& *": { borderRadius: `4px` } }}>
                          <TextField
                            sx={{
                              width: `100%`,
                              bgcolor: "#27272A",
                              color: "grey",
                              border: `none`,
                              borderRadius: `4px`,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              '&:hover': {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRadius: `4px`
                              },
                              '&.MuiFormControl-root': {
                                borderRadius: `4px`,
                              }
                            }}
                            value={minPrice}
                            defaultValue={minPrice}
                            type={`number`}
                            onChange={(event: any) => {
                              if (!isNaN(event?.target?.value)) {
                                if (event?.target?.value?.length < 1) {
                                  setMinPrice(null);
                                }
                                else {
                                  const parsed = parseFloat(event?.target?.value);
                                  setMinPrice(parsed);
                                }
                              }
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={2} className={`d-flex align-items-center justify-content-center`}>
                        <Typography variant="body1" sx={{ color: `#71717A` }}>To</Typography>
                      </Grid>
                      <Grid item md={5}>
                        <Box className={`d-flex align-items-stretch justify-content-center col-12 mt-8`} sx={{ width: `100%`, borderRadius: `4px` }}>
                          <TextField
                            sx={{
                              width: `100%`,
                              bgcolor: "#27272A",
                              color: "grey",
                              border: `none`,
                              borderRadius: `4px`,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              '&:hover': {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                              },
                              '&.MuiFormControl-root': {
                                borderRadius: `4px !important`,
                              }
                            }}
                            type={`number`}
                            value={maxPrice}
                            defaultValue={maxPrice}
                            onChange={(event: any) => {
                              if (!isNaN(event?.target?.value)) {
                                if (event?.target?.value?.length < 1) {
                                  setMaxPrice(null);
                                }
                                else {
                                  const parsed = parseFloat(event?.target?.value);
                                  setMaxPrice(parsed);
                                }
                              }
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item md={12}>
                        <Button
                          sx={{
                            width: `100%`,
                            color: theme => theme.palette.text.primary,
                            border: theme => `solid 1px ${theme.palette.text.primary}`,
                            mt: 1,
                            py: 1
                          }}
                          onClick={() => { setSearchByPrice(!searchByPrice) }}
                        >
                          Search By Price
                        </Button>
                      </Grid>
                    </Grid>

                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" >
                    <Box className={`d-flex align-items-center justify-content-between col-12`}>
                      <Box className={`d-flex align-items-center justify-content-between`}>
                        <SvgIcon className="d-flex align-items-center justify-content-between" viewBox="0 0 28 28">
                          <path d="M10.6667 16V26.6666H0V16H10.6667ZM8 18.6666H2.66667V24H8V18.6666ZM12 0.666626L19.3333 12.6666H4.66667L12 0.666626ZM12 5.81329L9.44 9.99996H14.56L12 5.81329ZM19.3333 15.3333C22.6667 15.3333 25.3333 18 25.3333 21.3333C25.3333 24.6666 22.6667 27.3333 19.3333 27.3333C16 27.3333 13.3333 24.6666 13.3333 21.3333C13.3333 18 16 15.3333 19.3333 15.3333ZM19.3333 18C18.4493 18 17.6014 18.3511 16.9763 18.9763C16.3512 19.6014 16 20.4492 16 21.3333C16 22.2173 16.3512 23.0652 16.9763 23.6903C17.6014 24.3154 18.4493 24.6666 19.3333 24.6666C20.2174 24.6666 21.0652 24.3154 21.6904 23.6903C22.3155 23.0652 22.6667 22.2173 22.6667 21.3333C22.6667 20.4492 22.3155 19.6014 21.6904 18.9763C21.0652 18.3511 20.2174 18 19.3333 18Z" fill="white" />
                        </SvgIcon>

                        <Typography variant="h6" component="p" sx={{ fontFamily: '"DM Sans", sans-serif' }} className="ml-16">Attributes</Typography>
                      </Box>

                      <Box className={`d-flex align-items-center justify-content-between`}>
                        {expanded === 'panel2' && <RemoveIcon />}
                        {expanded != 'panel2' && <AddIcon />}
                      </Box>
                    </Box>

                  </AccordionSummary>
                  <AccordionDetails>
                    {
                      detailData?.attributes?.map((attr, index) => {
                        return <Box sx={{ py: 1 }} key={index}>
                          <FormControl
                            sx={{
                              background: `#27272A`,
                              borderRadius: `4px`,
                              width: `100%`,
                              border: `none`,
                              "& *": {
                                border: `none`
                              }
                            }}
                          >
                            <Select
                              displayEmpty
                              multiple
                              value={getAttrByTrait(attr?.trait_type)}
                              onChange={(event) => {
                                const { target: { value } } = event;
                                const val = typeof value === 'string' ? value.split(',') : value;
                                setAttributesFilter(attr?.trait_type, val)
                              }}
                              input={<OutlinedInput />}
                              inputProps={{ 'aria-label': 'Without label' }}
                              sx={{
                                border: `none`,
                                '& svg': { color: `primary.contrastText` }
                              }}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <em>{attr?.trait_type}</em>;
                                }
                                return (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )
                              }}
                            >
                              <MenuItem disabled value="">
                                <em>{attr?.trait_type}</em>
                              </MenuItem>
                              {
                                attr?.value?.map((val, valIndex) => {
                                  return <MenuItem value={val} key={valIndex}>
                                    {val}
                                  </MenuItem>
                                })
                              }

                            </Select>
                          </FormControl>
                        </Box>
                      })
                    }

                  </AccordionDetails>
                </Accordion>
              </Box>
            }

          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 4, minHeight: `100vh` }}>
            <DrawerHeader />
            <InfiniteScroll
              dataLength={nftData?.length || 0}
              next={fetchData}
              hasMore={hasMore}
              loader={
                <Typography component={`p`} variant={`h6`} sx={{ mt: 2, mx: `auto`, textAlign: `center` }}>
                  Loading...
                </Typography>
              }
            >
              <Box
                sx={{
                  // width: {
                  //   md: `20%`,
                  //   xs: `100%`
                  // },
                  display: `grid`,
                  flexWrap: `wrap`,
                  alignContent: `flex-start`,
                  gridGap: 16,
                  gridTemplateColumns: `repeat(auto-fill,minmax(${grid ? '14vw' : '11vw'},1fr))`
                }}
              >

                {
                  nftData?.length == 0 &&
                  <Box sx={{
                    position: `absolute`,
                    left: {
                      md: `45%`,
                      xs: `30%`
                    },
                    top: `30%`,
                    width: `350px`,
                    height: `350px`,
                    textAlign: `center`
                  }} >
                    <Box component={`img`} src={`/images/galaxy.svg`} sx={{
                    }} />
                    <Typography sx={{
                      mt: 1,
                      fontSize: `20px`,
                      fontWeight: `700`
                    }}>OOPS! </Typography>

                    <Typography sx={{
                      mt: 1,
                      fontSize: `16px`,
                      fontWeight: `500`,
                      color: `#71717A;`
                    }} >It seems there’s no item you’re looking for. Give it another shot!</Typography>
                  </Box>
                }



                {
                  (nftData?.length > 0 ? nftData : []).map((_item, _index) => {
                    return <ListItem
                      image={`${_item.image}`}
                      title={`${_item.name}`}
                      curPrice={`${_item.price}`}
                      lastPrice={`${_item.price}`}
                      address={`${_item.mintAddress}`}
                      mode={true}
                    />
                  })
                }

              </Box>
            </InfiniteScroll>
          </Box>

          <Widgets
            onClick={() => setShow(!isshow)}
            sx={{
              position: `absolute`,
              left: 0,
              top: `20px`,
              [theme.breakpoints.down('md')]: { display: 'block' },
              [theme.breakpoints.up('md')]: { display: `none` },
              fontSize: 40,
              cursor: `pointer`
            }} />

          <CloseIcon
            onClick={() => setShow(false)}
            sx={{
              zIndex: 2,
              position: `absolute`,
              left: `273px`,
              top: `4px`,
              [theme.breakpoints.down('md')]: { display: isshow ? 'block' : `none` },
              [theme.breakpoints.up('md')]: { display: `none` },
              fontSize: 25,
              cursor: `pointer`
            }}
          />

        </Box>
      </TabPanel >

      <TabPanel value={tab} index={1}>
        <ActivityListing />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <h5 style={{
          width: `100%`,
          textAlign: `center`
        }}>
          Price History
        </h5>
      </TabPanel>

      <Box sx={{ height: "10vh" }} />
      <Footer />

      {
        loading && (
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
        )
      }
    </Fragment >
  );
}
