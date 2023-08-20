import { Button, Card, Stack, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdSettingsInputAntenna } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPosts, getUserLikedPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import CreatePost from "./CreatePost";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import gas from "../assets/img/gas.png";
import PostCard from "./PostCard";
import SortBySelect from "./SortBySelect";
import HorizontalStack from "./util/HorizontalStack";

const PostBrowser = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get("search") && search.get("search").length > 0;

  const fetchPosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
      sortBy,
    };

    let data;

    if (props.contentType === "posts") {
      if (props.profileUser) query.author = props.profileUser.username;
      if (searchExists) query.search = search.get("search");

      data = await getPosts(user && user.token, query);
    } else if (props.contentType === "liked") {
      data = await getUserLikedPosts(
        props.profileUser._id,
        user && user.token,
        query
      );
    }

    if (data.data.length < 10) {
      setEnd(true);
    }

    setLoading(false);
    if (!data.error) {
      setPosts([...posts, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, effect]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setPosts([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const removePost = (removedPost) => {
    setPosts(posts.filter((post) => post._id !== removedPost._id));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contentTypeSorts = {
    posts: {
      "-createdAt": "Ultimi",
      "-likeCount": "Like",
      "-commentCount": "Commenti",
      createdAt: "Recenti",
    },
    liked: {
      "-createdAt": "Ultimi",
      createdAt: "Recenti",
    },
  };

  const sorts = contentTypeSorts[props.contentType];

  return (
    <>
      <Stack spacing={2}>
        <Card>
          <HorizontalStack justifyContent="space-between">
            
          <Card style={{
            padding: "0px",
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#00001E',
        marginBottom: '1rem',
        boxShadow: "none"
      }}>
        <Typography style={{
          lineHeight: "28px"
        }}>
       <h2>Benvenuto su Los Pollos! 🍗 </h2>

       {user ? (
            <>
    <h2>Dai un'occhiata ai post ⤵️ </h2>
            </>
          ) : (
            <>
               <h4><Link style={{color:'yellow', marginRight: "3px"}} to='/login'>Esegui il login</Link>oppure
       <Link style={{color:'yellow', marginLeft: "3px"}} to='/signup'>registrati</Link>  per postare!</h4>
            </>
          )}

       </Typography>

    </Card>
    
<div style={{
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  borderRadius: "1rem",
  gap: '1rem',
  backgroundColor: 'yellow'
}}>
    <SortBySelect
              onSortBy={handleSortBy}
              sortBy={sortBy}
              sorts={sorts}
            />
            {props.createPost && <CreatePost />}
            </div>
          </HorizontalStack>

        </Card>

        {searchExists && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Ecco i risultati per "{search.get("search")}"
            </Typography>
            <Typography color="text.secondary" variant="span">
              {count} risultati trovati
            </Typography>
          </Box>
        )}

        {posts.map((post, i) => (
          <PostCard
            preview="primary"
            key={post._id}
            post={post}
            removePost={removePost}
          />
        ))}

        {loading && <Loading />}
        {end ? (
          <Stack py={5} alignItems="center">
            <Typography variant="h5" color="white" gutterBottom>
              {posts.length > 0 ? (
                <>Hai finito di guardare i post!</>
              ) : (
                <>Nessun post disponibile.</>
              )}
            </Typography>
            <Button sx={{backgroundColor: '#00001E', color: 'white', padding: '10px'}}  variant="text" size="small" onClick={handleBackToTop}>
              Torna su
            </Button>
          </Stack>
        ) : (
          !loading &&
          posts &&
          posts.length > 0 && (
            <Stack pt={2} pb={6} alignItems="center" spacing={2}>
              <Button onClick={fetchPosts} variant="contained">
                Carica di piu'
              </Button>
              <Button variant="text" size="small" onClick={handleBackToTop}>
                Torna su
              </Button>
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};

export default PostBrowser;
