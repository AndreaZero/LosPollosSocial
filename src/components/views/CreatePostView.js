import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
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
  return (
    <Container>
      <Navbar />
      <GridLayout left={<PostEditor />} right={<Sidebar />} />
    </Container>
  );
};

export default CreatePostView;
