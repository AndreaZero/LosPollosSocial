import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1">
          Sviluppato con amore da @AndreaZero
          <a
            href="https://twitter.com/Andrea__Zero"
            target="_blank"
          >
            @AndreaZero
          </a>
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
