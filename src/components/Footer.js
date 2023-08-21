import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";
import zero from "../assets/img/zero.png";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card style={{display: 'flex', alignItems: "center", justifyContent: 'center', marginTop: "1rem", height: "50px"}}>
      <Typography variant="subtitle1"   style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}color="white">
          dev with 💙 by
      <a href='https://twitter.com/Andrea__Zero/' target="_blank" rel="noopener noreferrer"  
      style={{color: 'yellow' }} to="/">
<img style={{width: '20px', objectFit: 'contain', marginLeft:'8px', marginTop: "3px" }} src={zero} alt="zero"></img>
      </a>
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
