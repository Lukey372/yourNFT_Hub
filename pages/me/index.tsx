import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Container, CircularProgress, Backdrop, SvgIcon } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import MuiAccordionSummary, { AccordionSummaryProps, } from '@mui/material/AccordionSummary';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import Widgets from '@mui/icons-material/List';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { createTheme, responsiveFontSizes } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import StyledGradPaper from "src/common/shared/components/gradPaper";

import * as anchor from '@project-serum/anchor';
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
import { useConnection, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SolanaClient, SolanaClientProps } from 'src/common/helpers/sol';
const { PublicKey, SystemProgram } = anchor.web3;

import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";

import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import type { Options } from "@nfteyez/sol-rayz";

import commonService from "src/common/services/common.service";
import { MARKETPLACES_API, serverUrl } from "src/common/config";
import { dropsLoadingSelector } from "src/common/selectors";

import { handleImageError } from "src/common/utils/handleImageError";
import getCollectionSymbol from "src/common/utils/getCollectionSymbol";

import ButtonWhite from "src/theme/buttonWhite";

import Footer from "src/components/footer";
import Header from "src/components/header";

import ProfileDetail from "src/components/profileDetailComponens/";
import ListItem from "src/components/collectionNftListing/item";

import NftDetailModal from 'src/components/myProfile/NftDetailModal';
import { breakpoints } from "@mui/system";

const drawerWidth = `20%`;
const drawerAutoWidth = `290px`;


