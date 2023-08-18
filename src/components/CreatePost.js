import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      size="medium"
      onClick={() => navigate("/posts/create")}
      sx={{
        gap: "0.2rem",
        whiteSpace: "nowrap",
        border: '1px solid yellow',
        borderRadius: '4px',
      }}
    >
      <AiOutlinePlus style={{ color: 'white', marginRight: '5px'}} />
      <span style={{color: 'yellow'}}>Posta!</span>
    </Button>
  );
};

export default CreatePost;
