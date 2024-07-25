import RegistrationForm from "./components/RegistrationForm";
import './components/style.css'
import React from 'react';
import Box from "@mui/material/Box";
import backgroundImage from "./components/Inregistrare.png"
const Inregistrare = () => {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '95vh', display: 'flex', flexDirection: 'column' }}>
            <Box style={{marginBottom: '3rem', marginTop: '5rem'}}>
                <RegistrationForm/>
            </Box>
        </div>
    );
};

export default Inregistrare;