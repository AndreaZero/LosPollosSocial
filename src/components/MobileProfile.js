import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const MobileProfile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card sx={{ display: { sm: "block", md: "none" }, mb: 2 }}>
      {user ? (
        <Stack spacing={2}>
          <HorizontalStack spacing={2} justifyContent="space-between">
            <HorizontalStack>
              <UserAvatar width={50} height={50} username={user.username} />
              <Typography  style={{color: 'white'}}  variant="h6" textOverflow="ellipses">
                {user.username}
              </Typography>
            </HorizontalStack>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <HorizontalStack spacing={3}>
                <Stack alignItems="center">
                  <Typography>Like</Typography>
                  <Typography color="text.secondary">
                    <b>{props.profile.posts.likeCount}</b>
                  </Typography>
                </Stack>
                <Stack alignItems="center">
                  <Typography color="text.secondary">Post</Typography>
                  <Typography color="text.secondary">
                    <b>{props.profile.posts.count}</b>
                  </Typography>
                </Stack>
              </HorizontalStack>
            </Box>
          </HorizontalStack>
          <Divider />
          <Box>
            {currentUser && user._id === currentUser.userId && (
              <IconButton onClick={props.handleEditing} sx={{ mr: 1 }}>
                {props.editing ? (
                  <MdCancel color={iconColor} />
                ) : (
                  <AiFillEdit color={iconColor} />
                )}
              </IconButton>
            )}
            {user.biography ? (
              <>
                <Typography style={{color: 'white'}}  textAlign="center" variant="p">
                  <b>Bio: </b>
                  {user.biography}
                </Typography>
              </>
            ) : (
              <Typography style={{color: 'white'}}  variant="p">
                <i>
                  Nessuna bio ⛔ {" "}
                  {currentUser && user._id === currentUser.userId && (
                    <span>- Clicca su modifica per aggiornare la tua bio.</span>
                  )}
                </i>
              </Typography>
            )}
            {currentUser && user._id !== currentUser.userId && (
              <Box sx={{ mt: 2 }}>
                <Button style={{
                  backgroundColor: '#00001E'
                }} variant="outlined" onClick={props.handleMessage}>
                Send a message
                </Button>
              </Box>
            )}
            {props.editing && (
              <Box>
                <ContentUpdateEditor
                  handleSubmit={props.handleSubmit}
                  originalContent={user.biography}
                  validate={props.validate}
                />
              </Box>
            )}
          </Box>
        </Stack>
      ) : (
        <>Loading..</>
      )}
    </Card>
  );
};

export default MobileProfile;
