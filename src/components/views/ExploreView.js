import React, {useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import { isLoggedIn } from "../../helpers/authHelper";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2";
import FixedComponent from "../FixedComponents"; // Assicurati che l'import sia corretto

const ExploreView = () => {
  const mobileWidth = 600;
  const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`);
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();

  return (
    <Container>
      <Navbar />
      
      <Grid container spacing={1}>
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
      {!isMobile &&  currentUser && <FixedComponent />} {/* Renderizza FixedComponent solo se non è mobile */}
    </Container>
  );
};

export default ExploreView;
