import { Avatar, Container, Skeleton, Backdrop, CircularProgress, TextField, SvgIcon } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  fetchNewsStart,
  fetchSingleNewsStart,
} from "src/common/slices/news.slice";
import Image from "next/image";
import FilterListIcon from '@mui/icons-material/FilterList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import RefreshIcon from '@mui/icons-material/Refresh';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import InterestsIcon from '@mui/icons-material/Interests';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import InputBase from '@mui/material/InputBase';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';

import {
  Keypair,
  Commitment,
  Connection,
  RpcResponseAndContext,
  SignatureStatus,
  SimulatedTransactionResponse,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
  Blockhash,
  FeeCalculator,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SolanaClient, SolanaClientProps } from 'src/common/helpers/sol';

import { MARKETPLACES_API } from "src/common/config";
import { dropsLoadingSelector } from "src/common/selectors";
import commonService from "src/common/services/common.service";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drops from "src/components/collectionActivityListing";
import Footer from "src/components/footer";
import GuidesnLists from "src/components/guidesnLists";
import Header from "src/components/header";
import StyledGradPaper from "src/common/shared/components/gradPaper";
import ButtonWhite from "src/theme/buttonWhite";
import ProfileDetail from "src/components/profileDetailComponens/";

import { useRouter } from "next/router";
import Link from "next/link";
import { fetchSingleDropsStart } from "src/common/slices/drops.slice";
import Overview from "src/components/dropsDetailComponents/overview";
import CollectionDetail from "src/components/collectionDetailComponents/collectionDetail";
import ListItem from "src/components/collectionNftListing/item";
import Advert from "src/components/advert";
import { handleImageError } from "src/common/utils/handleImageError";

import NftDetailModal from 'src/components/myProfile/NftDetailModal';

const { PublicKey, SystemProgram } = anchor.web3;

const drawerWidth = `20%`;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  background: `#18181B`,
  borderRight: `solid #27272A 2px`,
  borderTop: `solid #27272A 2px`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
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
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 9,
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
  alignItems: `center`,
  flexDirection: 'row-reverse',
  borderBottom: `2px solid #27272A`,
  minHeight: `76px`,
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

const pages = [
  { title: "News", url: "/news" },
  { title: "Drops", url: "/drops" },
  { title: "Services", url: "/services" },
  { title: "Marketplace", url: "/marketplace" },
  { title: "Feed", url: "/feed" },
];

