import {
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
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
import UserLikePreview from "./UserLikePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMinus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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
    <Card sx={{ padding: 0, boxShadow: '0px 0px 5px 0px black', border: 'none'}} className="post-card">
<Box sx={{
  background: 'rgb(0,0,30)',
  background: 'linear-gradient(309deg, rgba(0,51,102,1), #19A4F6)',
  fontSize: '12px',
  color: 'white',
}} className={preview}>
        <HorizontalStack spacing={0} alignItems="initial">
          <Stack
            justifyContent="space-between "
            alignItems="center"
            spacing={1}
            sx={{
              background: '#00001E',
              background: 'linear-gradient(180deg, #00001E 0%,rgba(0,4,30,0) 100% )',
              width: 'auto',
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
    <UserLikePreview
    postId={post._id}
    userLikePreview={post.userLikePreview}
    />

  ) : (
<h5 style={{textAlign: 'center'}}>No likes</h5>
  )}
          </Stack>
          <PostContentBox  clickable={preview} post={post} editing={editing}>
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
                      > Edit
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
                      >                        Delete
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

<HorizontalStack
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid rgb(25,164,246)" // Aggiungi il bordo superiore qui
  }}
>

<Typography
variant="subtitle2"
color="text.secondary"
sx={{ fontWeight: "bolder", color: "#00001E", textAlign: 'right', fontSize: '12px'}}
>
  
<FontAwesomeIcon style={{ marginLeft: "3px", marginRight: '5px'}} icon={faThumbsUp}></FontAwesomeIcon>
{post.likeCount} like
<FontAwesomeIcon style={{ marginLeft: "7px", marginRight: '8px'}} icon={faMinus}></FontAwesomeIcon>
<FontAwesomeIcon  style={{ marginRight: '5px'}}icon={faComment}></FontAwesomeIcon>
{post.commentCount === 0 ? (
"0 comments" 
) : post.commentCount === 1 ? (
`1 comment`
) : (
`(${post.commentCount})`
)}

</Typography>


</HorizontalStack>
            
          </PostContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default PostCard;
