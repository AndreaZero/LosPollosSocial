import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Footer from "./Footer";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";


const Profile = (props) => {
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
    <Card>
      {user ? (
        <Stack alignItems="center" spacing={2}>
          <Box my={1}>
            <UserAvatar width={150} height={150} username={user.username} />
          </Box>

          <Typography style={{ color: 'white' }} variant="h5">
  {user.username}
</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <Typography style={{color: 'white'}}  textAlign="center" variant="p">
              <b>Bio: </b>
              {user.biography}
            </Typography>
          ) : (
            <Typography style={{color: 'white'}}  variant="p">
              <i>User has no bio yet!</i>
            </Typography>
          )}

          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
              >
                {props.editing ? <>Cancel</> : <>Edit bio</>}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button style={{color: 'white', border: '1px solid yellow', backgroundColor: '#00001E',
            borderRadius: '4px',}} variant="outlined" onClick={props.handleMessage}>
              Send a message
              <FontAwesomeIcon style={{marginLeft: "8px"}} icon={faMessage}></FontAwesomeIcon>
            </Button>
          )}

          <HorizontalStack>
            <Typography color="white">
              Like <b style={{color: 'yellow'}}>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="white">
              Post <b style={{color: 'yellow'}}>{props.profile.posts.count}</b>
            </Typography>
            <Typography color="white"> - joined {moment(user.createdAt).format('D MMMM YYYY')}</Typography>

          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile.." />
      )}
    </Card>
  );
};

export default Profile;
