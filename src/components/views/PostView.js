import { Container, Stack, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import PostCard from "../PostCard";
import Sidebar from "../Sidebar";
import Sidebar2 from "../Sidebar2"; // Aggiunto l'import per Sidebar2
import { useParams } from "react-router-dom";
import { getPost } from "../../api/posts";
import { useMediaQuery } from "@mui/material";
import Comments from "../Comments";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";

const PostView = () => {
  const params = useParams();
  const mobileWidth = 600;
  const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`);
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  useEffect(() => {
    document.title = `Commenti - LPG`;
    return () => {
      document.title = "Los Pollos GVNG - Home";
    };
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  return (
    <Container>
      <Navbar />
      <Grid container spacing={2}>
      {!isMobile && (
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={9}>
          <GridLayout
            left={
              loading ? (
                <Loading />
              ) : post ? (
                <Stack spacing={2}>
                  <PostCard post={post} key={post._id} />
                  <Comments />
                </Stack>
              ) : (
                error && <ErrorAlert error={error} />
              )
            }
            right={<Sidebar2 />} // Aggiunto Sidebar2 come componente nella colonna destra
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostView;
