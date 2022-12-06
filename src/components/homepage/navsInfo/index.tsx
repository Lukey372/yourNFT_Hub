import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Typography,
  CardActionArea,
  CardContent,
} from "@mui/material";
// styles
import { StyledCard } from "./styledCard";
import Link from "next/link";

//next

const NavsInfo = () => {
  const dumDesc =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque lectus dictumst luctus quam posuere et urna, egestas quam.";
  const navs = [
    {
      title: "News",
      icon: <NewspaperIcon />,
      desc: "YNH wants you to be updated with the latest trends and news pertaining to Solana and NFT space. ",
      url: "/news",
    },
    {
      title: "Drops",
      icon: <InstallDesktopIcon />,
      desc: "YNH allows you to keep you updated for upcoming NFT drops with a well researched and easy to understand scoring mechanism.",
      url: "/drops",
    },
    {
      title: "Services",
      icon: <MiscellaneousServicesIcon />,
      desc: "YNH simplifies the complexity of various required checklists for a successful launch of the NFT project by providing the required services.",
      url: "/services",
    },
    {
      title: "Marketplace",
      icon: <StorefrontIcon />,
      desc: "YNH introduces you to the leading marketplace on Solana where buying, selling and trading NFTs becomes easy.",
      url: "/marketplace",
    },
  ];
  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        {navs.map((nav) => (
          <Grid item md={3} key={nav.title}>
            <Link href={nav.url}>
              <StyledCard>
                <CardActionArea>
                  <CardHeader
                    avatar={nav.icon}
                    title={nav.title}
                    titleTypographyProps={{
                      variant: "body1",
                      fontSize: "1.24rem",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      {nav.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NavsInfo;
