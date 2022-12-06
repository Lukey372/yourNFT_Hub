import React, { Fragment, useEffect } from "react";
import { styled } from '@mui/material/styles';

import ButtonWhite from "src/theme/buttonWhite";
import ButtonGrey from "src/theme/buttonGrey";
import MetadataPropery from 'src/components/myProfile/metadataPropery'
import { Modal, BootstrapDialogTitle, BootstrapDialogContent } from 'src/components/myProfile/modal'
import { Alert, Button, Box, Grid, TextField, Stack, Typography, CircularProgress, Backdrop, Snackbar } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import RedoIcon from '@mui/icons-material/Redo';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Link to web3.0
 * Import Web3.0 modules for solana
*/
import * as anchor from '@project-serum/anchor';
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
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
import { signAndSendTransaction } from 'src/common/helpers/sol/connection';
import shortAddress from 'src/common/utils/shortAddress';
import getCollectionName from 'src/common/utils/getCollectionName';


import commonService from "src/common/services/common.service";
import { MARKETPLACES_API, GET_SOL_PRICE } from "src/common/config";

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

interface ModalProps {
  open: any,
  setOpen: any,
  modalType: any,
  data?: any,
  setRefresh: any,
  refresh: boolean
}

const NftDetailModal = ({ open, setOpen, modalType, setRefresh, refresh, data }) => {
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [offeringPrice, setOfferingPrice] = React.useState(0);
  const [listPrice, setListPrice] = React.useState(0);
  const [updatePrice, setUpdatePrice] = React.useState(0);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertTypeValue, setAlertTypeValue] = React.useState<any>("");
  const [alertMessageValue, setAlertMessageValue] = React.useState("");

  const [bidPrice, setBidPrice] = React.useState(null);
  const [bidderAddress, setBidderAddress] = React.useState(``);

  const [curSol, setCurSol] = React.useState<any>(0);

  const handleClose = () => {
    setOpen(false);
  };

  //const loading = useSelector(dropsLoadingSelector);
  const [loading, setLoading] = React.useState<boolean>(false);
  useEffect(() => {
    (async () => {
      let result: any;
      result = await commonService({
        method: "get",
        route: `${GET_SOL_PRICE}`,
      });

      setCurSol(result?.solana?.usd || 0);

      setShowAlert(false);
      setAlertTypeValue("");
      setAlertMessageValue("");

      setOfferingPrice(0);
      setListPrice(0);
      setUpdatePrice(0);
      setBidPrice(0);
      setBidderAddress(``);
    })()
  }, [open]);

  useEffect(() => {
    (async () => {
      let result: any;
      if (data?.mint) {
        result = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_MAKEBID_TX_CONF}/nft/${data?.mint}`,
        });
        console.log(`SSS`, result);
        if (result && Array.isArray(result)) {
          const prices = result.map((bid: any) => {
            return bid?.offerPrice || 0;
          });
          if (prices.length > 0) {
            const maxBid = Math.max(...prices);
            setBidPrice(maxBid);
          }
        }

      }
    })()
  }, [data?.mint]);

  useEffect(() => {
    (async () => {
      let result: any;
      if (data?.mint) {
        result = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_MAKEBID_TX_CONF}/nft/${data?.mint}`,
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
            setBidPrice(null);
            setBidderAddress(``);
          }
        }
      }
    })()
  }, [data?.mint]);

  const makeOffer = async () => {
    const offerPrice = offeringPrice > 0 ? offeringPrice : data?.offer;

    const mintAddress = data?.mintAddress ? data?.mintAddress : data?.mint;
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    if (mintAddress && offerPrice > 0 && anchorWallet) {
      if (offerPrice < (data?.price / 2) || offerPrice > data?.price) {
        setAlertTypeValue("error");
        setAlertMessageValue("Offer price must be more than 50% of listing price and less than listing price");
        setShowAlert(true);
      }
      else {
        let result: any;
        setLoading(true);
        result = await commonService({
          method: "post",
          route: `${MARKETPLACES_API.GET_MAKEBID_TX}`,
          data: {
            bidderAddress: wallet.publicKey.toBase58(),
            mintAddress: mintAddress,
            offerPrice: offerPrice
          }
        });

        if (result?.tx?.data) {
          // const resObj = JSON.parse(new TextDecoder().decode(new Uint8Array(result.tx.data)))
          const transaction: Transaction = Transaction.from(result.tx.data);
          try {
            const res = await signAndSendTransaction(connection, anchorWallet, transaction);
            if (res?.txid && res?.slot && res?.slot) {
              const offerResult = await commonService({
                method: "post",
                route: `${MARKETPLACES_API.GET_MAKEBID_TX_CONF}`,
                data: {
                  bidderAddress: wallet.publicKey.toBase58(),
                  mintAddress: mintAddress,
                  offerPrice: offerPrice,
                  signature: res.txid
                }
              });
              setAlertTypeValue("success");
              setAlertMessageValue("Your offer was made.");
              setShowAlert(true);
              await delay(2000);
              setRefresh(!refresh);
              handleClose();
            }
            else {
              setAlertTypeValue("error");
              setAlertMessageValue("Offering was failed, Please try again.");
              setShowAlert(true);
            }
          }
          catch (err) {
            setAlertTypeValue("error");
            setAlertMessageValue("Transaction was failed. Please try again.");
            setShowAlert(true);
          }
        }
        else {
          setAlertTypeValue("error");
          setAlertMessageValue("Offering was failed, Please try again.");
          setShowAlert(true);
        }
        setLoading(false);
      }
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Please input your offer price.");
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
    const mintAddress = data?.mintAddress ? data?.mintAddress : data?.mint;
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
            setAlertMessageValue("You sold one.");
            setShowAlert(true);
            await delay(2000);
            setRefresh(!refresh);
            handleClose();
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

  const cancelOffer = async () => {
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = data?.mintAddress ? data?.mintAddress : data?.mint;
    if (mintAddress && anchorWallet) {
      let result: any;
      setLoading(true);
      result = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.GET_CANCELBID_TX}`,
        data: {
          bidderAddress: wallet.publicKey.toBase58(),
          mintAddress: mintAddress,
        }
      });
      if (result?.tx?.data) {
        // const resObj = JSON.parse(new TextDecoder().decode(new Uint8Array(result.tx.data)))
        const transaction: Transaction = Transaction.from(result.tx.data);
        try {
          const res = await signAndSendTransaction(connection, anchorWallet, transaction);

          if (res?.txid && res?.slot) {
            const cancelResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_CANCELBID_TX_CONF}`,
              data: {
                bidderAddress: wallet.publicKey.toBase58(),
                mintAddress: mintAddress,
                signature: res.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("Your offer was canceled.");
            setShowAlert(true);
            await delay(2000);
            setRefresh(!refresh);
            handleClose();
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Canceling was failed, Please try again.");
            setShowAlert(true);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
        }
      }
      else {
        setAlertTypeValue("error");
        setAlertMessageValue("Canceling was failed, Please try again.");
        setShowAlert(true);
      }
      setLoading(false);
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Canceling was failed, Please try again.");
      setShowAlert(true);
    }

  }

  const makeList = async () => {
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = data?.mint ? data?.mint : data?.mintAddress;
    if (mintAddress && listPrice > 0 && anchorWallet) {
      let result: any;
      setLoading(true);
      result = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.GET_MAKELSIT_TX}`,
        data: {
          mintAddress: mintAddress,
          price: listPrice
        }
      });
      // const resObj = JSON.parse(new TextDecoder().decode(new Uint8Array(result.tx.data)))
      if (result?.tx?.data) {
        const transaction: Transaction = Transaction.from(result.tx.data);
        try {
          const res = await signAndSendTransaction(connection, anchorWallet, transaction);
          if (res?.txid && res?.slot) {
            const listResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_MAKELSIT_TX_CONF}`,
              data: {
                mintAddress: mintAddress,
                price: listPrice,
                signature: res.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("Your NFT was listed.");
            setShowAlert(true);
            await delay(2000);
            setRefresh(!refresh);
            handleClose();
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Listing was failed, Please try again.");
            setShowAlert(true);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
        }

      }
      else {
        setAlertTypeValue("error");
        setAlertMessageValue("Listing was failed, Please try again.");
        setShowAlert(true);
      }
      setLoading(false);
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Please input your listing price.");
      setShowAlert(true);
    }
  }

  const updateNft = async () => {
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = data?.mintAddress ? data?.mintAddress : data?.mint;
    if (mintAddress && updatePrice > 0 && anchorWallet) {
      let result: any;
      setLoading(true);
      result = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.GET_UPDATE_NFT_TX}`,
        data: {
          mintAddress: mintAddress,
          price: updatePrice
        }
      });
      // const resObj = JSON.parse(new TextDecoder().decode(new Uint8Array(result.tx.data)))
      if (result?.tx?.data) {
        const transaction: Transaction = Transaction.from(result.tx.data);
        try {
          const res = await signAndSendTransaction(connection, anchorWallet, transaction);
          if (res?.txid && res?.slot) {
            const updateResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_UPDATE_NFT_TX_CONF}`,
              data: {
                mintAddress: mintAddress,
                price: updatePrice,
                signature: res.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("Your NFT was updated.");
            setShowAlert(true);
            await delay(500);
            setRefresh(!refresh);
            handleClose();
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Updating was failed, Please try again.");
            setShowAlert(true);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
        }
      }
      else {
        setAlertTypeValue("error");
        setAlertMessageValue("Updating was failed, Please try again.");
        setShowAlert(true);
      }
      setLoading(false);
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Please input your updating price.");
      setShowAlert(true);
    }
  }

  const unlistNft = async () => {
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = data?.mint ? data?.mint : data?.mintAddress;

    if (mintAddress && anchorWallet) {
      let result: any;
      setLoading(true);
      result = await commonService({
        method: "post",
        route: `${MARKETPLACES_API.GET_UNLIST_NFT_TX}`,
        data: {
          mintAddress: mintAddress
        }
      });
      // const resObj = JSON.parse(new TextDecoder().decode(new Uint8Array(result.tx.data)))
      if (result?.tx?.data) {
        const transaction: Transaction = Transaction.from(result.tx.data);
        try {
          const res = await signAndSendTransaction(connection, anchorWallet, transaction);
          if (res?.txid && res?.slot) {
            const cancelResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_UNLIST_NFT_TX_CONF}`,
              data: {
                mintAddress: mintAddress,
                signature: res.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("Your NFT was canceled.");
            setShowAlert(true);
            await delay(2000);
            setRefresh(!refresh);
            handleClose();
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Canceling was failed, Please try again.");
            setShowAlert(true);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
        }

      }
      else {
        setAlertTypeValue("error");
        setAlertMessageValue("Canceling was failed, Please try again.");
        setShowAlert(true);
      }
      setLoading(false);
    }
    else {
      setAlertTypeValue("error");
      setAlertMessageValue("Canceling was failed, Please try again");
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
    const mintAddress = data?.mintAddress ? data?.mintAddress : data?.mint;
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
          if (res) {
            const buyResult = await commonService({
              method: "post",
              route: `${MARKETPLACES_API.GET_BUY_TX_CONF}`,
              data: {
                buyerAddress: wallet.publicKey.toBase58(),
                mintAddress: mintAddress,
                signature: res.txid
              }
            });
            setAlertTypeValue("success");
            setAlertMessageValue("You bought one NFT.");
            setShowAlert(true);
            await delay(2000);
            setRefresh(!refresh);
            handleClose();
          }
          else {
            setAlertTypeValue("error");
            setAlertMessageValue("Transaction was failed. Please try again.");
            setShowAlert(true);
          }
        }
        catch (err) {
          setAlertTypeValue("error");
          setAlertMessageValue("Transaction was failed. Please try again.");
          setShowAlert(true);
        }

      }
      catch (err) {
        setAlertTypeValue("error");
        setAlertMessageValue("Transaction was failed. Please try again.");
        setShowAlert(true);
      }
      finally {
        setLoading(false);
      }


    }
  }

  return <>
    <Modal open={open} setOpen={setOpen}>
      {
        modalType !== 2 && modalType !== 3 && <BootstrapDialogTitle id="customized-dialog-title" onClose={() => { handleClose(); }} style={{ display: "flex", borderBottom: "1px solid #27272A", justifyContent: !modalType ? "space-between" : "end" }}>
          {/*  modal1 */}
          {modalType === 0 && <Fragment>
            <ButtonWhite sx={{ textTransform: "capitalize", ml: 2 }} className="d-flex align-items-center justifycontent-between">
              Send NFT
            </ButtonWhite>
            <Box style={{ alignSelf: "end" }}>
              <ButtonGrey sx={{ textTransform: "capitalize", ml: 2 }} className="d-flex align-items-center justifycontent-between">
                Global Offers
              </ButtonGrey>
              <ButtonGrey sx={{ textTransform: "capitalize", ml: 2 }} className="d-flex align-items-center justifycontent-between">
                No Offer
              </ButtonGrey>
            </Box>
          </Fragment>
          }
          {/*  modal2 */}
          {modalType === 1 || modalType == 4 && <Fragment>
            <ButtonWhite
              sx={{
                textTransform: "capitalize",
                fontSize: "1rem",
                px: { md: 1, sm: 1 },
                py: 2,
              }}
            // href
            >
              <Typography variant="body1">Contact Owner</Typography>
            </ButtonWhite>
            <Button style={{ minWidth: "41px", color: "#fff" }}><RefreshIcon /></Button>
            <Button style={{ minWidth: "41px", color: "#fff" }}><RedoIcon /></Button>

          </Fragment>}
          {
            modalType === 5 && bidPrice && <>
              <ButtonWhite
                sx={{
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  px: { md: 1, sm: 1 },
                  py: 1,
                }}
                onClick={async (event) => {
                  acceptBid(event);
                }}
              >
                <Typography variant="body1">
                  Offer at {bidPrice} sol
                </Typography>
              </ButtonWhite>
            </>
          }
        </BootstrapDialogTitle>
      }
      <BootstrapDialogContent id="customized-dialog-content">
        <Box className="d-flex align-items-center" style={{ justifyContent: (modalType === 2 || modalType === 3) ? "flex-start" : "space-between" }}>
          <Box
            sx={{
              width: `35%`
            }}
          >
            <img src={`${data?.image}`} alt="" style={{ borderRadius: `8px`, maxWidth: `100%` }} />
          </Box>

          <Box sx={{ marginLeft: "20px" }}>
            {
              (modalType !== 2 && modalType !== 3) && <Grid container direction={`row`} alignItems={`center`} justifyContent={`space-between`} style={{ marginTop: "30px" }}>
                <Grid item md={6} style={{ border: `none` }}>
                  <Box>
                    <Typography variant="h5" component="div">{data?.name}</Typography>
                    <Typography variant="h6" component="div" color="#71717A">{getCollectionName(data?.name)}</Typography>
                  </Box>
                </Grid>
                <Grid item md={6} style={{ border: `none`, textAlign: "right" }}>
                  <Box>
                    <Typography component="div" color="#71717A">Owned by</Typography>
                    <Typography component="div" color="#fff">{
                      shortAddress(
                        `${data?.walletAddress ? data?.walletAddress :
                          (
                            wallet?.publicKey?.toBase58() ? wallet?.publicKey?.toBase58() :
                              data?.updateAuthority
                          )}`
                      )
                    }</Typography>
                  </Box>
                </Grid>
              </Grid>
            }
            {
              modalType === 1 && <Grid
                container
                direction={`row`}
                alignItems={`stretch`}
              >
                <Grid item md={6} sm={12} xs={12} container direction={`row`} alignItems={`center`} justifyContent={`space - evenly`}>
                  <Box className="d-flex align-items-center" style={{ marginRight: "10px", padding: "19px 16px", width: "100%", border: "1px solid #3F3F46", borderRadius: "8px" }}>
                    <Grid item md={6} style={{ border: `none` }}>
                      <Box className={`d - flex align - items - center`}>
                        <img
                          src={`/ images / solana_icon1.png`}
                          alt=''
                          width="20"
                        />
                        <Typography variant="h6" className="ml-8">{data?.price}</Typography>
                      </Box>
                      <Typography color={"text.secondary"}>Current Price</Typography>
                    </Grid>
                    <Grid item md={6} style={{ border: `none` }}>
                      <ButtonWhite
                        sx={{
                          width: `100%`,
                          textTransform: "capitalize",
                          fontSize: "1rem",
                          px: { md: 1, sm: 1 },
                          py: 2,
                        }}
                        onClick={async (event) => {
                          await buyNow(event)
                        }}
                      >
                        <Typography variant="body1">Buy Now</Typography>
                      </ButtonWhite>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item md={6} sm={12} xs={12} container direction={`row`} alignItems={`center`} justifyContent={`space - evenly`}  >
                  <Box className="d-flex align-items-center" style={{ padding: "19px 16px", width: "100%", border: "1px solid #3F3F46", borderRadius: "8px" }}>
                    <Grid item md={6} style={{ border: `none` }}>
                      <Box className={`d - flex align - items - center`}>
                        <img
                          src={`/ images / solana_icon1.png`}
                          alt=''
                          width="20"
                        />
                        <Typography variant="h6" className="ml-8">0</Typography>
                      </Box>
                      <Typography color={"text.secondary"}>Current Offer</Typography>
                    </Grid>
                    <Grid item md={6} style={{ border: `none` }}>
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
                              setOfferingPrice(price);
                            }
                          }}
                        />
                        <ButtonWhite
                          aria-label="search"
                          sx={{
                            width: `20%`,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                          onClick={async () => {
                            await makeOffer()
                          }}
                        >
                          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.12508V9.12508H12L6.5 14.6251L7.92 16.0451L15.84 8.12508L7.92 0.205078L6.5 1.62508L12 7.12508H0Z" fill="black" />
                          </svg>
                        </ButtonWhite>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            }
            {
              modalType === 4 && <Grid
                container
                direction={`row`}
                alignItems={`stretch`}
              >
                <Grid item md={6} sm={12} xs={12} container direction={`row`} alignItems={`center`} justifyContent={`space - evenly`}>
                  <Box className="d-flex align-items-center" style={{ marginRight: "10px", padding: "19px 16px", width: "100%", border: "1px solid #3F3F46", borderRadius: "8px" }}>
                    <Grid item md={6} style={{ border: `none` }}>
                      <Box className={`d - flex align - items - center`}>
                        <img
                          src={`/ images / solana_icon1.png`}
                          alt=''
                          width="20"
                        />
                        <Typography variant="h6" className="ml-8">{data?.currentPrice || 0}</Typography>
                      </Box>
                      <Typography color={"text.secondary"}>Current Price</Typography>
                    </Grid>
                    <Grid item md={6} style={{ border: `none` }}>
                      <ButtonWhite
                        sx={{
                          width: `100%`,
                          textTransform: "capitalize",
                          fontSize: "1rem",
                          px: { md: 1, sm: 1 },
                          py: 2,
                        }}
                        onClick={async (event) => {
                          await buyNow(event)
                        }}
                      >
                        <Typography variant="body1">Buy Now</Typography>
                      </ButtonWhite>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item md={6} sm={12} xs={12} container direction={`row`} alignItems={`center`} justifyContent={`space - evenly`}  >
                  <Box className="d-flex align-items-center" style={{ padding: "19px 16px", width: "100%", border: "1px solid #3F3F46", borderRadius: "8px" }}>
                    <Grid item md={6} style={{ border: `none` }}>
                      <Box className={`d - flex align - items - center`}>
                        <img
                          src={`/ images / solana_icon1.png`}
                          alt=''
                          width="20"
                        />
                        <Typography variant="h6" className="ml-8">{data?.offerPrice}</Typography>
                      </Box>
                      <Typography color={"text.secondary"}>Current Offer</Typography>
                    </Grid>
                    <Grid item md={6} style={{ border: `none` }}>
                      <ButtonWhite
                        sx={{
                          width: `100%`,
                          textTransform: "capitalize",
                          fontSize: "1rem",
                          px: { md: 1, sm: 1 },
                          py: 2,
                        }}
                        onClick={async (event) => {
                          await cancelOffer()
                        }}
                      >
                        <Typography variant="body1">Cancel Offer</Typography>
                      </ButtonWhite>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            }

            {
              modalType === 5 && <Grid
                container
                direction={`row`}
                alignItems={`stretch`}
              >
                <Grid item md={12} sm={12} xs={12} container direction={`row`} alignItems={`center`} spacing={1} justifyContent={`space - evenly`}>
                  <Grid item md={3} style={{ border: `none` }}>
                    <Box className={`d - flex align - items - center`}>
                      <img
                        src={`/ images / solana_icon1.png`}
                        alt=''
                        width="20"
                      />
                      <Typography variant="h6" className="ml-8">{data?.price || 0}</Typography>
                    </Box>
                    <Typography color={"text.secondary"}>Current Price</Typography>
                  </Grid>
                  <Grid item md={3} style={{ border: `none` }}>
                    <TextField
                      sx={{
                        width: `80 % `,
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
                          setUpdatePrice(price);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={3} style={{ border: `none` }}>
                    <ButtonWhite
                      sx={{
                        width: `100%`,
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        px: { md: 1, sm: 1 },
                        py: 2,
                      }}
                      onClick={async (event) => {
                        await updateNft()
                      }}
                    >
                      <Typography variant="body1">Update Price</Typography>
                    </ButtonWhite>
                  </Grid>
                  <Grid item md={3} style={{ border: `none` }}>
                    <Button
                      sx={{
                        width: `100%`,
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        px: { md: 1, sm: 1 },
                        py: 2,
                        backgroundColor: `none`,
                        border: `solid 2px white`,
                        borderStyle: `inset`,
                        color: `white`
                      }}
                      onClick={async (event) => {
                        await unlistNft()
                      }}
                    >
                      <Typography variant="body1">Unlist</Typography>
                    </Button>
                  </Grid>
                </Grid>

              </Grid>
            }

            {
              modalType !== 2 && modalType !== 3 && <Box className="metadata-properties" sx={{ margin: "19px 0", width: "640px", overflow: "auto" }}>
                <Stack direction="row" spacing={2} sx={{ display: "inline-flex", marginBottom: "20px" }}>
                  {
                    data?.attributes?.map((item, index: number) => {
                      if (index < data?.attributes?.length / 2) {
                        const royal = (data?.collectionInfo?.attributes?.find((attr: any) => {
                          return attr?.trait_type == item.trait_type
                        })?.royalty[
                          data?.collectionInfo?.attributes?.find((attr: any) => {
                            return attr?.trait_type == item.trait_type
                          })?.value?.findIndex((val: any) => val == item.value)
                        ] /
                          data?.collectionInfo?.attributes?.find((attr: any) => {
                            return attr?.trait_type == item.trait_type
                          })?.royalty.reduce((total: number, val: number) => {
                            return total + val;
                          }) * 100);
                        return (
                          <MetadataPropery key={index} propName={item.trait_type} propValue={item.value} propPec={
                            (!royal ? 0 : royal).toFixed(2)
                          } />
                        )
                      }
                      return <React.Fragment key={index}></React.Fragment>
                    })
                  }
                </Stack>
                <Stack direction="row" spacing={2} sx={{ display: "inline-flex", marginBottom: "20px" }}>
                  {
                    data?.attributes?.map((item, index: number) => {
                      if (index >= data?.attributes?.length / 2) {
                        const royal = (data?.collectionInfo?.attributes?.find((attr: any) => {
                          return attr?.trait_type == item.trait_type
                        })?.royalty[
                          data?.collectionInfo?.attributes?.find((attr: any) => {
                            return attr?.trait_type == item.trait_type
                          })?.value?.findIndex((val: any) => val == item.value)
                        ] /
                          data?.collectionInfo?.attributes?.find((attr: any) => {
                            return attr?.trait_type == item.trait_type
                          })?.royalty.reduce((total: number, val: number) => {
                            return total + val;
                          }) * 100);
                        return (
                          <MetadataPropery key={index} propName={item.trait_type} propValue={item.value} propPec={
                            (!royal ? 0 : royal).toFixed(2)
                          } />
                        )
                      }
                      return <React.Fragment key={index}></React.Fragment>
                    })
                  }
                </Stack>
              </Box>
            }
            {modalType === 0 && <Box className="d-flex align-items-center justifycontent-between">
              <div>
                <FormControl sx={{ width: '171px' }} variant="outlined" >
                  <OutlinedInput
                    sx={{ backgroundColor: "#18181B", border: "2px solid #52525B" }}
                    id="outlined-adornment-weight"
                    // value={values.weight}
                    // onChange={handleChange('weight')}
                    placeholder="Enter price"
                    endAdornment={<InputAdornment position="end"><img src="/images/solana_icon.png" alt="solana icon" /></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    onChange={(event) => {
                      const price = parseFloat(event.target.value);
                      if (price != NaN) {
                        setListPrice(price);
                      }
                    }}
                  />
                </FormControl>
                <FormControl sx={{ marginTop: "2px", width: '171px', ml: 2, border: "none" }} variant="outlined" >
                  <OutlinedInput
                    sx={{ backgroundColor: "#52525B", border: "none !important" }}
                    id="outlined-adornment-weight"
                    // value={values.weight}
                    // onChange={handleChange('weight')}
                    placeholder="0"
                    endAdornment={<InputAdornment position="end"><span style={{ fontWeight: "bold", color: "#fff", fontFamily: "DM Sans" }}>$</span></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={
                      !listPrice ? 0 : (listPrice * curSol).toFixed(2)
                    }
                  />
                </FormControl>
              </div>
              <ButtonWhite
                sx={{ textTransform: "capitalize", ml: 2, width: "225px", height: "56px", fontSize: "16px" }}
                className="d-flex align-items-center justifycontent-between"
                onClick={async () => {
                  await makeList();
                }}
              >
                Put For Sales
              </ButtonWhite>
            </Box>}
            {
              (modalType === 2 || modalType === 3) && <Box className="d-flex" style={{ justifyContent: "space-between", flexDirection: "column" }}>
                <Box style={{ margin: "96px 0" }}>
                  <Typography variant="h5" component="div" color="#71717A">Would you like to place an offer on </Typography>
                  <Typography variant="h4" component="div" color="#fff" sx={{ mt: 1 }}>{data?.name}</Typography>
                  <Box style={{ display: "flex", marginTop: "20px", alignItems: "center" }}>
                    <Typography variant="h6" component="div" color="#71717A" sx={{ mr: 3 }}>for</Typography>
                    <img src="/images/solana_icon1.png" alt="" />
                    <Typography variant="h5" component="div" color="#fff" sx={{ ml: 1, mr: 2 }}>{data?.offer ? data?.offer : ``}</Typography>
                    <Typography variant="h5" component="div" color="#71717A">( ${data?.offer ? (data?.offer * curSol).toFixed(2) : ``} )</Typography>
                  </Box>
                </Box>
                <Box className="d-flex">
                  <Button
                    variant="contained"
                    sx={{ padding: "0 35px ", border: "1px white solid", background: "transparent" }}
                    onClick={() => {
                      handleClose()
                    }}
                  >
                    Back
                  </Button>
                  <ButtonWhite
                    sx={{ ml: 1, padding: "17px 32px", textTransform: "capitalize", height: "56px", fontSize: "16px" }}
                    className="d-flex align-items-center justifycontent-between"
                    onClick={async () => {
                      await makeOffer()
                    }}
                  >
                    Confirm
                  </ButtonWhite>
                </Box>
              </Box>
            }
          </Box>
        </Box>
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
      </BootstrapDialogContent>

      <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
        <Alert elevation={6} variant='filled' color={alertTypeValue}>
          {alertMessageValue}
        </Alert>
      </Snackbar>
    </Modal>
  </>
}

export default NftDetailModal

