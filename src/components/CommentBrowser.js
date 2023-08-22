import { Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserComments } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import Comment from "./Comment";
import Loading from "./Loading";
import SortBySelect from "./SortBySelect";

const CommentBrowser = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("-createdAt");

  const fetchComments = async () => {
    setLoading(true);

    const newPage = page + 1;
    setPage(newPage);

    let comments = await getUserComments({
      id: props.profileUser._id,
      query: { sortBy },
    });

    setComments(comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [sortBy]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setComments([]);
    setPage(0);
    setSortBy(newSortBy);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sorts = {
    "-createdAt": "Latest",
    createdAt: "Oldest",
  };

  return (
    <Stack spacing={2}>
      
      {loading ? (
        <Loading />
      ) : (
        <>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} profile />
            ))}

          <Stack py={5} alignItems="center">
            <Typography variant="h5" color="white" style={{
              padding: "20px",
              borderRadius: '1rem',
              display: "flex",
              gap: '0.4rem',
              flexDirection: "column"
            }} gutterBottom>
              {comments.length > 0 ? (
                <>Comments ended! 😎</>
              ) : (
                <>No comments available 😔</>
              )}
                          <Button  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#00001E';
    e.currentTarget.style.color = 'white';
  }}
  activeStyle={{
    backgroundColor: 'yellow',
    color: 'black'
  }} sx={{backgroundColor: '#00001E', color: 'yellow', padding: '10px', fontSize: '16px'}}  variant="text" size="small" onClick={handleBackToTop}>
              Vai all'inizio
            </Button>
            </Typography>

          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CommentBrowser;
