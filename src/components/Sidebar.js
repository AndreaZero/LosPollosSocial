import { Stack } from "@mui/material";
import { Box } from '@mui/material';
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PostCard from "./PostCard";
import TopPosts from "./TopPosts";
import TopHashtags from "./TopHashtags";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
            <TopHashtags />
      <FindUsers />    </Stack>
  );
};

export default Sidebar;
