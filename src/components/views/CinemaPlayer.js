import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Button, TextField, Container, CssBaseline } from '@mui/material';
import Navbar from '../Navbar';

const CinemaPlayer = () => {
    const [url, setUrl] = useState('');

    return (
        <Container component="main">
            <Navbar />
            <CssBaseline />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={{
                        width: "500px", color: 'white'
                    }}
                    label="Inserisci l'URL del video"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                    style={{ margin: '20px 0' }}
                >
                    Riproduci
                </Button>
                {url && (
                    <ReactPlayer 
                        url={url} 
                        width='100%' 
                        height='450px'
                        controls
                    />
                )}
            </div>
        </Container>
    );
}

export default CinemaPlayer;
