import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
        backgroundColor:"yellow",
        borderRadius: '4px',
      }}
    >
      <FontAwesomeIcon icon={faPlusCircle} style={{ color: 'black', marginRight: '5px', }} />
      <span style={{color: 'black', fontWeight: 'bolder', }}>Crea Post</span>
    </Button>
  );
};

export default CreatePost;
