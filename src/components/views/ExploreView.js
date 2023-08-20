import React from "react";
import { Container, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2";
import FixedComponent from "../FixedComponents"; // Assicurati che l'import sia corretto

const ExploreView = () => {
  const mobileWidth = 600;
  const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`);

  return (
    <Container>
      <Navbar />
      <Grid container spacing={2}>
        {!isMobile && (
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={6}>
          <PostBrowser createPost contentType="posts" />
        </Grid>
        {!isMobile && (
          <Grid item xs={3}>
            <Sidebar2 />
          </Grid>
        )}
      </Grid>
      {!isMobile && <FixedComponent />} {/* Renderizza FixedComponent solo se non è mobile */}
    </Container>
  );
};

export default ExploreView;