const openedMixin = (theme: Theme): CSSObject => ({
  // width: drawerWidth,
  [theme.breakpoints.up('sm')]: { width: drawerWidth },
  [theme.breakpoints.down('sm')]: { width: drawerAutoWidth },
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

interface WalletInfo {
  address: string,
  balance: number
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

const pages = [
  { title: "News", url: "/news" },
  { title: "Drops", url: "/drops" },
  { title: "Services", url: "/services" },
  { title: "Marketplace", url: "/marketplace" },
  { title: "Feed", url: "/feed" },
];

export default function myNfts() {
  const dispatch = useDispatch();
  const theme = createTheme()
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const solanaClient = new SolanaClient({ rpcEndpoint: `` } as SolanaClientProps);
  const router = useRouter();
  const { dropsId } = router.query;
  //const loading = useSelector(dropsLoadingSelector);
  const [loading, setLoading] = useState<boolean>(false);

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

  const anchorWallet = useAnchorWallet();
  const [walletInfo, setWalletInfo] = React.useState<WalletInfo>({ address: ``, balance: 0 });

  const [data, setData] = useState([]);
  const [isshow, setShow] = useState(false)
  const [modalData, setModalData] = useState<any>();
  const [search, setSearch] = useState<string>(``);

  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(0)
  const handleClickOpen = (_modalType: React.SetStateAction<number>) => {
    setModalType(_modalType);
    setOpen(true);
  };

  const arrangeNftsByCollectionsInWallet = async (nfts: any, listedCollections: any, listedNfts: any, search: any) => {
    let result = [];
    try {
      if (nfts.length > 0) {
        const filteredNfts = nfts.filter((nft: any) => { return nft.name.toLowerCase().includes(search.toLowerCase()) });
        const listedNftMintAddrsInWallet = getListedNftMintInWallet(listedNfts);
        const collections = getCollectionsInWallet(filteredNfts, listedCollections);

        const temp = collections.sort((a: any, b: any) => { return a.symbol.localeCompare(b.symbol) });
        for (let i = 0; i < temp.length; i++) {
          const nftsByCollection = getNftsByCollectionInWallet(filteredNfts, temp[i].symbol, listedNftMintAddrsInWallet, listedNfts);

          const prices = nftsByCollection.map((nft: any) => {
            return nft?.price || 1000000000;
          });

          const floorRes = Math.min(...prices);

          result[i] = {
            collection: temp[i],
            floor: floorRes ? (floorRes == 1000000000 ? 0 : floorRes) : 0,
            nfts: nftsByCollection.sort((a: any, b: any) => { return a.name.localeCompare(b.name) })
          }
        }
      }
    }
    catch (err) {
      result = [];
    }
    finally {
      return result;
    }
  }

  const getPrice = (listedNfts: any, mintAddress) => {
    for (let i = 0; i < listedNfts.length; i++) {
      if (listedNfts[i].mintAddress == mintAddress) {
        return listedNfts[i].price;
      }
    }
    return 0;
  }

  const getListedNftMintInWallet = (listedNfts: any) => {
    let result = [];
    try {
      for (let i = 0; i < listedNfts.length; i++) {
        if (listedNfts[i].mintAddress) {
          result.push(listedNfts[i].mintAddress);
        }
      }
    }
    catch (err) {
      result = [];
    }
    finally {
      return result;
    }
  }

  const getListedCollectionSymbols = (listedCollections: any) => {
    let result = [];
    try {
      for (let i = 0; i < listedCollections.length; i++) {
        if (listedCollections[i].symbol) {
          result.push(listedCollections[i].symbol);
        }
      }
    }
    catch (err) {
      result = [];
    }
    finally {
      return result;
    }
  }

  const getNftsByCollectionInWallet = (nfts: any, symbol: string, listedNftMintInWallet: any, listedNfts: any) => {
    let result = [];
    nfts.forEach((nft: any, index: number) => {
      const nftsymbol = getCollectionSymbol(nft.name);
      if (nftsymbol == symbol) {
        const price = getPrice(listedNfts, nft.mint);
        if (listedNftMintInWallet.includes(nft.mint)) {
          result.push({ ...nft, isListed: true, price: price });
        }
        else {
          result.push({ ...nft, isListed: false, price: price });
        }
      }
    });

    return result;
  }

  const getCollectionsInWallet = (nfts: any, listedSymbols: any) => {
    let result = []; let com = [];
    const listedCollectionSymbols = getListedCollectionSymbols(listedSymbols);
    if (nfts.length > 0) {
      nfts.forEach(async (nft: any, index: any) => {
        const symbol = getCollectionSymbol(nft.name);
        com.push(symbol);
        if (com.indexOf(symbol) === index && listedCollectionSymbols.includes(symbol)) {
          result.push({
            symbol: symbol,
            detail: listedSymbols.filter((value: any, index: number) => { return symbol == value.nftName; })[0]
          });
        }
      });
      return result;
    }

    return [];
  }

  useEffect(() => {
    (async () => {
      if (wallet && wallet?.publicKey) {
        setLoading(true);
        const wallets = [wallet!.publicKey!.toString()];

        let nftsInWallet = await solanaClient.getAllCollectibles(wallets, []);
        if (nftsInWallet[wallet!.publicKey!.toString()]) {
          let temp = nftsInWallet[wallet!.publicKey!.toString()] || [];
          setOwned(temp?.length);

          let listedNfts: any = await commonService({
            method: "get",
            route: `${MARKETPLACES_API.GET_NFTS_WALLET}${wallet.publicKey.toBase58()}`,
          });

          setListed(listedNfts?.length || 0);
          const collections: any = await commonService({
            method: "post",
            route: `${MARKETPLACES_API.ALL_COLLECTIONS}`,
            data: {
              name: ``
            }
          });

          const statistics: any = await commonService({
            method: `get`,
            route: `${MARKETPLACES_API.GET_STATISTICS}/${wallet.publicKey.toBase58()}`,

          })
          setOfferReceived(statistics.receivedOffer || 0)
          setOfferPlaced(statistics.placedOffer || 0)
          setAmountTraded(statistics.amountTraded || 0)
          setMessageReceived(statistics.message || 0)

          setPurchased(statistics?.purchasedCount || 0)
          setSold(statistics?.soldCount || 0)

          const arranged = await arrangeNftsByCollectionsInWallet(nftsInWallet[wallet!.publicKey!.toString()], collections, listedNfts, search);
          setData([...arranged]);
          setLoading(false);
        }
        else {
          setData([]);
        }
      }
      else {
        setData([]);
      }
    })()
    // eslint-disable-next-line
  }, [wallet, refresh, search]);

  React.useEffect(() => {
    (async () => {
      if (anchorWallet) {
        const walletBalance = await connection.getBalance(anchorWallet.publicKey);
        setWalletInfo({ ...walletInfo, address: anchorWallet.publicKey.toBase58(), balance: walletBalance / LAMPORTS_PER_SOL });
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
            sold: sold
          }} />
      </Container>

      <Box className={`mt-48 mb-48`} sx={{ display: 'flex', position: 'relative' }}>
        <AppBar position="absolute" open={true} sx={{
          [theme.breakpoints.up('md')]: { width: `calc(100 % - 20 %)` },
          [theme.breakpoints.down('md')]: { width: `100%` },
        }} >
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0, alignItems: `stretch`, minHeight: `80px` }}>
            <Box
              sx={{
                width: `30%`,
                border: `solid #27272A 2px`,
                borderLeft: `none`,
                pl: 3,
                [theme.breakpoints.down('md')]: { ml: 3 }
              }}
              className={`d-flex align-items-center`}
            >
              <Typography variant="h4">My NFTs</Typography>
            </Box>

            <InputBase
              sx={{
                border: `solid #27272A 2px`,
                borderLeft: `none`,
                width: `calc(70% - 76px)`,
                // [theme.breakpoints.up('md')]: { width: `calc(70% - 76px)` },
                // [theme.breakpoints.down('md')]: { width: `100%` },
                fontSize: `1.4rem`
              }}
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

        <Drawer variant="permanent" open={true} sx={{
          zIndex: {
            xs: `1`,
          },
          [theme.breakpoints.down(`sm`)]: { position: `fixed` },
          [theme.breakpoints.down(`sm`)]: { height: ` 100vh` },
          [theme.breakpoints.down(`sm`)]: { left: 0 },
          [theme.breakpoints.down(`sm`)]: { top: 0 },
          [theme.breakpoints.up('sm')]: { display: 'block' },
          [theme.breakpoints.down('sm')]: { display: isshow ? `block` : `none` },
        }} >
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
                  <ViewModuleIcon />
                  <Typography variant="h5" component="p" className="ml-16">My NFTs</Typography>
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
                      <Typography variant="h5" component="p" className="ml-16" sx={{ color: `grey.500` }}>My Listings</Typography>
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


        <Box component="main" sx={{
          //  display:isshow?`none`:`block`
          flexGrow: 1,
          padding: `24px`,
          minHeight: `100vh`
        }}>
          <DrawerHeader />
          {
            data.map((collection, index) => {
              return (
                <StyledGradPaper key={index} sx={{
                  borderRadius: `0`,
                  borderBottomRightRadius: `20px`,
                  borderBottomLeftRadius: `20px`,
                  '& .gradient-div': {
                    background: `linear-gradient(180deg, #000000 0%, #3f3f46 100%)`,
                    height: `100%`
                  },
                  mb: 4
                }}>
                  <Box sx={{
                    display: "flex",
                    // [theme.breakpoints.up('md')]: { display: `flex` },
                    [theme.breakpoints.down('md')]: { flexDirection: `column` },
                    // [theme.breakpoints.down('md')]: { gap: `10px` },
                    alignItems: "center",
                    p: 3,
                    pb: 0,
                    gap: `10px`
                  }}>
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        alt='Remy Sharp'
                        src={``}
                        sx={{
                          // width: 60,
                          // height: 60,
                          // [theme.breakpoints.up('md')]: { width: `60px` },
                          // [theme.breakpoints.down('md')]: { width: `200px` },
                          // [theme.breakpoints.up('md')]: { height: `60px` },
                          // [theme.breakpoints.down('md')]: { height: `200px` },
                          width: {
                            md: 60,
                            xs: 200
                          },
                          height: {
                            md: 60,
                            xs: 200
                          },
                          border: 2,
                          borderColor: `#71717A`
                        }}
                      >
                        <Box
                          component={`img`}
                          src={collection.collection?.detail?.baseImage ? `${serverUrl}${collection.collection?.detail?.baseImage}` : `https://miro.medium.com/max/1400/1*KEvDO3KjbB4PkdJt5BjGmw.png`}
                          alt={`fallback image`}
                          sx={{
                            objectFit: `fill`,
                            height: `100%`
                          }}
                        />
                      </Avatar>
                    </Box>
                    <Typography variant='h5' textAlign='center' color='text.primary' sx={{
                      // pl:3
                      pl: {
                        md: 3,
                        xs: 0
                      }
                    }}>
                      {collection.collection?.detail?.name}
                    </Typography>

                    <ButtonWhite sx={{ textTransform: "capitalize", ml: { md: 4, xs: 0 }, borderRadius: `40px` }} className="d-flex align-items-center justifycontent-between">
                      <Typography className={`mr-4`}>Floor Price: {collection?.floor?.toFixed(2)}</Typography>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.38709 2.79756C3.47299 2.7151 3.58638 2.66699 3.7032 2.66699H14.6093C14.8086 2.66699 14.9083 2.90752 14.7674 3.0484L12.613 5.20282C12.5305 5.28528 12.4171 5.33339 12.2968 5.33339H1.39072C1.19143 5.33339 1.09179 5.09286 1.23267 4.95198L3.38709 2.79756ZM3.38709 10.8414C3.46955 10.759 3.58294 10.7108 3.7032 10.7108H14.6093C14.8086 10.7108 14.9083 10.9514 14.7674 11.0923L12.613 13.2467C12.5305 13.3291 12.4171 13.3772 12.2968 13.3772H1.39072C1.19143 13.3772 1.09179 13.1367 1.23267 12.9958L3.38709 10.8414ZM12.2968 6.66315C12.4171 6.66315 12.5305 6.71125 12.613 6.79372L14.7674 8.94814C14.9083 9.08902 14.8086 9.32954 14.6093 9.32954H3.7032C3.58294 9.32954 3.46955 9.28144 3.38709 9.19897L1.23267 7.04455C1.09179 6.90367 1.19143 6.66315 1.39072 6.66315H12.2968Z" fill="black" />
                      </svg>
                    </ButtonWhite>

                    <ButtonWhite sx={{ textTransform: "capitalize", ml: { md: 2, xs: 0 }, borderRadius: `40px` }}>
                      <Typography className={`mr-4`}>Total Floor Value: {(collection?.floor * collection.nfts.length).toFixed(2)}</Typography>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.38709 2.79756C3.47299 2.7151 3.58638 2.66699 3.7032 2.66699H14.6093C14.8086 2.66699 14.9083 2.90752 14.7674 3.0484L12.613 5.20282C12.5305 5.28528 12.4171 5.33339 12.2968 5.33339H1.39072C1.19143 5.33339 1.09179 5.09286 1.23267 4.95198L3.38709 2.79756ZM3.38709 10.8414C3.46955 10.759 3.58294 10.7108 3.7032 10.7108H14.6093C14.8086 10.7108 14.9083 10.9514 14.7674 11.0923L12.613 13.2467C12.5305 13.3291 12.4171 13.3772 12.2968 13.3772H1.39072C1.19143 13.3772 1.09179 13.1367 1.23267 12.9958L3.38709 10.8414ZM12.2968 6.66315C12.4171 6.66315 12.5305 6.71125 12.613 6.79372L14.7674 8.94814C14.9083 9.08902 14.8086 9.32954 14.6093 9.32954H3.7032C3.58294 9.32954 3.46955 9.28144 3.38709 9.19897L1.23267 7.04455C1.09179 6.90367 1.19143 6.66315 1.39072 6.66315H12.2968Z" fill="black" />
                      </svg>
                    </ButtonWhite>
                  </Box>

                  <Grid container direction={`row`} alignItems={`stretch`} spacing={2} sx={{ p: 3 }}>
                    {
                      collection.nfts.map((nft: any, index: number) => {
                        return (
                          <Grid
                            item
                            md={3}
                            // xs={12}
                            key={index}
                            sx={{
                              width: `100%`
                            }}
                            onClick={
                              (event) => {
                                event.preventDefault();
                                if (!nft.isListed) {
                                  handleClickOpen(0);
                                }
                                else {
                                  handleClickOpen(5);
                                }
                                setModalData({ ...nft, collectionInfo: collection?.collection?.detail });
                              }
                            }>
                            <ListItem image={nft.image} title={nft.name} curPrice={nft?.price || 0} lastPrice={nft.price || 0} sx={{ width: `100%` }} address={nft.mint} noListed={!nft.isListed} data={nft} />
                          </Grid>
                        );
                      })
                    }
                  </Grid>
                </StyledGradPaper>
              )
            })
          }

        </Box>

        <Widgets
          onClick={() => setShow(!isshow)}
          sx={{
            position: `absolute`,
            left: 0,
            top: `20px`,
            [theme.breakpoints.down('sm')]: { display: 'block' },
            [theme.breakpoints.up('sm')]: { display: `none` },
            fontSize: 40,
            cursor: `pointer`
          }} />

        <CloseIcon
          onClick={() => setShow(false)}
          sx={{
            zIndex: 2,
            position: `absolute`,
            left: `245px`,
            top: `10px`,
            [theme.breakpoints.down('sm')]: { display: isshow ? 'block' : `none` },
            [theme.breakpoints.up('sm')]: { display: `none` },
            fontSize: 40,
            cursor: `pointer`
          }}
        />

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
