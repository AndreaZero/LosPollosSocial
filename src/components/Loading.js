import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const Loading = ({ label }) => {
  return (
    <Stack alignItems="center">
      <CircularProgress size={50} sx={{ my: 1 }} />
      <Typography color="white" sx={{ mb: 3 }}>
        {label || "Caricamento.."}
      </Typography>
    </Stack>
  );
};

export default Loading;
