import { useTheme } from "@emotion/react";
import logobanner from "../assets/img/logo-banner.png";

import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import gas from "../assets/img/gas.png";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { RiContrast2Line } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Stack mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack>
          <Typography
            sx={{ display: mobile ? "none" : "block", color: "white" }}
            variant={navbarWidth ? "h6" : "h4"}
            mr={1}
          >
            <Link to="/" style={{
        color: "yellow"
      }}>
              <img  style={{
                width: '300px',
                objectFit: 'contain',
                borderRadius: '1rem',
              }} src={logobanner} alt="logo-banner"></img>
            </Link>
          </Typography>
        </HorizontalStack>

        {!navbarWidth && (
          <Box component="form" onSubmit={handleSubmit}>
<TextField
  size="small"
  label="Cerca tra i post.."
  sx={{
    flexGrow: 1,
    maxWidth: 300,
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'white',

  }}
  onChange={handleChange}
  value={search}
/>
          </Box>
        )}

        <HorizontalStack>
          {mobile && (
            <div style={{display: 'flex'}}>          <a href="/">
            <img style={{width: '80px', objectFit: 'contain'}} src={gas} alt="gas"></img>
            </a>
            <IconButton style={{color: 'white'}} onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
            </div>
          )}

          <IconButton style={{color: 'white'}} component={Link} to={"/"}>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton style={{color: 'white'}} component={Link} to={"/messenger"}>
                <AiFillMessage />
              </IconButton>
              <IconButton component={Link}  to={"/users/" + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button style={{color: 'black', backgroundColor: 'yellow', padding: '5px'}}  onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ minWidth: 80, color: 'yellow' }} 
              onClick={() => navigate("/signup")}>
                Registrati
              </Button>
              <Button variant="text" sx={{ minWidth: 65, color: 'yellow' }} 
              onClick={() => navigate("/login")}>
                Login
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            sx={{ backgroundColor:"white"}}
            size="small"
            label="Cerca tra i post..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
