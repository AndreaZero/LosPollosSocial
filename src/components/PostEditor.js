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
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        justifyContent: 'space-between',
        backgroundColor: '#00001E'
      }}>
        <Typography>
        <h5 style={{fontWeight: 'lighter'}}> Grassetto: <code>**testo in grassetto** 
            <br/>
            <em>Corsivo:</em> <code>*testo corsivo*</code> </code>
            <br></br>
          Immagine: 
          <code style={{marginLeft: '4px', backgroundColor: "yellow", borderRadius: "4px", color: 'black', padding: '2px'}}>![Image](url_dell_immagine)</code>
          </h5>
       </Typography>

        <img style={{width: '90px', objectFit: 'contain'}} src={gas} alt="gas"></img>
    </Card>
    );

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              Inserisci un nuovo post
            </Typography>
          </HorizontalStack>
        )}

<Typography>
          <Link
            style={{ color: "yellow", cursor: "pointer" }}
            onClick={toggleFormattingHelp}
          >
            Helper
          </Link>
        </Typography>

        {showFormattingHelp && formattingHelp}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            sx={{backgroundColor: 'white', borderRadius: '0.4rem'}}
            fullWidth
            label="Titolo"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
         

<TextField
  sx={{ backgroundColor: "white", borderRadius: "0.4rem" }}
  fullWidth
  label="Contenuto"
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
