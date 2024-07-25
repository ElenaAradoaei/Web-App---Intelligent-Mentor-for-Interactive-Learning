import * as React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/Context/AuthContext';
import Container from "react-bootstrap/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Profil = () => {
    const navigate = useNavigate();
    const { currentUser, logout, login } = useAuth();
    const [showProfile, setShowProfile] = React.useState(false);

    // Recuperare date din localStorage
    const getUserDataFromLocal = () => {
        const userDataString = localStorage.getItem('user_data');
        return userDataString ? JSON.parse(userDataString) : null;
    };
    React.useEffect(() => {
        const userDataFromLocal = getUserDataFromLocal();
        if (userDataFromLocal) {
            login(userDataFromLocal);
        }
    }, []);

    const handleProfil = () => {
        setShowProfile(!showProfile);
    };
    const handleLogout = () => {
        localStorage.removeItem('user_data');
        logout();
    };

    const handleConectare = () => {
        navigate('/conectare');
    };
    const handleEditare = () => {
        navigate('/editare');
    };
    const handleProgres = async () => {
        navigate("/progres");
    }

    return (
        <Box className="show-profile" >
            <Button variant='contained' size='large' onClick={handleProfil} type="button" style={{marginTop: '10rem', backgroundColor: '#1fa8a8'}}>
                Profil utilizator
            </Button>
            {showProfile && (
                <Stack>
                    {currentUser && (
                        <Container className="profil" style={{ marginTop: '2rem' }}>
                            <Box
                                style={{
                                    marginBottom: '2rem',
                                    backgroundColor: 'rgba(213, 255, 209, 0.8)',
                                    padding: '30px',
                                    borderRadius: '15px',
                                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                                    maxWidth: '500px',
                                    margin: 'auto',
                                    textAlign: 'center',
                                }}>
                                <Typography className="detalii-profil" style={{ fontSize: '20px', marginBottom: '1rem', color: '#F85555FF' }}>
                                    <span style={{ color: '#1fa8a8', fontWeight: 'bold' }}> Bine ai venit, </span>{currentUser.nume}
                                </Typography>
                                <Typography className="detalii-profil" style={{ fontSize: '17px', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#1fa8a8', fontWeight: 'bold' }}>Email:</span> {currentUser.email}
                                </Typography>
                                <Typography className="detalii-profil" style={{ fontSize: '17px', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#1fa8a8', fontWeight: 'bold' }}>Nume utilizator:</span> {currentUser.numeUtilizator}
                                </Typography>
                                <Typography className="detalii-profil" style={{ fontSize: '17px', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#1fa8a8', fontWeight: 'bold' }}>Timp alocat pentru învățare:</span> {currentUser.timpInvatare} minute
                                </Typography>
                                <Typography className="detalii-profil" style={{ fontSize: '17px', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#1fa8a8', fontWeight: 'bold' }}>Nivel actual:</span> {currentUser.nivel}
                                </Typography>
                                <Typography className="detalii-profil" style={{ fontSize: '17px', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#1fa8a8', fontWeight: 'bold' }}>Obiectiv:</span> {currentUser.obiectiv}
                                </Typography>

                                <Box style={{ display: 'inline-block', marginTop: '1rem' }}>
                                    <Button size='small' style={{marginRight: '3rem', backgroundColor: '#f85555', color:'white'}} onClick={handleLogout} type="button">Deconectare</Button>
                                    <Button size='small' style={{backgroundColor: 'green', color:'white'}} onClick={handleEditare} type="button">Editare profil</Button>
                                </Box>
                                <Box style={{ textAlign: 'center'}}>
                                    <Button style={{ marginTop: '1.4rem', backgroundColor: '#1fa8a8', color:'white'}} variant='contained' size='small' onClick={handleProgres} type="button">Vizualizare progres</Button>
                                </Box>
                            </Box>
                        </Container>
                    )}
                    {!currentUser && (
                        <Box style={{ display: 'inline-block', marginTop: '1rem'}}>
                            <Typography>Vă rugăm să vă conectați pentru a accesa profilul.</Typography>
                            <Button style={{ marginTop: '1rem' }} variant='outlined' size='small' onClick={handleConectare} type="button">Conectare</Button>
                        </Box>
                    )}
                </Stack>
            )}
        </Box>
    );
};
export default Profil;