import { Typography } from "@mui/material";
import React from "react";
import zero from "../assets/img/zero.png";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="white" style={{display: 'flex', flexDirection:'column', alignItems: "center", justifyContent: 'center'}}>
      Copyright © 2022 - AndreaZero.eth
      <a href='https://twitter.com/Andrea__Zero/' target="_blank" rel="noopener noreferrer"  
      style={{color: 'yellow' }} to="/">
<img style={{width: '18px', objectFit: 'contain' }} src={zero} alt="zero"></img>
      </a>


    </Typography>
  );
};

export default Copyright;
