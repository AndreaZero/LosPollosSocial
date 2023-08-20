import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sendMessage } from "../api/messages";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";

const SendMessage = (props) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent("");
  };

  return (
    <Stack
      sx={{
        backgroundColor: 'white',
        padding: '20px',
        m: 2,
        color: 'black',
        height: "35px",
        borderRadius: "0.5rem"
      }}
      justifyContent="center"
    >
      <HorizontalStack>
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label="Invia un messaggio.."
          fullWidth
          sx={{
            border: 'none',
          }}
          value={content}
          autoComplete="off"
          size="small"
          onKeyPress={(e) => {
            if (e.key === "Enter" && content.length > 0) {
              handleSendMessage();
            }
          }}
        />

        <Button style={{backgroundColor: '#202029', color: 'yellow'}} onClick={handleSendMessage} disabled={content.length === 0}>
          Invia
        </Button>
      </HorizontalStack>
    </Stack>
  );
};

export default SendMessage;
