import './components/style.css'
import React from 'react';
import Box from "@mui/material/Box";
import LoginForm from "./components/LoginForm";
import backgroundImage from "./components/Conectare.png"
const Conectare = () => {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '95vh', display: 'flex', flexDirection: 'column' }}>
            <Box style={{ marginTop: '3rem' }}>
                <LoginForm/>
            </Box>
        </div>
    );
};

export default Conectare;