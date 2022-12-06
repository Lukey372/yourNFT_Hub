import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, IconButton, SvgIcon, Typography, Box } from "@mui/material";

import Linkm from "@mui/material/Link";

import Link from "next/link";
import { useSelector } from "react-redux";
import { dropsListSelector, dropsPaginationSelector } from "src/common/selectors";
import Image from "next/image";

import DiscordIcon from "public/images/discord.svg";
import LinkIcon from "public/images/link.svg";
import TwitterIcon from "public/images/twitter.svg";
import StyleTable from "./styles/styledTable";
import moment from "moment";

import TextLogo from "src/theme/textLogo";
import ButtonWhite from "src/theme/buttonWhite";
import ButtonGrey from "src/theme/buttonGrey";
import { handleImageError } from "src/common/utils/handleImageError";
import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";
import getCryptoSvg from "src/common/utils/getCryptoSvg";
import { Fragment } from "react";
import { getSlug } from "../../helper/generateSlug";

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

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

import MetadataPropery from 'src/components/myProfile/metadataPropery'
import { Modal, BootstrapDialogTitle, BootstrapDialogContent } from 'src/components/myProfile/modal'

import NftDetailModal from 'src/components/myProfile/NftDetailModal'

export default function BiddingTable() {
  const [open, setOpen] = React.useState(false);

  //const loading = useSelector(dropsLoadingSelector);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(true);

  const [propItem, setPropItem] = React.useState<any>({});

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [modalType, setModalType] = React.useState(0)
  const handleClickOpen = (_modalType: React.SetStateAction<number>) => {
    setModalType(_modalType);
    setOpen(true);
  };

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      if (anchorWallet) {
        let result: any;
        setLoading(true);
        result = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_BID_WALLET}${anchorWallet.publicKey.toBase58()}`,
        });
        if (result && Array.isArray(result)) {
          setData([...result]);
        }

        setLoading(false);
      }
    })()
  }, [anchorWallet, refresh]);

  return (
    <>
      <TableContainer component={"div"} sx={{ pb: 5, width: `96%`, marginLeft: `auto`, marginRight: `auto` }}>
        <StyleTable aria-label='Drops List'>
          <TableBody>
            {
              data?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {index == 0 && (
                      <TableRow
                        sx={{
                          "& th": { color: "text.secondary", fontSize: "10" },
                          "& td": {
                            fontSize: theme => theme.typography.h5.fontSize,
                            color: "text.secondary",
                          },
                          "&:hover": {
                            boxShadow: `none !important`
                          }
                        }}>
                        <TableCell align='left' variant='head'>
                          <Typography variant="h6" component="p" className="font-project">NFT</Typography>
                        </TableCell>
                        <TableCell align='center' variant='head'>
                          <Typography variant="h6" component="p" className="font-project">Status</Typography>
                        </TableCell>
                        <TableCell align='center' variant='head'>
                          <Typography variant="h6" component="p" className="font-project">Your offer price</Typography>
                        </TableCell>
                        <TableCell align='center' variant='head'>
                          <Typography variant="h6" component="p" className="font-project">Current price</Typography>
                        </TableCell>
                        <TableCell align='center' variant='head'>
                          <Typography variant="h6" component="p" className="font-project">Action</Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow
                      key={index}
                      sx={{
                        // "&:last-child td, &:last-child th": { border: 0 },
                        "& td": {
                          color: "text.secondary",
                          fontSize: theme => theme.typography.h5.fontSize,
                        },
                      }}>
                      <TableCell align='left' component='td' className='trstart'>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              alt='Remy Sharp'
                              src={``}
                              sx={{ width: 80, height: 80, border: 3, borderColor: `#71717A` }}
                            >
                              <img src={`${item.image}`} alt='fallback image' />
                            </Avatar>
                          </Box>
                          <Link
                            href={`/`}
                            as={`/`}
                            passHref>
                            <Linkm href='#'>
                              <Typography variant='h5' textAlign='center' color='text.primary' pl={3}>
                                {item.name}
                              </Typography>
                            </Linkm>
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell align='center'>
                        {
                          item.status ? <SvgIcon className="d-flex align-items-center justify-content-between" sx={{ display: `flex`, margin: `0 auto` }}>
                            <path d="M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z" fill="#22C55E" />
                            <path d="M16.5 9.49992L10.5 15.4999L7.75 12.7499L8.455 12.0449L10.5 14.0849L15.795 8.79492L16.5 9.49992Z" fill="white" />
                          </SvgIcon> : <SvgIcon className="d-flex align-items-center justify-content-between" sx={{ display: `flex`, margin: `0 auto` }}>
                            <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#EF4444" />
                            <path d="M15.5 9.205L14.795 8.5L12 11.295L9.205 8.5L8.5 9.205L11.295 12L8.5 14.795L9.205 15.5L12 12.705L14.795 15.5L15.5 14.795L12.705 12L15.5 9.205Z" fill="white" />
                          </SvgIcon>
                        }

                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='h6' textAlign='center' pl={3} className="font-project" color="text.secondary">{item.offerPrice}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='h6' textAlign='center' pl={3} className="font-project" color="text.secondary">{item.currentPrice}</Typography>
                      </TableCell>
                      <TableCell align='center' className='trend'>
                        <Button
                          variant="contained"
                          sx={{ border: "1px white solid" }}
                          onClick={
                            (event) => {
                              setPropItem({ ...item })
                              handleClickOpen(4);
                            }
                          }
                        >
                          Cancel
                        </Button>
                        {/* <ButtonWhite onClick={handleClickOpen} sx={{ textTransform: "capitalize", ml: 2 }} className="d-flex align-items-center justifycontent-between">
                          Deposit
                        </ButtonWhite> */}
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
          </TableBody>
        </StyleTable>
      </TableContainer >
      <NftDetailModal open={open} setRefresh={setRefresh} refresh={refresh} setOpen={setOpen} modalType={modalType} data={propItem} />
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
    </>
  );
}