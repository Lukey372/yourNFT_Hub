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

import { MARKETPLACES_API } from "src/common/config";

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

import commonService from "src/common/services/common.service";

import { faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { dropsLoadingSelector } from "src/common/selectors";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drops from "src/components/collectionActivityListing";
import Footer from "src/components/footer";
import GuidesnLists from "src/components/guidesnLists";
import Header from "src/components/header";
import StyledGradPaper from "src/common/shared/components/gradPaper";
import ButtonWhite from "src/theme/buttonWhite";
import ProfileDetail from "src/components/profileDetailComponens/";

import { SolanaClient, SolanaClientProps } from 'src/common/helpers/sol';

import { useRouter } from "next/router";
import Link from "next/link";
import { fetchSingleDropsStart } from "src/common/slices/drops.slice";
import Overview from "src/components/dropsDetailComponents/overview";
import CollectionDetail from "src/components/collectionDetailComponents/collectionDetail";
import Advert from "src/components/advert";
import { handleImageError } from "src/common/utils/handleImageError";
import BiddingTable from "src/components/myProfile/biddingTable";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";

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

const pages = [
  { title: "News", url: "/news" },
  { title: "Drops", url: "/drops" },
  { title: "Services", url: "/services" },
  { title: "Marketplace", url: "/marketplace" },
  { title: "Feed", url: "/feed" },
];

export default function Biddings() {
  const dispatch = useDispatch();

  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const solanaClient = new SolanaClient({ rpcEndpoint: `` } as SolanaClientProps);
  const router = useRouter();
  const { dropsId } = router.query;
  //const loading = useSelector(dropsLoadingSelector);
  const [loading, setLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [filter, setFilter] = useState<string>(`recent`);

  const [rarity, setRarity] = useState<boolean>(false);

  const [owned, setOwned] = useState(0);
  const [listed, setListed] = useState(0);
  const [minWallet, setMinWallet] = useState(0);
  const [offerReceived, setOfferReceived] = useState(0);
  const [offerPlaced, setOfferPlaced] = useState(0);
  const [ratioPurchase, setRatioPurchase] = useState(0)
  const [amountTraded, setAmountTraded] = useState(0)
  const [messageReceived, setMessageReceived] = useState(0);
  const [purchased, setPurchased] = useState(0);
  const [sold, setSold] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const wallets = [wallet!.publicKey!.toString()];
        const nftsInWallet = await solanaClient.getAllCollectibles(wallets, []);
        if (nftsInWallet[wallet!.publicKey!.toString()]) {
          let temp = nftsInWallet[wallet!.publicKey!.toString()] || [];
          setOwned(temp?.length);
        }
        const listedNfts: any = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_NFTS_WALLET}${wallet.publicKey.toBase58()}`,
        });
        setListed(listedNfts?.length || 0);
        const statistics: any = await commonService({
          method: `get`,
          route: `${MARKETPLACES_API.GET_STATISTICS}/${wallet.publicKey.toBase58()}`,

        })
        setOfferReceived(statistics.receivedOffer || 0)
        setOfferPlaced(statistics.placedOffer || 0)
        setAmountTraded(statistics.amountTraded || 0)
        setMessageReceived(statistics.message || 0)

        setPurchased(statistics.purchasedCount || 0)
        setSold(statistics.soldCount || 0)
      }
    })()
    // eslint-disable-next-line
  }, [wallet]);

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
            purchased: purchased || 0,
            sold: sold || 0
          }} />
      </Container>

      <Box className={`mt-48 mb-48`} sx={{ display: 'flex', position: 'relative' }}>
        <AppBar position="absolute" open={true}>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0, alignItems: `stretch`, minHeight: `80px` }}>
            <Box
              sx={{
                width: `100%`,
                border: `solid #27272A 2px`,
                borderLeft: `none`,
                pl: 3
              }}
              className={`d-flex align-items-center`}
            >
              <Typography variant="h4">My Bids</Typography>
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
                  <Typography variant="h5" component="p" className="ml-16" color={`grey.500`}>My NFTs</Typography>
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
                      <FormatListBulletedIcon sx={{ color: `grey.500` }} />
                      <Typography variant="h5" component="p" color={`grey.500`} className="ml-16" >My Listings</Typography>
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
                      <Typography variant="h5" component="p" className="ml-16" sx={{ color: `grey.500` }} >Activity</Typography>
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
                        <path d="M10.6667 16V26.6666H0V16H10.6667ZM8 18.6666H2.66667V24H8V18.6666ZM12 0.666626L19.3333 12.6666H4.66667L12 0.666626ZM12 5.81329L9.44 9.99996H14.56L12 5.81329ZM19.3333 15.3333C22.6667 15.3333 25.3333 18 25.3333 21.3333C25.3333 24.6666 22.6667 27.3333 19.3333 27.3333C16 27.3333 13.3333 24.6666 13.3333 21.3333C13.3333 18 16 15.3333 19.3333 15.3333ZM19.3333 18C18.4493 18 17.6014 18.3511 16.9763 18.9763C16.3512 19.6014 16 20.4492 16 21.3333C16 22.2173 16.3512 23.0652 16.9763 23.6903C17.6014 24.3154 18.4493 24.6666 19.3333 24.6666C20.2174 24.6666 21.0652 24.3154 21.6904 23.6903C22.3155 23.0652 22.6667 22.2173 22.6667 21.3333C22.6667 20.4492 22.3155 19.6014 21.6904 18.9763C21.0652 18.3511 20.2174 18 19.3333 18Z" fill="white" />
                      </SvgIcon>
                      <Typography variant="h5" component="p" className="ml-16">My Bids</Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
              </Link>
            </Accordion>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, padding: `24px`, minHeight: `100vh` }}>
          <DrawerHeader />
          <BiddingTable />
        </Box>
      </Box>

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
