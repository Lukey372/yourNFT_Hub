import React, { useEffect, useState } from "react";
import {
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  Box,
} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const ScrollToTop = () => {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Box sx={{
      position: `fixed`,
      bottom: `4.5rem`,
      right: `1.5rem`,
      animation: `fadeIn 700ms ease-in-out 1s both`,
      cursor: `pointer`,
      width: `50px`,
      height: `50px`
    }} >
      {
        isVisible && <Box onClick={scrollToTop} sx={{
          width: `100%`,
          height: `100%`,
          background: `white`,
          borderRadius: `50%`,
          color: `black`,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`
        }} ><ArrowUpwardIcon sx={{
          fontSize: `40px`
        }} />
        </Box>
      }
    </Box>
  )
}
export default ScrollToTop