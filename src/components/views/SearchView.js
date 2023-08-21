import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Sidebar2 from "../Sidebar2";

const SearchView = () => {
  React.useEffect(() => {
    document.title = `Ricerca - LPG`;
    return () => {
      // Reimposta il titolo quando il componente viene smontato
      document.title = "Los Pollos GVNG - Home";
    };
  }, []);
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={
          <Stack spacing={2}>
            <PostBrowser createPost contentType="posts" />
          </Stack>
        }
        right={<Sidebar2 />}
      />
    </Container>
  );
};

export default SearchView;
