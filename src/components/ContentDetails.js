import { Avatar, Typography } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import Moment from "react-moment";


import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <HorizontalStack sx={{}}>
      <UserAvatar width={30} height={30} username={username} />

      <Typography variant="subtitle" color="text.secondary" gutterBottom>
        <Link
          style={{
            color: "white",
          }}
          underline="hover"
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={"/users/" + username}
        >
        {username}
        </Link>
        <br />
        {!preview && (
          <>
            {" "}
            <Moment style={{color: 'yellow'}} fromNow>{createdAt}</Moment> {edited && <>
              <span style={{color: '#19A5F7'}}>(Edited)</span></>}
            <FontAwesomeIcon style={{color: "white", marginLeft: "4px"}} icon={faClockFour}></FontAwesomeIcon>
          </>
        )}
      </Typography>
    </HorizontalStack>
  );
};

export default ContentDetails;
