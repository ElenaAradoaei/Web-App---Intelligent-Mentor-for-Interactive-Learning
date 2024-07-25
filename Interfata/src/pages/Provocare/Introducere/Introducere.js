import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {useAuth} from "../../../components/Context/AuthContext";
import LinearProgress from '@mui/material/LinearProgress';
import loading from "./Loading.gif";
import {HiOutlineLightBulb} from "react-icons/hi";

const Introducere = () => {
    const navigate = useNavigate();
    const [continua, setContinua] = useState(false);
    const { currentUser } = useAuth();
    const handleIntroducere = async () => {
        setContinua(true);
        if (currentUser) {
            // Logica pentru a trimite datele la backend
            try {
                const userData = {
                    timpInvatare: currentUser.timpInvatare,
                    nivel: currentUser.nivel,
                    obiectiv: currentUser.obiectiv,
                };
                // Cererea prealabila pentru a obtine permisiunile CORS
                await fetch('http://127.0.0.1:8000/generate_questionnaire', {
                    method: 'OPTIONS',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // Cererea principala
                const response = await fetch('http://127.0.0.1:8000/generate_questionnaire', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    // Redirectionare catre pagina urmatoare si trimite obiectul responseData ca parametru
                    console.log(responseData);
                    navigate("/intrebare", { state: { responseData } });
                } else {
                    console.error('Eroare la generarea chestionarului:', response.statusText);
                }
            } catch (error) {
                console.error('Eroare la generarea chestionarului:', error);
            }
        }
        else
        {
            alert("Pentru a începe provocarea, trebuie să vă conectați!");
            navigate('/conectare');
        }
    }
    return (
        <Container style={{ alignSelf: "center", marginTop: '8rem', marginBottom: '6rem'}}>
            <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '1rem', backgroundColor: '#f9f9f9', maxWidth: '600px', margin: 'auto'}}>
                <Box style={{textAlign: 'center'}}>
                    <Typography style={{ fontSize: '20px', fontWeight: 'bold'}}>
                        Informații utile
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2} style={{ marginTop: '1rem'}} >
                    <FiberManualRecordIcon fontSize="inherit" style={{ fontSize: '15px', marginTop: '0.2rem', color: '#4CAF50' }} />
                    <Typography variant="body1" paragraph className="element">
                        Va fi generată o provocare care va conține un număr de întrebări proporțional cu timpul alocat la crearea contului.
                        Puteți modifica timpul, dar și dificultatea întrebărilor aceesând pagina principală, sectiunea <Button style={{backgroundColor: '#1fa8a8'}} variant='contained' size='small' type="button">Profil utilizator</Button>

                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} style={{ marginTop: '1rem'}} >
                    <FiberManualRecordIcon fontSize="inherit" style={{ fontSize: '15px', marginTop: '0.2rem', color: '#4CAF50' }} />
                    <Typography variant="body1" paragraph className="element">
                        Pentru a naviga către următoarea întrebare, trebuie sa validați raspunsul curent, prin butonul <Button variant='contained' size='small' type="button"  className="button">Verificare</Button>
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} style={{ marginTop: '1rem'}} >
                    <FiberManualRecordIcon fontSize="inherit" style={{ fontSize: '15px', marginTop: '0.2rem', color: '#4CAF50' }} />
                    <Typography variant="body1" paragraph className="element">
                        La fiecare întrebare se poate vizualiza răspunsul corect și explicația aferentă, apăsând click pe<Button style={{ backgroundColor: '#white', color: '#f6d505'}} size='small' type="button"><HiOutlineLightBulb style={{fontSize: '27px'}} /></Button>
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} style={{ marginTop: '1rem'}} >
                    <FiberManualRecordIcon fontSize="inherit" style={{ fontSize: '15px', marginTop: '0.2rem', color: '#4CAF50' }} />
                    <Typography variant="body1" paragraph className="element">
                        La finalul provocării va fi contorizat numărul de răspunsuri corecte. Dacă doriți să vizualizați întraga provocare, precum și
                        alte provocări finalizate, apăsați pe <Button style={{backgroundColor: '#1fa8a8', color:'white'}} variant='contained' size='small' type="button">Vizualizare progres</Button> în profilul utilizatorului sau la finalul provocării.
                    </Typography>
                </Stack>
                {continua !== true && (
                    <Box textAlign='center'>
                        <Button style={{ marginTop: '3rem'}} variant='contained' size='large' onClick={handleIntroducere} type="button" className="introducere-button">Continuă</Button>
                    </Box>
                )}
                {continua === true && (
                    <Box style={{ marginTop: '1.5rem', textAlign: 'center'}} sx={{ width: '100%' }}>
                        <img style={{maxWidth: '150px', maxHeight: '150px'}} src={loading} alt="Loading" />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Introducere;