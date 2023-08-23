import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import gas from "../assets/img/gas.png";
import HorizontalStack from "./util/HorizontalStack";
import { useMediaQuery } from '@mui/material';
import UserAvatar from "./UserAvatar";
import GoBack from "./GoBack";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]); // Aggiungi questo stato
  const mobileWidth = 600; // Puoi regolare questo valore in base alle tue esigenze
  const isMobile = useMediaQuery(`(max-width: ${mobileWidth}px)`);

  const [formData, setFormData] = useState({
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    // Estrai gli hashtag dal contenuto
    const extractedHashtags = e.target.value.match(/#[^\s#]+/g) || [];
    setHashtags(extractedHashtags);
    
    const errors = validate();
    setErrors(errors);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };

    // Function to handle showing the formatting help card
    const [showFormattingHelp, setShowFormattingHelp] = useState(false);

    const toggleFormattingHelp = () => {
      setShowFormattingHelp(!showFormattingHelp);
    };
  
    const formattingHelp = (
      <Card style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#00B3FF',
        alignItems: "center",
        textAlign: 'center',
        border: 'none',
        boxShadow: '0px 0px 15px 0px black',
      }}>
        <Typography>
        <h4 style={{fontWeight: 'bolder'}}> 
        to insert a link type: <code>![Title](paste the link here)</code> <br />
        to insert a picture type:   <code >![Image](paste the image url here)</code>         
          </h4>
          <Button style={{
        backgroundColor: 'yellow',
        color: 'black',
        height: '30px'
      
       }} onClick={toggleFormattingHelp}>CLOSE</Button>
       </Typography>

           </Card>
           
    );

  return (

<Card style={{
  height: "350px",
  backgroundColor: "#00001E"
}}   sx={{ padding: isMobile ? '20px' : '20px' }}>
  <Stack spacing={isMobile ? 1 : 2}>
    {user && (
      <HorizontalStack
        style={{
          justifyContent: 'space-between',
          backgroundColor: "#001F4A",
          borderRadius: '0.6rem',
          padding: "10px",
          boxShadow: "0px 0px 3px 0px black",
          color: 'white',
          marginBottom: isMobile ? '10px' : 0
        }}
        spacing={2}
      >
<div style={{
  display: "flex",
  gap: '1rem',
  alignItems: "center",
  justifyContent: 'center'
}}>
  <UserAvatar width={50} height={50} username={user.username} />
  <Typography variant="h5">
    Add a new post {user.username}!
  </Typography>
  {!isMobile && (
    <Typography>
      <Link
        style={{ color: "yellow", cursor: "pointer" }}
        onClick={toggleFormattingHelp}
      >
        [Helper]
      </Link>
    </Typography>
  )}
</div>
{!isMobile && (
  <img style={{
    width: '80px',
    objectFit: 'contain',
  }} src={gas} alt="gas"></img>
)}
</HorizontalStack>


        )}

        {showFormattingHelp && formattingHelp}

        <Box component="form" onSubmit={handleSubmit}>

      
<TextField
  sx={{borderRadius: "0.4rem", background: 'rgb(0,93,186)',
  background: 'linear-gradient(122deg, rgba(255,255,255,1) 0%, rgba(0,93,186,1) 100%)', boxShadow: "0px 0px 5px 0px black"
}}
  fullWidth
  label="Type something cool..."
  multiline
  rows={3}
  name="content"
  margin="normal"
  onChange={(e) => {
    handleChange(e);
    setContent(e.target.value);
  }}
  value={content}
  error={errors.content !== undefined}
  helperText={errors.content}
  required
/>
{hashtags.length > 0 && (
  <Typography variant="caption" color="white">
    Hashtags: {hashtags.join(", ")}
  </Typography>
)}
<ErrorAlert error={serverError} />

          <ErrorAlert error={serverError} />
          <center>
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: 'yellow',
              borderRadius: "0.7rem",
              color: 'black',
              width: "200px",
              fontWeight: "bolder"
            }}
          >
            {loading ? <>Submitting</> : <>Send post!</>}
          </Button>
          </center>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;