import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import backgroundImage from "./Recenzie.png";

const Recenzie = () => {
    const navigate = useNavigate();
    const [intrebareUser, setIntrebareUser] = useState('');
    const [raspuns, setRaspuns] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleRecenzie = async () => {
        try {
            setIsLoading(true);
            const userData = {
                intrebareUser: intrebareUser
            };
            // Cererea prealabila pentru a obtine permisiunile CORS
            await fetch('http://127.0.0.1:8000/generate_answer', {
                method: 'OPTIONS',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Cererea principala
            const response = await fetch('http://127.0.0.1:8000/generate_answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const responseData = await response.json();
                setRaspuns(responseData);
                console.log("Stare actualizată:", raspuns);
            } else {
                console.error('Eroare la generarea raspunsului:', response.statusText);
            }
        } catch (error) {
            console.error('Eroare la generarea raspunsului:', error);
        }
        setIntrebareUser('');
        setIsLoading(false);
    }
    const handleAcasa = async () => {
        navigate("/");
    }
    const isButtonDisabled = intrebareUser.trim() === "";
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '80vh' }}>
        <Container style={{marginTop: '8rem'}}>
            <Typography style={{ padding: '1.5rem', marginTop: '1.5rem', fontSize: '20px', textAlign: 'center'}}>
                Vă rugăm să adresați o întrebare
            </Typography>
            <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '1rem', backgroundColor: '#f9f9f9', maxWidth: '600px', margin: 'auto'}}>
                {raspuns !== null && (
                    <>
                        <Typography style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
                            {raspuns.questions.Intrebare}
                        </Typography>
                        <Typography style={{ color: 'black', marginTop: '1.5rem'}}>
                            {raspuns.questions.Raspuns}
                        </Typography>
                    </>
                )}
                <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginTop: "10px" }}>
                    <TextField
                        label="Introduceți întrebarea" variant="outlined" value={intrebareUser} onChange={(e) => setIntrebareUser(e.target.value)} fullWidth style={{ margin: '10px 0' }}
                    />
                    {isLoading ? (
                        <CircularProgress color="inherit" style={{marginLeft: '1.5rem'}}/>
                        ) : (
                        <Button variant="contained" size="large" onClick={handleRecenzie} type="button" disabled={isButtonDisabled} style={{marginLeft: '2rem', backgroundColor: '#d7d7d7',  maxHeight: '40px'}}>
                            <SendIcon style={{color: 'black'}}/>
                        </Button>
                    )}
                </Box>
            </Paper>
            <Box textAlign='center'>
                <Button style={{marginTop: '1.5rem', backgroundColor: '#1fa8a8'}} variant='contained' size='large' onClick={handleAcasa} type="button" className="button">Meniu principal</Button>
            </Box>
        </Container>
        </div>
    );
};

export default Recenzie;