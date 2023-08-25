import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserEntry = ({ username }) => {
  return (
    <HorizontalStack justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={30} height={30} username={username} />
        <Typography style={{color: 'yellow'}}> {username}</Typography>
      </HorizontalStack>
      <Link style={{
        color: "white"
      }} to={"/users/" + username}>go to pofile</Link>
    </HorizontalStack>
  );
};

export default UserEntry;
