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
    setContent(e.target.value);
  
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
        backgroundColor: '#00001E',
        alignItems: "center",
        textAlign: 'center',
        border: 'none',
        boxShadow:"none"
      }}>
        <Typography>
        <h4 style={{fontWeight: 'lighter'}}> Grassetto: <code>**testo in grassetto** 
            <br/>
            <em>Corsivo:</em> <code>*testo corsivo*</code> </code>
            <br></br>
          Immagine: 
          <code style={{marginLeft: '4px', backgroundColor: "yellow", borderRadius: "4px", color: 'black', padding: '2px'}}>![Image](url_dell_immagine)</code>
          </h4>
          <Button style={{
        backgroundColor: 'yellow',
        color: 'black',
        height: '30px'
      
       }} onClick={toggleFormattingHelp}>CHIUDI</Button>
       </Typography>

           </Card>
           
    );

  return (

<Card sx={{ padding: isMobile ? '10px' : '20px' }}>
  <Stack spacing={isMobile ? 1 : 2}>
    {user && (
      <HorizontalStack
        style={{
          justifyContent: 'space-between',
          backgroundColor: "#002060",
          borderRadius: '1rem',
          padding: "10px",
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
    Nuovo post croccante di {user.username}
  </Typography>
  {!isMobile && (
    <Typography>
      <Link
        style={{ color: "yellow", cursor: "pointer" }}
        onClick={toggleFormattingHelp}
      >
        [Aiuto]
      </Link>
    </Typography>
  )}
  -
  <a href='/' style={{
    color: "yellow"
  }} to="/"> &lt;&lt; Torna ai post</a>
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
  sx={{ backgroundColor: "white", borderRadius: "0.4rem" }}
  fullWidth
  label="Scrivi qualcosa..."
  multiline
  rows={10}
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
  <Typography variant="caption" color="textSecondary">
    Hashtags: {hashtags.join(", ")}
  </Typography>
)}

<ErrorAlert error={serverError} />

          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: 'black',
              borderRadius: "0.7rem",
              color: 'yellow'
            }}
          >
            {loading ? <>Submitting</> : <>Post!</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
