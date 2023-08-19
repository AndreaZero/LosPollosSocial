import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import PostCard from "./PostCard";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";

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
    <Stack  style={{backgroundColor: '#00B3FF', padding: "10px", borderRadius: '1rem'}} spacing={2}>
      <Card>
        <HorizontalStack>
          <MdLeaderboard/>
          <span style={{color: 'yellow'}}>Top post!</span>
        </HorizontalStack>
      </Card>
      {!loading ? (
        posts &&
        posts.map((post) => (
          <PostCard preview="secondary" post={post} key={post._id} />
        ))
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default TopPosts;
