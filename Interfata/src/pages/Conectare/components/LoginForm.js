import React from 'react';
import TextField from "@mui/material/TextField";
import { database, ref, get } from "../../../components/Firebase/firebase";
import {useState} from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack'
import Container from 'react-bootstrap/Container';
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAuth} from "../../../components/Context/AuthContext";
import { hash, compare } from 'bcryptjs';

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const routeChange = () =>{
        navigate("/inregistrare");
    }
    const handleConectare = async () => {
        const usersRef = ref(database, 'posts');
        let userData = {};

        try {
            const snapshot = await get(usersRef);
            const promises = []; // Lista de promisiuni pentru comparatia de parole

            snapshot.forEach((userSnapshot) => {
                const userDataFromDatabase = userSnapshot.val();
                if (userDataFromDatabase.email === email) {
                    // Verificam daca parola furnizata se potriveste cu parola hashuita din baza de date
                    const promise = compare(password, userDataFromDatabase.parola)
                        .then((isMatch) => {
                            if (isMatch) {
                                userData = { ...userDataFromDatabase };
                                console.log("Is match");
                            }
                            return isMatch;
                        })
                        .catch((error) => {
                            console.error('Eroare la compararea parolelor:', error);
                            return false;
                        });
                    promises.push(promise);
                }
            });

            // Asteptam ca toate promisiunile sa se rezolve
            const results = await Promise.all(promises);

            // Verificam dacă exista cel putin un rezultat true in lista de rezultate
            const autentificareReusita = results.some(result => result === true);

            if(autentificareReusita){
                console.log('Autentificare reușită!');
                setErrorMessage('');
                login(userData);
                navigate("/");
            } else {
                console.log('Parolă sau nume de utilizator incorect(e)!');
                setErrorMessage('Email-ul sau parola este greșită.');
            }
        } catch (error) {
            console.error('Eroare la conectare:', error);
        }
    };

    return (
        <Container className="form-container" style={{marginTop: '5rem'}}>
            <Stack spacing={4} className="form" >
                <TextField label='Email'
                           type="text"
                           id="email"
                           value={email}
                           style={{marginTop: '2rem'}}
                           onChange={(e) => setEmail(e.target.value)}
                />
                <TextField label='Parola'
                           type="password"
                           id="parola"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                )}
                <Container className="button-container">
                    <Button variant='contained' size='large' onClick={handleConectare} type="button" className="btn">Conectare</Button>
                </Container>
                <Container className="button-container">
                    <Typography>Încă nu ai un cont?</Typography>
                    <Button color="primary" className="btn"
                            onClick={routeChange}
                    >
                        Înregistrează-te
                    </Button>
                </Container>
            </Stack>
        </Container>
    );
};

export default LoginForm;