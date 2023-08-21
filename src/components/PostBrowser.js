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
import Footer from "./Footer";
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
          <HorizontalStack style={{
            padding: "10px",
        display: 'flex',
        boxShadow: '0px 0px 3px 0px black',
        backgroundColor: '#00001E',

        borderRadius: '0.7rem',
        color: 'white',
      }}>
    
<div style={{
  display: 'flex',
  padding: '10px',
  justifyContent: 'space-between',
  borderRadius: "1rem",
  gap: '1rem',

}}>
    <SortBySelect
              onSortBy={handleSortBy}
              sortBy={sortBy}
              sorts={sorts}
            />
            {props.createPost && <CreatePost />}
            </div>
          </HorizontalStack>

        {searchExists && (
          <Box>
            <Typography color="black" style={{
              backgroundColor: 'yellow',
              padding: "20px",
              borderRadius: '1rem',
              display: "flex",
              gap: '0.4rem',
              flexDirection: "column"
            }} variant="h5" gutterBottom>
              Ecco i risultati per "{search.get("search")}" ⤵️
              <Typography style={{fontSize: "16px"}} color="text.secondary" variant="span">
              {count} post trovati
            </Typography>
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
            <Typography variant="h5" color="white" style={{
              padding: "20px",
              borderRadius: '1rem',
              display: "flex",
              gap: '0.4rem',
              flexDirection: "column"
            }}  gutterBottom>
              {posts.length > 0 ? (
                <>Hai visto tutti i post! 😎 </>
              ) : (
                <>Nessun post disponibile. 😔</>
              )}
                          <Button  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#00B3FF';
    e.currentTarget.style.color = 'white';
  }}
  activeStyle={{
    backgroundColor: 'yellow',
    color: 'black'
  }} sx={{backgroundColor: '#00001e', color: 'yellow', padding: '10px', fontSize: '16px', boxShadow: "0px 0px 5px 0px black"}}  variant="text" size="small" onClick={handleBackToTop}>
              Vai all'inizio
            </Button>
            </Typography>
            <Footer/>
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
              <Footer />
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};

export default PostBrowser;
