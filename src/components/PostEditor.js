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
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");


  const [content, setContent] = useState("");

  const handleInsertImageMarkdown = () => {
    const newText = content + " ![Image](inserisci l'url)";
    setContent(newText);
  
    const inputElement = document.getElementById("content-input");
    if (inputElement) {
      const cursorPosition = newText.indexOf("(");
      inputElement.focus();
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }
  };
  

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
          <a style={{color: 'yellow'}} href="https://commonmark.org/help/" target="_blank">
            Aiuto per la formattazione
          </a>
        </Typography>

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
  value={content + (imageURL ? `\n![Image](${imageURL})` : "")}
  error={errors.content !== undefined}
  helperText={errors.content}
  required
/>
<Button
  variant="outlined"
  onClick={() => {
    setContent(content + (imageURL ? `\n![Image](${imageURL})` : ""));
    setImageURL("");
  }}
  sx={{
    mt: 1,
    width: '100%',
    backgroundColor: "black",
    borderRadius: '1rem',
    color: "yellow",
  }}
>
<TextField
  sx={{ backgroundColor: "white", borderRadius: "0.4rem"}}
  fullWidth
  label="URL dell'immagine"
  name="imageURL"
  margin="normal"
  onChange={(e) => setImageURL(e.target.value)}
  value={imageURL}
  required
/>
  Aggiungi immagine
</Button>



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
            {loading ? <>Submitting</> : <>Crea post</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
