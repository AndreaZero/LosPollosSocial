import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { Box, compose } from "@mui/system";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";
import CommentEditor from "./CommentEditor";
import ContentDetails from "./ContentDetails";
import HorizontalStack from "./util/HorizontalStack";
import { deleteComment, updateComment } from "../api/posts";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";
import { MdCancel } from "react-icons/md";
import { BiReply, BiTrash } from "react-icons/bi";
import { BsReply, BsReplyFill } from "react-icons/bs";
import Moment from "react-moment";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Comment = (props) => {
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateComment(comment._id, user, { content });

    const newCommentData = { ...comment, content, edited: true };

    setComment(newCommentData);

    editComment(newCommentData);

    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  let style = {
    backgroundColor: "rgb(12,59,161)",
    background: "linear-gradient(139deg, rgba(12,59,161,1) 26%, rgba(0,45,93,0.5767099075958508) 100%)",
    borderRadius: '0.5rem',
    boxShadow: '0px 0px 3px 0px black',
    mb: theme.spacing(2),
    padding: "10px"
  };
  

  if (depth % 2 === 1) {
    style.backgroundColor = "#A1A10A";
    style.color = "w";
  }

  return (
    <Box sx={style}>
      <Box
        sx={{
          pl: theme.spacing(2),
          pt: theme.spacing(1),
          pb: theme.spacing(1),
          pr: 1,
        }}
      >
        {props.profile ? (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              <Moment fromNow>{comment.createdAt}</Moment>{" "}
              {comment.edited && <>(Edited)</>}
            </Typography>
          </Box>
        ) : (
          <HorizontalStack justifyContent="space-between">

            <HorizontalStack>
              
              <ContentDetails
                username={comment.commenter.username}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />

              <IconButton
                color="primary"
                onClick={() => setMinimised(!minimised)}
              >
                {minimised ? (
                  <AiOutlinePlus size={15} />
                  
                ) : (
                  <AiOutlineLine size={15} />
                )}
                
              </IconButton>
              <span style={{color: 'white'}}>commented</span>
            </HorizontalStack>

            {!minimised && (
              <HorizontalStack spacing={1}>
                <IconButton
                  variant="text"
                  size="small"
                  onClick={handleSetReplying}
                >
                  {!replying ? (
                    <BsReplyFill color="yellow" />
                  ) : (
                    <MdCancel color={iconColor} />
                  )}
                </IconButton>
                {user && (isAuthor || user.isAdmin) && (
                  <HorizontalStack spacing={1}>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={() => setEditing(!editing)}
                    >
                      {editing ? (
                        <MdCancel color={iconColor} />
                      ) : (
                        <AiFillEdit color={iconColor} />
                      )}
                    </IconButton>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={handleDelete}
                    >
                      <BiTrash color={theme.palette.error.main} />
                    </IconButton>
                  </HorizontalStack>
                )}
              </HorizontalStack>
            )}
          </HorizontalStack>
        )}

        {!minimised && (
          <Box               style={{
            backgroundColor: "#00001E",
            padding: '15px',
            color: 'white',
            borderRadius: "0.4rem",
          }} sx={{ mt: 1}} overflow="hidden">
            {!editing ? (
              <Markdown content={comment.content} />
            ) : (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={comment.content}
              />
            )}

            {replying && !minimised && (
              <Box sx={{ mt: 2 }}>
                <CommentEditor
                
                  comment={comment}
                  addComment={addComment}
                  setReplying={setReplying}
                  label=""
                />
              </Box>
            )}
            {comment.children && (
              <Box sx={{ pt: theme.spacing(2) }}>
                {comment.children.map((reply, i) => (
                  <Comment
                  
                    key={reply._id}
                    comment={reply}
                    depth={depth + 1}
                    addComment={addComment}
                    removeComment={removeComment}
                    editComment={editComment}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
