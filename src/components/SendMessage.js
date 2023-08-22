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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
const SendMessage = (props) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent("");
  };

  return (
    <center>
    <Stack
      sx={{
        backgroundColor: '#00001E',
        width: "95%",
        p: "10px",
        color: 'black',
        border: '1px solid #19A4F6',
        height: "55px",
        borderRadius: "0.5rem",

      }}
      justifyContent="center"
    >
      <HorizontalStack>
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label="Type your message here.."
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

        <Button style={{backgroundColor: '#202029', color: 'white'}} onClick={handleSendMessage} disabled={content.length === 0}>
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </Button>
      </HorizontalStack>
    </Stack>
    </center>
  );
};

export default SendMessage;
