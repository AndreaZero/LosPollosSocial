import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1">
          dev with 💙 by
          <a
            href="https://twitter.com/Andrea__Zero"
            target="_blank"
            style={{color: 'yellow', marginLeft: '8px'}}
          > 
            @AndreaZero
          </a>
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
