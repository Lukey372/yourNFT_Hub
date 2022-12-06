import React, { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import commonService from "src/common/services/common.service";

import { Alert, Box, Container, Grid, Skeleton, Stack, Typography, TextField, SvgIcon, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import ButtonWhite from "src/theme/buttonWhite";

/**
 * Link to web3.0
 * Import Web3.0 modules for solana
*/
import * as anchor from '@project-serum/anchor';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { signAndSendTransaction } from 'src/common/helpers/sol/connection'
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
} from '@solana/web3.js';
import {
  WalletMultiButton,
  WalletConnectButton,
  WalletModal,
  WalletModalButton,
  WalletModalProvider,
  WalletDisconnectButton,
  WalletIcon
} from '@solana/wallet-adapter-react-ui';

import StyledGradPaper from "src/common/shared/components/gradPaper";
import { handleImageError } from "src/common/utils/handleImageError";
import getCryptoSvg from "src/common/utils/getCryptoSvg";

import Feed from "src/components/homepage/feed";
import Footer from "src/components/footer";
import Header from "src/components/header";
import { MARKETPLACES_API } from "src/common/config";

import NftDetailModal from 'src/components/myProfile/NftDetailModal';

import shortAddress from 'src/common/utils/shortAddress';
import getCollectionName from 'src/common/utils/getCollectionName';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const address = router.query.address;

  //const loading = useSelector(dropsLoadingSelector);
  const [loading, setLoading] = useState<boolean>(false);

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertTypeValue, setAlertTypeValue] = React.useState<any>("");
  const [alertMessageValue, setAlertMessageValue] = React.useState("");

  const [offerPrice, setOfferPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(null);
  const [bidderAddress, setBidderAddress] = useState(``);

  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(0)
  const handleClickOpen = (_modalType: React.SetStateAction<number>) => {
    setModalType(_modalType);
    setOpen(true);
  };

  const makeOffer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    if (offerPrice > 0) {
      if (offerPrice < (detail?.price / 2) || offerPrice > detail?.price) {
        setAlertTypeValue("error");
        setAlertMessageValue("Offer price must be more than 50% of listing price and less than listing price");
        setShowAlert(true);
      }
      else {
        handleClickOpen(2);
      }
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Please input your offer price.");
      setShowAlert(true);
    }
  }

  const buyNow = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = detail?.mintAddress ? detail?.mintAddress : ``;
    if (mintAddress && anchorWallet) {
      let result: any;
      setLoading(true);
      result = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.GET_BUY_TX}`,
        data: {
          buyerAddress: wallet.publicKey.toBase58(),
          mintAddress: mintAddress,
        }
      });
      try {
        const transaction: Transaction = Transaction.from(result.tx.data);
        try {
          const res = await signAndSendTransaction(connection, anchorWallet, transaction);
          if (res?.txid && res?.slot) {
            const buyResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_BUY_TX_CONF}`,
              data: {
                buyerAddress: wallet.publicKey.toBase58(),
                mintAddress: mintAddress,
                signature: res?.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("You bought one NFT.");
            setShowAlert(true);
            setRefresh(!refresh);
            setLoading(false);
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Transaction was failed. Please try again.");
            setShowAlert(true);
            setLoading(false);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
          setLoading(false);
        }
      }
      catch (err) {
        setAlertTypeValue("error");
        setAlertMessageValue("Transaction was failed. Please try again.");
        setShowAlert(true);
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Transaction was failed. Please try again.");
      setShowAlert(true);
    }
  }

  const acceptBid = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = detail?.mintAddress ? detail?.mintAddress : ``;
    if (mintAddress && anchorWallet && bidderAddress) {
      let result: any;
      setLoading(true);
      result = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.GET_ACCEPTBID_TX}`,
        data: {
          bidderAddress: bidderAddress,
          mintAddress: mintAddress,
        }
      });
      try {
        const transaction: Transaction = Transaction.from(result.tx.data);
        try {
          const res = await signAndSendTransaction(connection, anchorWallet, transaction);
          if (res?.txid && res?.slot) {
            const buyResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_ACCEPTBID_TX_CONF}`,
              data: {
                bidderAddress: bidderAddress,
                mintAddress: mintAddress,
                signature: res?.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("You sold one NFT.");
            setShowAlert(true);
            setRefresh(!refresh);
            setLoading(false);
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Transaction was failed. Please try again.");
            setShowAlert(true);
            setLoading(false);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
          setLoading(false);
        }
      }
      catch (err) {
        setAlertTypeValue("error");
        setAlertMessageValue("Transaction was failed. Please try again.");
        setShowAlert(true);
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Transaction was failed. Please try again.");
      setShowAlert(true);
    }
  }

  const pages = [
    { title: "News", url: "/news" },
    { title: "Drops", url: "/drops" },
    { title: "Services", url: "/services" },
    { title: "Marketplace", url: "/marketplace" },
    { title: "Feed", url: "/feed" },
  ];

  const [detail, setDetail] = useState<any>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log(`refresh`, refresh);
      let result: any;
      result = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.GET_ITEM_DETAIL}${address}`,
      });
      setDetail({ ...result });
      console.log(`result`, result)
      setLoading(false);
    })()
  }, [address, refresh]);

  useEffect(() => {
    (async () => {
      let result: any;
      if (detail?.mintAddress) {
        result = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_MAKEBID_TX_CONF}/nft/${detail?.mintAddress}`,
        });
        if (result && Array.isArray(result)) {
          const prices = result.map((bid: any) => {
            return bid?.offerPrice || 0;
          });
          if (prices.length > 0) {
            const maxBid = Math.max(...prices);
            const bidder = result.find((bid: any) => {
              return bid?.offerPrice == maxBid
            })
            if (bidder) {
              setBidPrice(maxBid);
              setBidderAddress(bidder?.walletAddress);
            }
          }
          else {
            setOfferPrice(0);
            setBidPrice(null);
          }
        }
      }
    })()
  }, [detail]);

  return (
    <>
      <Header pages={pages} />
      {/* Preiviously xl container was here */}

      <Box sx={{ height: "10vh" }} />
      <StyledGradPaper sx={{
        '& .gradient-div': {
          height: `96px`
        }
      }}>
        <Container sx={{ bgcolor: "none" }} maxWidth='lg' className={`mt-64`}>
          <Grid container direction={`row`} alignItems={`center`} justifyContent={`space-between`} spacing={3} className={`pt-48`}>
            <Grid item md={3} >
              <Box
                sx={{
                  borderRadius: `8px`,
                  background: `background.default`,
                  border: `solid 2px #27272A`,
                  padding: `8px`,
                  "& img": {
                    borderRadius: `4px`
                  }
                }}
              >
                <Box
                  component={`img`}
                  src={detail?.image}
                  onError={handleImageError}
                />
              </Box>
            </Grid>

            <Grid item md={9} container direction={`row`} alignItems={`center`}>
              <Grid container direction={`row`} alignItems={`center`} className={`mb-48`}>
                <Grid item md={6} sm={12} direction={`row`} alignItems={`center`}>
                  <>
                    <Typography variant="h4" component="div">{detail?.name}</Typography>
                    <Typography variant="h6" color={"text.secondary"} component="p" className="mt-8">{getCollectionName(detail?.name)}</Typography>
                  </>
                </Grid>
                <Grid item md={6} sm={12} direction={`row`} alignItems={`center`}>
                  <>
                    <Typography variant="h6" color={"text.secondary"}>Owned by</Typography>

                    <Link href={`https://solscan.io/account/${detail?.walletAddress}`} passHref>
                      <a target="_blank">
                        <Typography variant="h4" sx={{ color: `white`, cursor: `pointer`, textDecoration: `underline` }}>{shortAddress(`${detail?.walletAddress}`)}</Typography>
                      </a>
                    </Link>
                  </>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  "& .MuiGrid-item": {
                    bgcolor: "grey.900",
                    border: "1px solid black",
                    "&:first-of-type": {
                      borderRadius: { md: "1rem 0 0 1rem" },
                    },
                    "&:last-child": {
                      borderRadius: { md: "0 1rem 1rem 0" },
                    },
                    "& .MuiTypography-root": {

                    },
                  },
                }}
                direction={`row`}
                alignItems={`stretch`}

              >
                <Grid item md={6} sm={12} xs={12} container direction={`row`} alignItems={`center`} justifyContent={`space-evenly`} className={`pt-16 pb-16 pl-32 pr-32`}>
                  <Grid item md={6} style={{ border: `none` }}>
                    <Box className={`d-flex align-items-center`}>
                      <img
                        src={`/images/solana.svg`}
                        alt=''
                        width="20"
                      />
                      <Typography variant="h4" className="ml-8">{detail?.price}</Typography>
                    </Box>
                    <Typography variant="h6" color={"text.secondary"}>Current Price</Typography>
                  </Grid>
                  <Grid item md={6} style={{ border: `none` }}>
                    <ButtonWhite
                      sx={{
                        width: `100%`,
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        px: { md: 4, sm: 3 },
                        py: 2,
                      }}
                      onClick={(event) => {
                        buyNow(event)
                      }}
                      disabled={
                        detail?.status == 2 || detail?.walletAddress == wallet?.publicKey?.toBase58() || !wallet?.connected
                      }
                    // href
                    >
                      <Typography variant="body1">Buy Now</Typography>
                    </ButtonWhite>
                  </Grid>
                </Grid>

                <Grid item md={6} sm={12} xs={12} container direction={`row`} alignItems={`center`} justifyContent={`space-evenly`} className={`pt-16 pb-16 pl-32 pr-32`}>
                  <Grid item md={6} style={{ border: `none` }}>
                    <Box className={`d-flex align-items-center`}>
                      <img
                        src={`/images/solana.svg`}
                        alt=''
                        width="20"
                      />
                      <Typography variant="h4" className="ml-8">
                        {
                          bidPrice ? bidPrice : (offerPrice ? offerPrice : `0`)
                        }
                      </Typography>
                    </Box>
                    <Typography variant="h6" color={"text.secondary"}>
                      Current Offer
                    </Typography>
                  </Grid>
                  <Grid item md={6} style={{ border: `none` }}>
                    {
                      detail?.walletAddress == wallet?.publicKey?.toBase58() ?
                        <ButtonWhite
                          sx={{
                            width: `100%`,
                            textTransform: "capitalize",
                            fontSize: "1rem",
                            px: { md: 4, sm: 3 },
                            py: 2,
                          }}
                          onClick={async (event) => {
                            await acceptBid(event)
                          }}
                          disabled={detail?.status == 2 || !bidPrice || !wallet?.connected}
                        >
                          <Typography variant="body1">Accept Bid</Typography>
                        </ButtonWhite> :
                        <Box className={`d-flex align-items-stretch justify-content-center col-12`}>
                          <TextField
                            sx={{
                              width: `80%`,
                              bgcolor: "#27272A",
                              color: "grey",
                              border: `none`,
                              borderRadius: `0`,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                              '&:hover': {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                              },
                              fontSize: `1.2rem`
                            }}
                            onChange={(event) => {
                              const price = parseFloat(event.target.value);
                              if (price != NaN) {
                                setOfferPrice(price);
                              }
                            }}
                            value={offerPrice}
                            type={`number`}
                            defaultValue={offerPrice}
                            disabled={detail?.status == 2 || !wallet?.connected}
                          />
                          <ButtonWhite
                            aria-label="search"
                            sx={{
                              width: `20%`,
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                            }}
                            onClick={
                              (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                makeOffer(event);
                              }
                            }
                            disabled={detail?.status == 2 || !wallet?.connected}
                          >
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 7.12508V9.12508H12L6.5 14.6251L7.92 16.0451L15.84 8.12508L7.92 0.205078L6.5 1.62508L12 7.12508H0Z" fill="black" />
                            </svg>
                          </ButtonWhite>
                        </Box>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </StyledGradPaper>

      <Container sx={{ bgcolor: "primary.main" }} maxWidth='lg' className={`mt-32`}>
        <Typography variant="h4" component="div">Attributes</Typography>
        <Grid container direction={`row`} alignItems={`center`} className={`mt-0`} spacing={3}>
          {
            detail?.attributes?.map((value: { trait_type: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }, key: React.Key) => {
              return <Grid item xl={2} lg={3} sm={4} xs={6} key={key}>
                <Box className={` d-flex align-items-center pt-8 pb-8 pl-16 pr-16`} sx={{ bgcolor: `grey.900`, borderRadius: `8px` }}>
                  <Box>
                    <Typography variant="body1" component="p" color={"text.secondary"} >{value.trait_type}</Typography>
                    <Typography variant="h6" component="p" color={"text.primary"} >{value.value}</Typography>
                  </Box>
                </Box>
              </Grid>
            })
          }
        </Grid>
      </Container>

      <Box sx={{ height: "10vh" }} />

      <Footer />
      <NftDetailModal open={open} setRefresh={setRefresh} refresh={refresh} setOpen={setOpen} modalType={modalType} data={{ ...detail, offer: offerPrice }} />
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

      <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
        <Alert elevation={6} variant='filled' color={alertTypeValue}>
          {alertMessageValue}
        </Alert>
      </Snackbar>
    </>
  );
}
