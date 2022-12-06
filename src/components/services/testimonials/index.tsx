import React from "react";
import { Avatar, Box, CardActionArea, CardMedia, Container, Grid, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";
import { title } from "process";

import StyledGradPaper from "./gradPaper";

const Testimonials = () => {
  const tList = [
    {
      image: "/images/testimonials/IMG_5173.PNG",
      title: "Frost",
      content:
        "The team has been constant with updates and continuously showed us proof of their work which shows they are here for the long term. ",
    },
    {
      image: "/images/testimonials/IMG_5174.PNG",
      title: "The Banished",
      content:
        " What they have been building so far is what the space needs, trust and amazing product. We are not just investing our money but our trust in them. Believing is the key.",
    },
    {
      image: "/images/testimonials/IMG_5175.PNG",
      title: "Deserter",
      content:
        "This is not just a basic NFT but a huge pot with great potential for passive income. In Solana space, 70% are trying to flip but we are here with complete dedication and patience.",
    },
    {
      image: "/images/testimonials/IMG_5176.PNG",
      title: "Mad Eyes",
      content:
        "The project I’m looking at is called Nova Nerds, it’s a supply of 1111 nerds. The alpha is that they are building a marketplace called “NFT hub” it’s a combination of a Marketplace, drops, news, and services. They will have improved UI, fast listings, and free PR for collections that choose to go exclusive with them.",
    },
    {
      image: "/images/testimonials/IMG_5177.PNG",
      title: "Renegade ",
      content:
        "I have been a fan of NN since the start as they will be providing everything a project needs such as DAO verification, the upcoming market place which could be a really big play in my opinion. They are providing multiple services such as doxxing and Twitter discord bots at such a low cost as compared to other service providers, it's gonna be huge.",
    },
    {
      image: "/images/testimonials/IMG_5173.PNG",
      title: "Voodoo ",
      content:
        "You'll gain royalties from trade on secondary if you hold a Nova Nerd (the more you own, the more royalties you get - 50% is shared with holders) + with the NFT Hub team is building you'll get another source of passive income (25%) + you will gain access to our private holder section where we share alpha about upcoming drops, and play games together. What more do you expect!",
    },
  ];

  const brandList = [
    {
      title: "bitcoin",
      image: "/images/testimonials/bitcoin.svg",
      link: "#",
    },
    {
      title: "ethreum",
      image: "/images/testimonials/ethreum.svg",
      link: "#",
    },
    {
      title: "litecoin",
      image: "/images/testimonials/litecoin.svg",
      link: "#",
    },
    {
      title: "polkadot",
      image: "/images/testimonials/polkadot.svg",
      link: "#",
    },
    {
      title: "solana",
      image: "/images/testimonials/solana.svg",
      link: "#",
    },
    {
      title: "stellar",
      image: "/images/testimonials/stellar.svg",
      link: "#",
    },
    {
      title: "tron",
      image: "/images/testimonials/tron.svg",
      link: "#",
    },
    {
      title: "xrp",
      image: "/images/testimonials/xrp.svg",
      link: "#",
    },
  ];
  return (
    <>
      <StyledGradPaper>
        <Typography variant='h3' textAlign='center' component='div' sx={{ my: 7 }}>
          Testimonials
        </Typography>
        <Marquee direction='right' gradient={false}>
          {tList?.map((test, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
              maxWidth={"540px"}
              width='40%'
              mx='auto'
              pl={4}>
              <Avatar alt='Remy Sharp' src={test.image} sx={{ width: 65, height: 65, mt: 1 }} />
              <Box className='dialog-box' p={3} pl={4} ml={1}>
                <Typography variant='body1' component='p' fontSize={"1.5rem"} align='left'>
                  {test.title}
                </Typography>
                <Typography variant='body2' component='p' fontSize={"1rem"} align='left' maxWidth={"380px"}>
                  {test.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Marquee>
        <Box height={"5vh"} />
        <Marquee direction='left' gradient={false}>
          {tList.map((test, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
              maxWidth={"540px"}
              width='40%'
              mx='auto'
              pl={4}>
              <Avatar alt='Remy Sharp' src={test.image} sx={{ width: 65, height: 65, mt: 1, ml: 0 }} />
              <Box className='dialog-box' p={3} pl={4}>
                <Typography variant='body1' component='p' fontSize={"1.5rem"} align='left'>
                  {test.title}
                </Typography>
                <Typography variant='body2' component='p' fontSize={"1rem"} align='left' maxWidth={"380px"}>
                  {test.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Marquee>
        <Box height={"5vh"} />

        <Typography variant='h3' textAlign='center' component='div' sx={{ my: 7 }}>
          Who's Using It?
        </Typography>
        <Container maxWidth='lg'>
          <Grid container spacing={8} justifyContent='center'>
            {brandList?.map(brand => (
              <Grid item md={3} key={brand.title}>
                <CardActionArea href={brand.link}>
                  <CardMedia
                    component='img'
                    height='auto'
                    width='100%'
                    image={brand.image}
                    alt=''
                    sx={{ maxWidth: "180px", justifyContent: "center" }}
                  />
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledGradPaper>
    </>
  );
};

export default Testimonials;
