import React, {useState} from 'react';
import './style.css'
import {database} from '../../../components/Firebase/firebase'
import {ref, get, push, child, update, getDatabase} from "../../../components/Firebase/firebase";
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Container from 'react-bootstrap/Container';
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import {useAuth} from "../../../components/Context/AuthContext";
import { hash } from 'bcryptjs';
import {useNavigate} from "react-router-dom";

function RegistrationForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [nume, setNume] = useState('');
    const [numeUtilizator, setNumeUtilizator] = useState('');
    const [email, setEmail] = useState('');
    const [parola,setParola] = useState('');
    const [confirmareParola,setConfirmareParola] = useState('');
    const [obiectiv, setObiectiv] = React.useState('');
    const [nivel, setNivel] = React.useState('');
    const [timpInvatare, setTimpInvatare] = useState('');
    const [parolaMismatch, setParolaMismatch] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [numeUtilizatorValid, setNumeUtilizatorValid] = useState(true);
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        setRegistrationSuccess(false);
        // Restabilire mesaje pentru fiecare verificare
        setEmailValid(true);
        setParolaMismatch(false);
        setFormIncomplete(false);
        setNumeUtilizatorValid(true);
        if(id === "nume"){
            setNume(value);
        }
        if(id === "numeUtilizator"){
            setNumeUtilizator(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "parola"){
            setParola(value);
        }
        if(id === "confirmareParola"){
            setConfirmareParola(value);
        }
        if (id === 'timpInvatare') {
            setTimpInvatare(value);
        }
    }
    const handleObiectivChange = (event) => {
        setObiectiv(event.target.value);
    };
    const handleNivelChange = (event) => {
        setNivel(event.target.value);
    };
    const handleSubmit = async () => {
        if (!nume || !numeUtilizator || !email || !parola || !confirmareParola || !timpInvatare || !nivel || !obiectiv) {
            setFormIncomplete(true);
            return;
        }
        if (parola !== confirmareParola) {
            setParolaMismatch(true);
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailValid(false);
            return;
        }
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            setEmailValid(false);
            return;
        }
        const usernameExists = await checkIfUsernameExists(numeUtilizator);
        if (usernameExists) {
            setNumeUtilizatorValid(false);
            return;
        }
        try {
            const newPostKey = push(child(ref(database), 'posts')).key;

            const hashedPassword = await hash(parola, 10);

            // Obiectul de actualizare pentru Firebase
            const updates = {
                [`posts/${newPostKey}`]: {
                    nume: nume,
                    numeUtilizator: numeUtilizator,
                    email: email,
                    parola: hashedPassword,
                    obiectiv: obiectiv,
                    nivel: nivel,
                    timpInvatare: timpInvatare,
                },
            };

            // Actualizarea bazei de date firebase
            await update(ref(database), updates);

            let userData = { nume, email, numeUtilizator, timpInvatare, obiectiv, nivel };
            login(userData);

            // Resetarea campurilor si a mesajelor de succes sau eroare
            setRegistrationSuccess(true);
            setNume('');
            setNumeUtilizator('');
            setEmail('');
            setParola('');
            setConfirmareParola('');
            setObiectiv('');
            setNivel('');
            setTimpInvatare('');
            setParolaMismatch(false);
            setEmailValid(true);
            setFormIncomplete(false);

            await delay(2500);
            navigate('/');

        } catch (error) {
            console.error('Eroare în timpul înregistrării:', error);
        }
    }
    const checkIfEmailExists = async (email) => {
        const databaseRef = ref(getDatabase());
        const snapshot = await get(child(databaseRef, 'posts'));

        if (snapshot.exists()) {
            const posts = snapshot.val();
            const emails = Object.values(posts).map((post) => post.email);

            return emails.includes(email);
        }
        return false;
    };
    const checkIfUsernameExists = async (username) => {
        const databaseRef = ref(getDatabase());
        const snapshot = await get(child(databaseRef, 'posts'));

        if (snapshot.exists()) {
            const posts = snapshot.val();
            const usernames = Object.values(posts).map((post) => post.numeUtilizator);

            return usernames.includes(username);
        }
        return false;
    };

    return(
        <Container className="form-container">
            <Stack spacing={4} className="form">
                <Stack className="form-body" direction="column">
                    <TextField label='Nume'
                               type="text"
                               id="nume"
                               value={nume}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    <TextField label='Nume de utilizator'
                               type="text"
                               id="numeUtilizator"
                               value={numeUtilizator}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    {!numeUtilizatorValid && (
                        <Typography style={{ color: 'red', textAlign: 'center' }}>
                            Numele de utilizator nu este valid sau există deja.
                        </Typography>
                    )}
                    <TextField label='Email'
                               type="email"
                               id="email"
                               value={email}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    {!emailValid && (
                        <Typography style={{ color: 'red', textAlign: 'center' }}>
                            Adresa de email nu este validă sau există deja.
                        </Typography>
                    )}

                    <TextField label='Parola'
                               type="password"
                               id="parola"
                               value={parola}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    <TextField label='Confirmare parola'
                               type="password"
                               id="confirmareParola"
                               value={confirmareParola}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    {parolaMismatch && (
                        <Typography style={{ color: 'red', textAlign: 'center' }}>
                            Parola și confirmarea parolei trebuie să fie identice.
                        </Typography>
                    )}
                    <TextField label='Obiectiv'
                               id="obiectiv"
                               select value={obiectiv}
                               onChange={(e) => handleObiectivChange(e)}
                               fullWidth
                               color='primary'
                    >
                        <MenuItem value="Bacalaureat biologie vegetala si animala">Bacalaureat biologie vegetală și animală</MenuItem>
                        <MenuItem value="Bacalaureat anatomie si genetica">Bacalaureat anatomie și genetică</MenuItem>
                        <MenuItem value="Admitere la medicina">Admitere la medicină</MenuItem>
                        <MenuItem value="Dezvoltare personala">Dezvoltare personală</MenuItem>
                    </TextField>

                    <TextField label='Nivel'
                               id="nivel"
                               select value={nivel}
                               onChange={(e) => handleNivelChange(e)}
                               color='primary'
                    >
                        <MenuItem value="Incepator">Începător</MenuItem>
                        <MenuItem value="Intermediar">Intermediar</MenuItem>
                        <MenuItem value="Avansat">Avansat</MenuItem>
                    </TextField>
                    <TextField
                        label='Timp alocat'
                        type="number"
                        value={timpInvatare}
                        onChange={(e) => handleInputChange(e)}
                        id="timpInvatare"
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>minute</InputAdornment>,
                            inputProps: { min: 10 }
                        }}
                    />
                </Stack>
                {formIncomplete && (
                    <Typography style={{ color: 'red', textAlign: 'center' }}>
                        Vă rugăm să completați toate câmpurile.
                    </Typography>
                )}
                {registrationSuccess && (
                    <Typography style={{ color: 'green', textAlign: 'center' }}>
                        Înregistrare reușită!
                    </Typography>
                )}
                <Container>
                    <Container className="button-container">
                        <Button variant='contained' size='large' onClick={()=>handleSubmit()} type="submit">Înregistrare</Button>
                    </Container>                    <Box mt={2} />
                </Container>
            </Stack>
        </Container>
    )
}
export default RegistrationForm