export default function listing() {
  const dispatch = useDispatch();

  const anchorWallet = useAnchorWallet();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const solanaClient = new SolanaClient({ rpcEndpoint: `` } as SolanaClientProps);
  const router = useRouter();
  const { dropsId } = router.query;
  //const loading = useSelector(dropsLoadingSelector);
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>();
  const [search, setSearch] = useState<string>(``);

  const [owned, setOwned] = useState(0);
  const [listed, setListed] = useState(0);
  const [minWallet, setMinWallet] = useState(0);
  const [offerReceived, setOfferReceived] = useState(0);
  const [offerPlaced, setOfferPlaced] = useState(0);
  const [ratioPurchase, setRatioPurchase] = useState(0)
  const [amountTraded, setAmountTraded] = useState(0)
  const [messageReceived, setMessageReceived] = useState(0)

  const [sold, setSold] = useState(0)
  const [purchased, setPurchased] = useState(0)

  const [modalData, setModalData] = useState<any>();

  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(0)
  const handleClickOpen = (_modalType: React.SetStateAction<number>) => {
    setModalType(_modalType);
    setOpen(true);
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        setLoading(true);
        const listedNfts: any = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_NFTS_WALLET}${wallet.publicKey.toBase58()}`,
        });
        const filtered = (listedNfts as any).filter((nft) => {
          return nft.name.toLowerCase().includes(search.toLowerCase())
        }).sort((a: any, b: any) => {
          return b?.price - a?.price;
        });

        const wallets = [wallet!.publicKey!.toString()];
        const nftsInWallet = await solanaClient.getAllCollectibles(wallets, []);
        if (nftsInWallet[wallet!.publicKey!.toString()]) {
          let temp = nftsInWallet[wallet!.publicKey!.toString()] || [];
          setOwned(temp?.length);
        }

        setListed(listedNfts?.length || 0);

        setData(filtered);
        setLoading(false);

        const statistics: any = await commonService({
          method: `get`,
          route: `${MARKETPLACES_API.GET_STATISTICS}/${wallet.publicKey.toBase58()}`,

        })
        setOfferReceived(statistics.receivedOffer || 0)
        setOfferPlaced(statistics.placedOffer || 0)
        setAmountTraded(statistics.amountTraded || 0)
        setMessageReceived(statistics.message || 0)

        setSold(statistics.soldCount || 0)
        setPurchased(statistics.purchasedCount || 0)
      }
    })()
    // eslint-disable-next-line
  }, [wallet, refresh, search]);

  React.useEffect(() => {
    (async () => {
      if (anchorWallet) {
        const walletBalance = await connection.getBalance(anchorWallet.publicKey);
        setMinWallet(Math.ceil(walletBalance / LAMPORTS_PER_SOL) || 0)
      }
    })()
  }, [anchorWallet]);

  return (
    <Fragment>
      <Header pages={pages} />

      <Container maxWidth="xl">
        <ProfileDetail
          data={{
            minWallet: minWallet || 0,
            owned: owned || 0,
            listed: listed || 0,
            offerReceived: offerReceived || 0,
            offerPlaced: offerPlaced || 0,
            amountTraded: amountTraded || 0,
            messageReceived: messageReceived || 0,
            sold: sold,
            purchased: purchased
          }} />
      </Container>

      <Box className={`mt-48 mb-48`} sx={{ display: 'flex', position: 'relative' }}>
        <AppBar position="absolute" open={true}>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0, alignItems: `stretch`, minHeight: `80px` }}>
            <Box
              sx={{
                width: `30%`,
                border: `solid #27272A 2px`,
                borderLeft: `none`,
                pl: 3
              }}
              className={`d-flex align-items-center`}
            >
              <Typography variant="h4">My Listings</Typography>
            </Box>

            <InputBase
              sx={{ border: `solid #27272A 2px`, borderLeft: `none`, width: `calc(70% - 76px)`, fontSize: `1.4rem` }}
              placeholder="Search"
              className={`pl-16`}
              onChange={(event) => {
                if (event.target.value.length > 2) {
                  setSearch(event.target.value)
                }
              }}
            />

            <Box
              sx={{
                width: `76px`,
                border: `solid #27272A 2px`,
                borderLeft: `none`
              }}
              className={`d-flex align-items-center justify-content-center`}
            >
              <RefreshIcon
                sx={{
                  color: 'primary.contrastText',
                  '&:hover': {
                    cursor: `pointer`
                  }
                }}
                onClick={() => { setRefresh(!refresh) }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={true}>
          <DrawerHeader
            sx={{ borderBottom: `2px solid #27272A`, '&:hover': { cursor: `pointer ` } }}
          >
            <Link href={'/me'}>
              <Box
                className={`d-flex align-items-center justify-content-between col-12`}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{
                    border: `none`,
                    '& .MuiAccordionSummary-content': {
                      marginLeft: 0
                    }
                  }}
                >
                  <ViewModuleIcon sx={{ color: `grey.500` }} />
                  <Typography variant="h5" component="p" sx={{ color: `grey.500` }} className="ml-16">My NFTs</Typography>
                </AccordionSummary>
              </Box>
            </Link>
          </DrawerHeader>
          <Box>
            <Accordion >
              <Link href={'/me/listing'}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Box className={`d-flex align-items-center justify-content-between col-12`}>
                    <Box className={`d-flex align-items-center justify-content-between`}>
                      <FormatListBulletedIcon />
                      <Typography variant="h5" component="p" className="ml-16">My Listings</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
              </Link>
            </Accordion>

            <Accordion>
              <Link href={'/me/activity'}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" >
                  <Box className={`d-flex align-items-center justify-content-between col-12`}>
                    <Box className={`d-flex align-items-center justify-content-between`}>
                      <HistoryIcon sx={{ color: `grey.500` }} />
                      <Typography variant="h5" component="p" className="ml-16" sx={{ color: `grey.500` }}>Activity</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
              </Link>
            </Accordion>

            <Accordion>
              <Link href={'/me/biddings'}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" >
                  <Box className={`d-flex align-items-center justify-content-between col-12`}>
                    <Box className={`d-flex align-items-center justify-content-between`}>
                      <SvgIcon className="d-flex align-items-center justify-content-between" viewBox="0 0 28 28">
                        <path d="M10.6667 16.0003V26.667H0V16.0003H10.6667ZM8 18.667H2.66667V24.0003H8V18.667ZM12 0.666992L19.3333 12.667H4.66667L12 0.666992ZM12 5.81366L9.44 10.0003H14.56L12 5.81366ZM19.3333 15.3337C22.6667 15.3337 25.3333 18.0003 25.3333 21.3337C25.3333 24.667 22.6667 27.3337 19.3333 27.3337C16 27.3337 13.3333 24.667 13.3333 21.3337C13.3333 18.0003 16 15.3337 19.3333 15.3337ZM19.3333 18.0003C18.4493 18.0003 17.6014 18.3515 16.9763 18.9766C16.3512 19.6018 16 20.4496 16 21.3337C16 22.2177 16.3512 23.0656 16.9763 23.6907C17.6014 24.3158 18.4493 24.667 19.3333 24.667C20.2174 24.667 21.0652 24.3158 21.6904 23.6907C22.3155 23.0656 22.6667 22.2177 22.6667 21.3337C22.6667 20.4496 22.3155 19.6018 21.6904 18.9766C21.0652 18.3515 20.2174 18.0003 19.3333 18.0003Z" fill="#71717A" />
                      </SvgIcon>
                      <Typography variant="h5" component="p" color={`grey.500`} className="ml-16">My Bids</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
              </Link>
            </Accordion>
          </Box>

        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, padding: `24px`, minHeight: `100vh` }}>
          <DrawerHeader />
          <StyledGradPaper sx={{
            borderRadius: `0`,
            borderBottomRightRadius: `20px`,
            borderBottomLeftRadius: `20px`,
            '& .gradient-div': {
              background: `linear-gradient(180deg, #000000 0%, #3f3f46 100%)`,
              height: `100%`
            },
            mb: 4
          }}>
            <Grid container direction={`row`} alignItems={`stretch`} spacing={2} sx={{ p: 1 }}>
              {
                data?.map((nft: any, index: number) => {
                  return (
                    <Grid
                      item
                      md={3}
                      key={index}
                      onClick={
                        (event) => {
                          event.preventDefault();
                          handleClickOpen(5);
                          setModalData({ ...nft });
                        }
                      }
                    >
                      <ListItem image={nft.image} title={nft.name} curPrice={nft.price} lastPrice={nft.price} sx={{ width: `100%` }} address={nft.mint} data={nft} />
                    </Grid>
                  );
                })
              }
            </Grid>
          </StyledGradPaper>
        </Box>
      </Box>

      <Box sx={{ height: "10vh" }} />
      <Footer />
      <NftDetailModal open={open} setRefresh={setRefresh} refresh={refresh} setOpen={setOpen} modalType={modalType} data={modalData} />
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
