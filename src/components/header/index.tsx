import React, { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

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
  LAMPORTS_PER_SOL
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

import { useTheme, styled } from '@mui/material/styles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from '@mui/material/Skeleton';
import Autocomplete, { createFilterOptions, autocompleteClasses } from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { finacial } from 'src/common/utils/helpers';
import shortAddress from 'src/common/utils/shortAddress';
import getCryptoSvg from "src/common/utils/getCryptoSvg";

import TextLogo from "src/theme/textLogo";
import LogoIcon from "src/theme/logo";
import ButtonWhite from "src/theme/buttonWhite";
import Logo from "./logo";
import MenuDrawer from "./drawer";
import MyMenu from "./myMenu";

import commonService from "src/common/services/common.service";
import { MARKETPLACES_API, serverUrl } from "src/common/config";

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    // fontSize: '20px !important ',
    '& .MuiAutocomplete-popper': {
      margin: '20px'
    },
  },
});

interface WalletInfo {
  address: string,
  balance: number
}

const Header = ({ pages, collapseMenuAfter = 5 }) => {
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const mainPages = [...pages];
  const mobilePages = [...pages];
  const restPages = mainPages.splice(collapseMenuAfter);

  const linkRouter = useRouter();
  const isActive = (url) => {
    //used pathname before news category page.
    return linkRouter.asPath.includes(url);
  };

  const [toggleDrawer, setDrawer] = React.useState(false);

  //Menu's state and functions
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [collections, setCollections] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    return;
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //Menu's state and functions end

  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(profileAnchorEl);
  const openProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const closeProfileOpen = () => {
    setProfileAnchorEl(null);
  };

  /**
   * Wallet Connection
   */
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();
  const [walletInfo, setWalletInfo] = React.useState<WalletInfo>({ address: ``, balance: 0 });

  const disconnectWallet = async () => {
    if (wallet.connected && !wallet.connecting) {
      await wallet.disconnect();
    }
  }

  React.useEffect(() => {
    (async () => {
      closeProfileOpen();
    })()
  }, [wallet]);

  React.useEffect(() => {
    (async () => {
      if (anchorWallet) {
        const walletBalance = await connection.getBalance(anchorWallet.publicKey);
        setWalletInfo({ ...walletInfo, address: anchorWallet.publicKey.toBase58(), balance: walletBalance / LAMPORTS_PER_SOL });
      }
    })()
  }, [anchorWallet]);


  // React.useEffect(() => {
  //   (async () => {
  //     const collections = await commonService({
  //       method: "get",
  //       route: `${MARKETPLACES_API.ALL_COLLECTIONS}`,
  //     });
  //   })()
  // })

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.61220238095238093) 20%)",
          pt: 1,
          zIndex: 9999
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link href="/" passHref>
              <Logo sx={{ mr: 0, display: { xs: "none", md: "flex" } }} />
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" }
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                // onClick={() => setDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {mobilePages?.map((page) => (
                  <Link href={page.url} key={page.title}>
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link href="/" passHref>
                <IconButton sx={{ ml: "-10px" }}>
                  <LogoIcon fontSize="large" />
                </IconButton>
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {mainPages?.map((page, index) => (
                <Link href={`${page.url}`} key={page.title} passHref>
                  <Button
                    key={page.title}
                    size="small"
                    onClick={handleCloseNavMenu}
                    sx={{
                      margin: `8px 4px`,
                      fontSize: "1.125rem",
                      color: "#71717A",
                      textTransform: "capitalize",
                      position: "relative",
                      "&:hover": {
                        color: "white",
                      },
                      "&.active": {
                        color: "white !important",
                      },
                      "&.active > .navIcon": {
                        opacity: "1",
                      },
                      "&:hover > .navIcon": {
                        opacity: "1",
                      },
                    }}
                    className={isActive(page.url) ? "active" : ""}
                  // startIcon={
                  //   <TextLogo
                  //     // fontSize="small"
                  //     sx={{ verticalAlign: "sub", visibility: "hidden" }}
                  //   />
                  // }

                  >
                    <TextLogo
                      fontSize="small"
                      sx={{
                        verticalAlign: "sub",
                        position: "absolute",
                        // display: "none",
                        opacity: "0",
                        outline: " 1px solid transparent",
                        left: "5px",
                        mb: "2px",
                        transition: "all .25s ease",
                      }}
                      className="navIcon"
                    />
                    &nbsp; &nbsp; &nbsp;
                    {`${page.title}`}
                  </Button>
                </Link>
              ))}

              {/* Menu for more navs button */}
              {Boolean(restPages.length) && (
                <MyMenu
                  title="more"
                  buttonSx={{
                    mx: 1,
                    my: 2,
                    fontSize: "1.125rem",
                    color: "text.secondary",
                    textTransform: "capitalize",

                    "&:hover": {
                      color: "white",
                    },
                  }}
                  buttonProps={{ size: "small" }} // This prop may be not working
                  menuList={restPages}
                  activeFunc={isActive}
                />
              )}
            </Box>

            {/* right Side menu, make md on display to block, to enable it */}
            <Box
              sx={{
                flexGrow: 0,
                display: {
                  xs: "none",
                  md: "flex"
                },
                alignItems: `center`,
                alignContent: `center`
              }}
              color="white"
            >
              <Tooltip title="Search">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 2 }}
                  color="inherit"
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              {/* <Autocomplete
                id="tags-outlined"
                options={[{ SS: 1, TT: 2 }, { SS: 256, TT: 2345 }, { SS: 1111, TT: 2222 }]}
                getOptionLabel={(option: any) => (option?.SS || `DATA`)}
                renderOption={(props, option: any) => (
                  <li {...props} key={option.symbol}  >{option.name}</li>
                  // <Typography   {...props} key={option.symbol} style={{ fontSize: '0.75rem !important ' }}>{option.name}</Typography>
                )}
                renderInput={(params) => (

                  <TextField
                    {...params}
                    sx={{
                      '& input': {
                        fontSize: `0.75rem`
                      }
                    }}
                    placeholder={`add project`}

                  >

                  </TextField>

                )}
                PopperComponent={StyledPopper}
                size={`small`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, newValue) => {

                }}
                onInputChange={async (event, newInputValue) => {

                  if (newInputValue.length > 2) {

                  }
                  else {
                    if (newInputValue.length < 1) {

                    }
                  }
                }}
                value={[]}
              /> */}

              {!isActive("/news") && (
                <>
                  {
                    // anchorWallet && <Tooltip title="Profile">
                    //   <IconButton
                    //     onClick={handleOpenUserMenu}
                    //     sx={{ px: 2 }}
                    //     color="inherit"
                    //   >
                    //     <Link href={'/me'}>
                    //       <AccountCircleOutlinedIcon />
                    //     </Link>
                    //   </IconButton>
                    // </Tooltip>
                  }

                  {/* <Tooltip title="More">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 2 }}
                      color="inherit"
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip> */}

                  {
                    !anchorWallet && <WalletModalButton className="wallet-button" />
                  }

                  {
                    anchorWallet && <>
                      <Button
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={openProfile}
                        startIcon={<KeyboardArrowDownIcon />}
                        sx={{
                          border: `1px white solid`,
                        }}
                      >
                        <Typography variant="button">
                          {shortAddress(walletInfo.address)}
                        </Typography>

                      </Button>

                      <ButtonWhite
                        sx={{
                          ml: 2
                        }}
                        endIcon={
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.38709 2.79756C3.47299 2.7151 3.58638 2.66699 3.7032 2.66699H14.6093C14.8086 2.66699 14.9083 2.90752 14.7674 3.0484L12.613 5.20282C12.5305 5.28528 12.4171 5.33339 12.2968 5.33339H1.39072C1.19143 5.33339 1.09179 5.09286 1.23267 4.95198L3.38709 2.79756ZM3.38709 10.8414C3.46955 10.759 3.58294 10.7108 3.7032 10.7108H14.6093C14.8086 10.7108 14.9083 10.9514 14.7674 11.0923L12.613 13.2467C12.5305 13.3291 12.4171 13.3772 12.2968 13.3772H1.39072C1.19143 13.3772 1.09179 13.1367 1.23267 12.9958L3.38709 10.8414ZM12.2968 6.66315C12.4171 6.66315 12.5305 6.71125 12.613 6.79372L14.7674 8.94814C14.9083 9.08902 14.8086 9.32954 14.6093 9.32954H3.7032C3.58294 9.32954 3.46955 9.28144 3.38709 9.19897L1.23267 7.04455C1.09179 6.90367 1.19143 6.66315 1.39072 6.66315H12.2968Z" fill="black" />
                          </svg>
                        }
                      >
                        <Typography variant="button">
                          {
                            finacial(walletInfo.balance)
                          }
                        </Typography>
                      </ButtonWhite>

                      <Menu
                        anchorEl={profileAnchorEl}
                        id="account-menu"
                        open={profileOpen}
                        onClose={closeProfileOpen}
                        onClick={() => { }}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 2.5,
                            width: {
                              xl: `12%`,
                              lg: `15%`
                            },
                            '& .MuiMenu-list': {
                              pt: 0,
                              pb: 0,
                              borderRadius: 0,
                              '& .MuiMenuItem-root': {
                                fontSize: `1.125rem`,
                                p: 2,
                                borderRadius: 0,
                                '&:hover': {
                                  background: `#EF4444`,
                                  '& .MuiTypography-root': {
                                    color: theme => theme.palette.text.primary,
                                  }
                                }
                              },
                              '& .MuiMenuItem-root:last-of-type': {
                                borderTop: theme => `solid 2px ${theme.palette.text.secondary}`,
                                borderBottomLeftRadius: `4px`,
                                borderBottomRightRadius: `4px`
                              }
                            },

                            // '&:before': {
                            //   content: '""',
                            //   display: 'block',
                            //   position: 'absolute',
                            //   top: 0,
                            //   right: 14,
                            //   width: 10,
                            //   height: 10,
                            //   bgcolor: 'background.paper',
                            //   transform: 'translateY(-50%) rotate(45deg)',
                            //   zIndex: 0,
                            // },
                          },
                        }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            linkRouter.push(`/me`);
                          }}
                        >
                          <Typography
                            variant={`body2`}
                            sx={{
                              fontSize: `1.125rem`
                            }}>
                            Profile
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={
                            () => {
                              disconnectWallet()
                            }
                          }
                        >
                          <Typography variant={`body2`} sx={{ fontSize: `1.125rem` }}>Disconnect</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  }
                </>
              )}

              {/* Button back and select wallet */}
              {isActive("/news") && (
                <Link href="/" passHref>
                  <Button
                    variant="contained"
                    sx={{ border: "1px white solid" }}
                  >
                    <ArrowBackIcon fontSize="small" /> &nbsp; Back to home
                  </Button>
                </Link>
              )}

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>

          <MenuDrawer toggle={toggleDrawer} />
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
