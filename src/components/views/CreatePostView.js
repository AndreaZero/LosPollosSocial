import { Container, Grid } from "@mui/material";
import React, {useState} from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import { useMediaQuery } from "@mui/material";
import Sidebar2 from "../Sidebar2";
import PostBrowser from "../PostBrowser";
import { isLoggedIn } from "../../helpers/authHelper";
import FixedComponent from "../FixedComponents"; // Assicurati che l'import sia corretto
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";

const CreatePostView = () => {
  React.useEffect(() => {
    document.title = `Crea un post - LPG`;
    return () => {
      // Reimposta il titolo quando il componente viene smontato
      document.title = "Los Pollos GVNG - Home";
    };
  }, []);

  const mobileWidth = 600;
  const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`);
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();

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
          <PostEditor />
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

export default CreatePostView;
