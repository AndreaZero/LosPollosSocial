import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GiPodiumWinner } from 'react-icons/gi';
import { MdRefresh } from "react-icons/md";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserEntry from "./UserEntry"; // Assicurati che l'import sia corretto

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={{
            backgroundColor: "#00001E",
            padding: "5px",
            borderRadius: "0.4rem",
          }}
        >
          <AiOutlineUser style={{ color: "white" }} />
          <Typography style={{ color: "white" }}>Pollos List</Typography>

          <IconButton
            sx={{ padding: 0, color: 'white'}}
            disabled={loading}
            onClick={handleClick}
          >
                      <GiPodiumWinner />
            <MdRefresh />
          </IconButton>
        </Stack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <Stack
              key={user.username}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
            >
              <Typography style={{color: 'yellow', fontSize: "20px"}}> {user.username}</Typography>
              <Typography style={{fontSize: "20px"}}>Punti: {user.points}</Typography>
            </Stack>
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
