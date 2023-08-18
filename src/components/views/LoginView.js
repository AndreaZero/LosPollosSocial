import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";
import logobanner from "../../assets/img/logo-banner.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: 6 }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
          <Link to="/" color="inherit" underline="none">
            <img style={{width: '400px', objectFit: "contain"}} src={logobanner} alt="logo"></img>
          </Link>
        </Typography>
        <div style={{backgroundColor: '#202029', display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '1rem', color: 'white' }}>

        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Typography color='yellow'>
          Non sei ancora registrato?<FontAwesomeIcon style={{marginLeft: '3px', marginRight: '15px'}} icon={faUser}></FontAwesomeIcon>
          <br />
          
          <Link style={{color: 'white'}} to="/signup"> 
          <FontAwesomeIcon style={{marginRight: '10px'}} icon={faRightToBracket}></FontAwesomeIcon>Registrati</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            autoComplete="email"
            autoFocus
            required
            id="email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            fullWidth
            required
            margin="normal"
            id="password  "
            name="password"
            onChange={handleChange}
            type="password"
          />

          <ErrorAlert error={serverError} />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Login
          </Button>
        </Box>
        </div>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginView;
