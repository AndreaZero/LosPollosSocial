import { Box, Divider, List, Stack, Typography } from "@mui/material";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import Loading from "./Loading";
import UserMessengerEntry from "./UserMessengerEntry";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/bi";
import { isLoggedIn } from "../helpers/authHelper";
import { BiSad } from "react-icons/bi";

const UserMessengerEntries = (props) => {

  const user = isLoggedIn();
  
  return !props.loading ? (
    <>
      {props.conversations.length > 0 ? (
        <Stack>
          <HorizontalStack
            alignItems="center"
            spacing={2}
            sx={{ px: 2, height: "60px",  backgroundColor: '#00001E',   borderBottom: '1px solid #03A9FC', // Definisce il bordo
            boxShadow: '0 0 8px 2px #03A9FC',}}
          >
            <AiFillMessage style={{color:"white"}}  size={30} />
            {user ? (
            <>
            <Typography style={{color:"white"}} >
              <b>Your messenger - {user.username}</b>
            </Typography>
            </>
            ) : (
              <>
              <Typography />
</>
            )}
          </HorizontalStack>
          <Divider  />
          <Box  sx={{ height: "calc(100vh - 171px)", padding: "20px"}}>
            <Box sx={{ height: "100%" }}>
              <List sx={{ borderRadius: '1rem', background: 'rgb(0,93,186)', boxShadow: "0px 0px 3px 0px black",
               background: 'linear-gradient(122deg, rgba(0,93,186,1) 0%, rgba(0,0,30,0) 100%)', color: 'black', padding: 0, maxHeight: "100%", overflowY: "auto" }}>
                {props.conversations.map((conversation) => (
                  <UserMessengerEntry
                    conservant={props.conservant}
                    conversation={conversation}
                    key={conversation.recipient.username}
                    setConservant={props.setConservant}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Stack
          sx={{ height: "100%" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          textAlign="center"
        >
          <BiSad style={{color: 'yellow'}} size={60} />
          <Typography style={{color: 'white'}} variant="h5">Non ci sono chat</Typography>
          <Typography style={{color: 'white'}} color="text.secondary" sx={{ maxWidth: "70%" }}>
            Clicca su 'Message' nel profilo di un utente per avviare una chat!
          </Typography>
        </Stack>
      )}
    </>
  ) : (
    <Stack sx={{ height: "100%" }} justifyContent="center">
      <Loading />
    </Stack>
  );
};

export default UserMessengerEntries;
