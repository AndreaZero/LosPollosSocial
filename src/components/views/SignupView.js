import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import logobanner from "../../assets/img/logo-banner.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faLink, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Deve essere tra 6 e 30 caratteri.";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Deve contenere solo caratteri validi.";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Deve essere almeno 8 caratteri.";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Inserisci un indirizzo mail valido.";
    }

    setErrors(errors);

    return errors;
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
            <a href="/">          <img style={{width: '400px', objectFit: "contain"}} src={logobanner} alt="logo"></img>
</a>
        </Typography>
        <div style={{backgroundColor: '#202029', display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '1rem', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          Registrati
        </Typography>
 
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
                              sx={{
                                backgroundColor: 'white',
                              }}
            label="Username"
            fullWidth
            margin="normal"
            autoFocus
            required
            id="username"
            name="username"
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />
          <TextField
                              sx={{
                                backgroundColor: 'white',
                              }}
            label="Email Address"
            fullWidth
            margin="normal"
            autoComplete="email"
            required
            id="email"
            name="email"
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />
          <TextField
                              sx={{
                                backgroundColor: 'white',
                              }}
            label="Password"
            fullWidth
            required
            margin="normal"
            autoComplete="password"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <ErrorAlert error={serverError} />
          <Button style={{backgroundColor: 'black', color: "yellow"}}  type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Registrati
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

export default SignupView;

