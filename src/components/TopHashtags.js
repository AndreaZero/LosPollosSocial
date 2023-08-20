import React, { useEffect, useState } from "react";
import { Card, Stack, Typography } from "@mui/material";
import Loading from "./Loading";
import gas from "../assets/img/gas.png";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { getPostsByHashtag, getPost } from "../api/posts"; // Import the functions to get posts by hashtag and get a specific post

const TopHashtags = () => {
  const [loading, setLoading] = useState(true);
  const [topHashtags, setTopHashtags] = useState([]);
  const user = isLoggedIn();

  useEffect(() => {
    fetchTopHashtags();
  }, []);

  const fetchTopHashtags = async () => {
    try {
      const data = await getPostsByHashtag(); // You need to call the function

      const extractedHashtags = [];

      if (data && data.data) {
        data.data.forEach(post => {
          if (post.hashtags && post.hashtags.length > 0) {
            extractedHashtags.push(...post.hashtags);
          }
        });

        // Count hashtag occurrences
        const hashtagCounts = extractedHashtags.reduce((acc, hashtag) => {
          acc[hashtag] = (acc[hashtag] || 0) + 1;
          return acc;
        }, {});

        // Sort hashtags by their occurrence count
        const sortedHashtags = Object.keys(hashtagCounts).sort(
          (a, b) => hashtagCounts[b] - hashtagCounts[a]
        );

        // Take the top 3 hashtags
        const topHashtags = sortedHashtags.slice(0, 3);
        setTopHashtags(topHashtags);
        
      }

      setLoading(false);

    } catch (error) {
      console.error("Error fetching hashtags:", error);
      setLoading(false);
    }
  };
  

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Card
        >
          <HorizontalStack style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <MdLeaderboard />
            <span  style={{ color: 'white', fontSize: "20px"  }}>Top Pollos HASHTAGS</span>
            <img style={{width: '40px', objectFit: 'contain'}} src={gas} alt="gas"></img>
          </HorizontalStack>
        </Card>
      )}
    </div>
  );
};

export default TopHashtags;
