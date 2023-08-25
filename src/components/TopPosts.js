import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import gas from "../assets/img/gas.png";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowDownLong } from "@fortawesome/free-solid-svg-icons";

const TopPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const user = isLoggedIn();

  const fetchPosts = async () => {
    const query = { sortBy: "-likeCount" };

    const data = await getPosts(user && user.token, query);

    const topPosts = [];

    if (data && data.data) {
      for (let i = 0; i < 3 && i < data.data.length; i++) {
        topPosts.push(data.data[i]);
      }
    }

    setPosts(topPosts);

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Stack
      spacing={2}
    >
      <Card
      >
        <HorizontalStack style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <MdLeaderboard color="white" />
          <span  style={{ color: 'white', fontSize: "20px", display: 'flex', flexDirection: "column"}}>Top Post
          <FontAwesomeIcon icon={faArrowDownLong}></FontAwesomeIcon>
          </span>
          <img style={{width: '40px', objectFit: 'contain'}} src={gas} alt="gas"></img>
        </HorizontalStack>
      </Card>
      {!loading ? (
        posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard preview="secondary" post={post} key={post._id} />
          ))
        ) : (
          <span style={{ color: 'white', display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>Nessun post da vedere. 🙄
             </span>
        )
      ) : (
        <Loading />
      )}
    </Stack>
  );
      }  

export default TopPosts;
