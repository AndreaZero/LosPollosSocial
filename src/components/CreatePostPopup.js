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
  
  const CreatePostPopup = () => {
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
  

    return (

  <Card style={{
    height: "350px",
    width: "500px",
  }}>
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
  </div>
  {!isMobile && (
    <img style={{
      width: '80px',
      objectFit: 'contain',
    }} src={gas} alt="gas"></img>
  )}
  </HorizontalStack>  
          )}

  
          <Box component="form" style={{color: 'white'}} onSubmit={handleSubmit}>
  
        
  <TextField
    sx={{borderRadius: "0.4rem"
  }}
    fullWidth
    label="Type something cool..."
    multiline
    rows={2.5}
    style={{color: 'white'}}
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
  
  export default CreatePostPopup;