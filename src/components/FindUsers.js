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
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import gas from '../assets/img/gas.png';
import { MdLeaderboard } from "react-icons/md";
import HorizontalStack from "./util/HorizontalStack";
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
                <HorizontalStack style={{ display: 'flex', justifyContent: 'space-between' }}>
                <GiPodiumWinner color="white" style={{fontSize: "20px"}}/>
            <span style={{ color: 'white', fontSize: "20px", backgroundColor: 'transparent'}}>Pollos LIST</span>
            <IconButton
            sx={{ padding: 0, color: 'white'}}
            disabled={loading}
            onClick={handleClick}
          >

            <MdRefresh />
          </IconButton>          </HorizontalStack>
      <Stack spacing={2}>
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
  component={Link}
  to={`/users/${user.username}`} // Cambia "/users/(nome)" con il percorso corretto
  sx={{
    backgroundColor: '#00001E',
    color: 'white',
    borderRadius: '0.4rem',
    padding: '10px',
    transition: 'background-color 0.3s, color 0.3s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#002651';
    e.currentTarget.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#00001E';
    e.currentTarget.style.color = 'white';
  }}
  activeStyle={{
    backgroundColor: 'yellow',
    color: 'black'
  }}
>
  <Typography style={{ fontSize: '20px' }}>{user.username}</Typography>
  <Typography style={{ fontSize: '20px' }}>{user.points} post</Typography>
</Stack>
        ))
      )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
