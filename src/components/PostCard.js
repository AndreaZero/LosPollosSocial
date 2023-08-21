import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost, unlikePost, updatePost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import { useMediaQuery } from "@mui/material";

import ContentDetails from "./ContentDetails";

import LikeBox from "./LikeBox";
import PostContentBox from "./PostContentBox";
import HorizontalStack from "./util/HorizontalStack";

import {} from "react-icons/ai";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";

import "./postCard.css";
import { MdCancel } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import UserLikePreview from "./UserLikePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMessage, faMinus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const PostCard = (props) => {
  const { preview, removePost } = props;
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData.poster.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const mobileWidth = 600;
  const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`);
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };

  return (
    <Card sx={{ padding: 0, boxShadow: '0px 0px 5px 0px black'}} className="post-card">
<Box sx={{
  background: 'rgb(0,0,30)',
  background: 'linear-gradient(309deg, rgba(0,0,30,1) 0%, rgba(0,51,102,1) 100%)',
  
  color: 'white',
}} className={preview}>
        <HorizontalStack spacing={0} alignItems="initial">
          <Stack
            justifyContent="space-between "
            alignItems="center"
            spacing={1}
            sx={{
              backgroundColor: "#00001E",
              width: "100px",
              padding: theme.spacing(1),
              color: 'yellow',
              boxShadow: '0px 0px 15px 0px black', // Aggiungi questa linea per il bordo a destra

            }}
          >
  <LikeBox
    likeCount={likeCount}
    liked={post.liked}
    onLike={handleLike}
  />
  {likeCount > 0 ? (
    <h5 style={{
      textAlign: 'center',
      fontWeight: 'lighter'
    }}> 
      <br />
      ti piace! 🤩
    </h5>
  ) : (
    <h5 style={{
      textAlign: 'center',
      fontWeight: 'lighter'
    }}>Nessun mi piace</h5>
  )}
          </Stack>
          <PostContentBox clickable={preview} post={post} editing={editing}>
            <HorizontalStack backgroundColor='' padding='5px' borderRadius='0.4rem' justifyContent="space-between">
              <ContentDetails
                username={post.poster.username}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
              <Box>
                {user &&
                  (isAuthor || user.isAdmin) &&
                  preview !== "secondary" && (
                    <HorizontalStack style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <IconButton
                        disabled={loading}
                        size="small"
                        style={{color: '#10A9FA', fontSize: '14px', fontFamily: 'Abel', fontWeight: "bold"}}
                        onClick={handleEditPost}
                      > Modifica
                        {editing ? (
                          <MdCancel style={{marginLeft: '4px'}}  color={iconColor} />
                        ) : (
                          <AiFillEdit  style={{marginLeft: '4px'}} color={iconColor} />
                        )}

                      </IconButton>

                      <IconButton
                        disabled={loading}
                        size="small"
                        style={{color: 'red', fontSize: '14px',  fontFamily: 'Abel', fontWeight: "bold"}}
                        onClick={handleDeletePost}
                      >                        Elimina
                        {confirm ? (
                          <AiFillCheckCircle style={{marginLeft: '4px'}}  color={theme.palette.error.main} />
                        ) : (
                          <BiTrash style={{marginLeft: '4px'}} color={theme.palette.error.main} />
                        )}

                      </IconButton>

                    </HorizontalStack>
                  )}
              </Box>
            </HorizontalStack>

            {preview !== "secondary" &&
              (editing ? (
                <ContentUpdateEditor
                  handleSubmit={handleSubmit}
                  originalContent={post.content}
                />
              ) : (
                <Box 
                  maxHeight={maxHeight}
                  overflow="hidden"
                  className="content"
                >
                </Box>
              ))}
              <Card style={{
  padding: '10px',
  borderRadius: '0.4rem',
  backgroundColor: "transparent",
  boxShadow: "none",
  color: 'white',
  border: "none"
}}>
  <Markdown content={post.content} />
</Card>


            <HorizontalStack style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: "#00001E",
              maxHeight: "30px",
              marginTop: "0.4rem",
              padding:"10px",
              borderRadius: "0.3rem"
          
            }}justifyContent="space-between">

<Typography
variant="subtitle2"
color="text.secondary"
sx={{ fontWeight: "bolder", color: "white", textAlign: 'right', fontSize: '12px'}}
>
  
<FontAwesomeIcon style={{ marginLeft: "3px", marginRight: '5px'}} icon={faThumbsUp}></FontAwesomeIcon>
{post.likeCount} mi piace
<FontAwesomeIcon style={{ marginLeft: "7px", marginRight: '5px'}} icon={faMinus}></FontAwesomeIcon>
<FontAwesomeIcon  style={{ marginRight: '5px'}}icon={faComment}></FontAwesomeIcon>
{post.commentCount === 0 ? (
"0 commenti" 
) : post.commentCount === 1 ? (
`1 commento`
) : (
`(${post.commentCount})`
)}
</Typography>
{!isMobile && (
    <h5 style={{ color: 'white' }}>
      <span style={{ color: 'yellow' }}>
        {post.hashtags.length > 0 ? post.hashtags : 'Nessun hashtag'}
      </span>
    </h5>
  )}
</HorizontalStack>
              

              <Box>
                <UserLikePreview
                  postId={post._id}
                  userLikePreview={post.userLikePreview}
                />
              </Box>
          </PostContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default PostCard;
