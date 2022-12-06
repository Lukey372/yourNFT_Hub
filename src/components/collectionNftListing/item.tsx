import {
  Alert,
  Box,
  Button,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { handleImageError } from "src/common/utils/handleImageError";
import Clamp from "react-multiline-clamp";
import Link from "next/link";
import Image from "next/image";
import { number } from "yup";

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

import NftDetailModal from 'src/components/myProfile/NftDetailModal'

interface ListItem {
  title: string,
  image: string,
  curPrice: any,
  lastPrice: any,
  sx?: any,
  address: string,
  noListed?: boolean,
  data?: any,
  mode?: boolean
}

const ListItem = (props: ListItem) => {

  //const loading = useSelector(dropsLoadingSelector);
  const [loading, setLoading] = useState<boolean>(false);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertTypeValue, setAlertTypeValue] = React.useState<any>("");
  const [alertMessageValue, setAlertMessageValue] = React.useState("");

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [open, setOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(0)
  const handleClickOpen = (_modalType: React.SetStateAction<number>) => {
    setModalType(_modalType);
    setOpen(true);
  };

  return (
    <>
      {
        props.mode ?
          <Link
            href={`/item-details/[address]`}
            as={`/item-details/${props.address}`}
            passHref
          >
            <Box
              sx={{
                ...props.sx,
                "&:hover": {
                  cursor: `pointer`
                }
              }}
              onClick={
                (event) => {

                }
              }
            >
              <Box className="imageWrapper">
                <Box className="imageOver"
                  sx={{
                    transition: `all 0.5s`,
                    "&:hover": {
                      cursor: `pointer`,
                      transform: `scale(1.1)`
                    }
                  }}>
                  <Box
                    component={`img`}
                    src={props.image}
                    alt="NFT IMAGE"
                    style={{
                      borderTopRightRadius: `8px`,
                      borderTopLeftRadius: `8px`,
                    }}
                    onError={handleImageError}
                  />
                </Box>
              </Box>

              <Box className={`pt-16 pr-16 pl-16 pb-16`}
                sx={{
                  borderBottomRightRadius: `8px`,
                  borderBottomLeftRadius: `8px`,
                  background: "linear-gradient(180deg, #000000 0%, #27272A 100%)",
                }}>

                <Typography variant="body1" className={`mb-16`}>{props.title}</Typography>
                <Grid container alignItems={`center`} justifyContent={`space-between`}>
                  {
                    props.noListed && <Grid item md={12} className={`d-flex align-items-center`} sx={{ minHeight: `48px`, maxHeight: `48px` }}>
                      <Button
                        sx={{
                          backgroundColor: "grey.700",
                          color: "grey.500",
                          "&:hover": {
                            backgroundColor: "grey.700",
                            color: "grey.500",
                          },
                        }}
                        className="d-flex align-items-center justifycontent-center col-12">
                        Not at Listed
                      </Button>
                    </Grid>
                  }

                  {
                    !props.noListed && <>
                      <Grid item md={6}>
                        <Typography variant="caption" sx={{ color: '#71717A' }}>Price</Typography>
                        <Box className={`d-flex align-items-center`}>
                          <Box
                            component={`img`}
                            src={`/images/solana.svg`}
                            alt="SOLANA ICON"
                            width="20"
                          />
                          <Typography variant="body1" className={`ml-8`}>{props.curPrice}</Typography>
                        </Box>
                      </Grid>

                      <Grid item md={6}>
                        <Typography variant="caption" sx={{ color: '#71717A' }}>Last Price</Typography>
                        <Box className={`d-flex align-items-center`}>
                          <Box
                            component={`img`}
                            src={`/images/solana.svg`}
                            alt="SOLANA ICON"
                            width="20"
                          />
                          <Typography variant="body1" className={`ml-8`}>{props.lastPrice}</Typography>
                        </Box>
                      </Grid>
                    </>
                  }
                </Grid>
              </Box>

              {
                loading && (
                  <Backdrop
                    sx={{ color: "Grey", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                  >
                    <CircularProgress color="inherit" />
                    &nbsp; Loading...
                  </Backdrop>
                )
              }

              <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                <Alert elevation={6} variant='filled' color={alertTypeValue}>
                  {alertMessageValue}
                </Alert>
              </Snackbar>
            </Box>
          </Link> :
          <Box
            sx={{
              ...props.sx,
              "&:hover": {
                cursor: `pointer`
              }
            }}
            onClick={
              (event) => {

              }
            }
          >
            <Box className="imageWrapper">
              <Box className="imageOver"
                sx={{
                  transition: `all 0.5s`,
                  "&:hover": {
                    cursor: `pointer`,
                    transform: `scale(1.1)`
                  }
                }}>
                <Box
                  component={`img`}
                  src={props.image}
                  alt="NFT IMAGE"
                  style={{
                    borderTopRightRadius: `8px`,
                    borderTopLeftRadius: `8px`,
                  }}
                  onError={handleImageError}
                />
              </Box>
            </Box>

            <Box className={`pt-16 pr-16 pl-16 pb-16`}
              sx={{
                borderBottomRightRadius: `8px`,
                borderBottomLeftRadius: `8px`,
                background: "linear-gradient(180deg, #000000 0%, #27272A 100%)",
              }}>

              <Typography variant="body1" className={`mb-16`}>{props.title}</Typography>
              <Grid container alignItems={`center`} justifyContent={`space-between`}>
                {
                  props.noListed && <Grid item md={12} className={`d-flex align-items-center`} sx={{ minHeight: `48px`, maxHeight: `48px` }}>
                    <Button
                      sx={{
                        backgroundColor: "grey.700",
                        color: "grey.500",
                        "&:hover": {
                          backgroundColor: "grey.700",
                          color: "grey.500",
                        },
                      }}
                      className="d-flex align-items-center justifycontent-center col-12">
                      Not at Listed
                    </Button>
                  </Grid>
                }

                {
                  !props.noListed && <>
                    <Grid item md={6}>
                      <Typography variant="caption" sx={{ color: '#71717A' }}>Price</Typography>
                      <Box className={`d-flex align-items-center`}>
                        <Box
                          component={`img`}
                          src={`/images/solana.svg`}
                          alt="SOLANA ICON"
                          width="20"
                        />
                        <Typography variant="body1" className={`ml-8`}>{props.curPrice}</Typography>
                      </Box>
                    </Grid>

                    <Grid item md={6}>
                      <Typography variant="caption" sx={{ color: '#71717A' }}>Last Price</Typography>
                      <Box className={`d-flex align-items-center`}>
                        <Box
                          component={`img`}
                          src={`/images/solana.svg`}
                          alt="SOLANA ICON"
                          width="20"
                        />
                        <Typography variant="body1" className={`ml-8`}>{props.lastPrice}</Typography>
                      </Box>
                    </Grid>
                  </>
                }
              </Grid>
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

            <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
              <Alert elevation={6} variant='filled' color={alertTypeValue}>
                {alertMessageValue}
              </Alert>
            </Snackbar>
          </Box>
      }
    </>

  );
};

export default ListItem;
