import React, { Fragment, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

/**
 * Link to web3.0
 * Import Web3.0 modules for solana
*/
import * as anchor from '@project-serum/anchor';
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
import { signAndSendTransaction } from 'src/common/helpers/sol/connection'

import {
  Button,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";

import { serverUrl } from "src/common/config";
import { handleImageError } from "src/common/utils/handleImageError";

import ButtonWhite from "src/theme/buttonWhite";

import commonService from "src/common/services/common.service";
import { MARKETPLACES_API } from "src/common/config";

import NftDetailModal from 'src/components/myProfile/NftDetailModal';

interface ListItem {
  [x: string]: any;
  descript: string,
  title: string,
  image: string,
  address: string,
  data?: any,
  setRefresh?: any,
  refresh?: any,
  walletAddress?: string
}

const ListItem = (props: ListItem) => {
  const [loading, setLoading] = useState<boolean>(false);

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertTypeValue, setAlertTypeValue] = React.useState<any>("");
  const [alertMessageValue, setAlertMessageValue] = React.useState("");
  // const [refresh, setRefresh] = React.useState<boolean>(true);
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
    handleClickOpen(1);
  }

  const buyNow = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!anchorWallet) {
      setAlertTypeValue("error");
      setAlertMessageValue("Please connect to your wallet.");
      setShowAlert(true);
      return;
    }
    const mintAddress = props.address ? props.address : props.mintAddress;
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
        const res = await signAndSendTransaction(connection, anchorWallet, transaction);
        try {
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
            if (props.setRefresh && props.refresh != undefined) {
              props.setRefresh(!props.refresh)
            }

            setAlertTypeValue("success");
            setAlertMessageValue("You bought one NFT.");
            setShowAlert(true);
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

  React.useEffect(() => {
    (async () => {
      if (wallet) {

      }
    })()
  }, [wallet]);

  return (
    <Fragment>
      <Link href={`/item-details/[address]`} as={`/item-details/${props.address}`} passHref>
        <Box sx={{ '&:hover': { cursor: `pointer` } }}>
          <Box className="imageWrapper">
            <Box className="imageOver">
              <Box
                component={`img`}
                src={`${props.image}`}
                alt="DISCOUNTED NFT"
                className={`border-radius-8`}
                sx={{
                  transition: `all 0.5s`,
                  '&:hover': {
                    transform: `scale(1.1)`
                  },
                  borderBottomRightRadius: `0 !important`,
                  borderBottomLeftRadius: `0 !important`,
                }}
                onError={handleImageError}
              />

              <Box
                sx={{
                  position: `absolute`,
                  borderRadius: `4px`,
                  background: `#FEF9C3`,
                  bottom: 0,
                  left: 0,
                  ml: 2,
                  mb: 2,
                  pl: 2,
                  pr: 2,
                  pt: 1,
                  pb: 1
                }}
              >
                <Typography variant="body1" sx={{ color: `#A16207`, fontSize: `0.85rem`, lineHeight: 1.3 }}>25% off</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            className={`pt-16 pr-16 pl-16 pb-16`}
            sx={{
              background: (theme) => `linear-gradient(0deg, #27272A 50.28%, ${theme.palette.background.default} 100%)`,
              borderRadius: `0px 0px 8px 8px`,
              flex: `none`,
              order: `1`,
              flexGrow: 0,
              p: 0
            }}
          >
            <Typography variant="body1" sx={{ fontSize: `0.8rem` }} color={`text.secondary`}>{props.descript}</Typography>
            <Typography variant="body1">{props.title}</Typography>

            <Box className="d-flex align-items-center mt-16">
              <Button
                className={`d-flex align-items-center justify-content-center border-radius-4 pt-4 pb-4 col-6 mr-4`}
                sx={{
                  border: theme => `1px solid ${theme.palette.text.secondary} !important`,
                  color: theme => `${theme.palette.text.secondary}`
                }}
                onClick={
                  (event) => {
                    makeOffer(event);
                  }
                }
                disabled={wallet?.publicKey?.toBase58() == props.walletAddress}
              >
                Make Offer
              </Button>
              {/* <ButtonWhite
                className={`ml-4 d-flex align-items-center justify-content-center border-radius-4 pt-4 pb-4 col-6`}
              >
                Buy Now
              </ButtonWhite> */}
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
                className={`ml-4 d-flex align-items-center justify-content-center border-radius-4 pt-4 pb-4 col-6`}
                onClick={
                  (event) => {
                    buyNow(event);
                  }
                }
                disabled={wallet?.publicKey?.toBase58() == props.walletAddress}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Link>

      <NftDetailModal open={open} setRefresh={props.setRefresh} refresh={props.refresh} setOpen={setOpen} modalType={modalType} data={props.data} />
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
    </Fragment>
  );
};

export default ListItem;
