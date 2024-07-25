import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import {child, database, get, getDatabase, ref, update} from "../../../components/Firebase/firebase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAuth} from "../../../components/Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import backgroundImage from "./EditProfile.png"
const EditareProfil = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [numeUtilizatorValid, setNumeUtilizatorValid] = useState(true);
    const [obiectiv, setObiectiv] = React.useState('');
    const [nivel, setNivel] = React.useState('');
    const [timpInvatare, setTimpInvatare] = useState('');
    const [nume, setNume] = useState('');
    const [numeUtilizator, setNumeUtilizator] = useState('');
    const [newData, setNewData] = useState({
        nume: currentUser?.nume || '',
        numeUtilizator: currentUser?.numeUtilizator || '',
        email: currentUser?.email || '',
        timpInvatare:  currentUser?.timpInvatare || '',
        obiectiv: currentUser?.obiectiv || 'Bacalaureat',
        nivel: currentUser?.nivel || '',
    });
    useEffect(() => {
        // Actualizare datele de editare cand se schimba utilizatorul
        setNewData({
            nume: currentUser?.nume || '',
            numeUtilizator: currentUser?.numeUtilizator || '',
            email: currentUser?.email || '',
            timpInvatare:  currentUser?.timpInvatare || '',
            obiectiv: currentUser?.obiectiv || '',
            nivel: currentUser?.nivel || '',
        });
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewData((prevData) => ({ ...prevData, [id]: value }));
        if (id === 'nume') {
            setNume(value);
        } else if (id === 'numeUtilizator') {
            setNumeUtilizator(value);
        } else if (id === 'obiectiv') {
            setObiectiv(value);
        } else if (id === 'nivel') {
            setNivel(value);
        } else if (id === 'timpInvatare') {
            setTimpInvatare(value);
        }
    };

    useEffect(() => {
        // Actualizare datele de editare când se schimba utilizatorul
        setNewData({
            nume: currentUser?.nume || '',
            numeUtilizator: currentUser?.numeUtilizator || '',
            email: currentUser?.email || '',
            timpInvatare: currentUser?.timpInvatare || '',
            obiectiv: currentUser?.obiectiv || '',
            nivel: currentUser?.nivel || '',
        });
    }, [currentUser]);

    const handleNivelChange = (event) => {
        setNewData((prevData) => ({ ...prevData, nivel: event.target.value }));
    };

    const handleObiectivChange = (event) => {
        setNewData((prevData) => ({ ...prevData, obiectiv: event.target.value }));
    };
    const handleEditare = async () => {
        const usernameExists = await checkIfUsernameExists(numeUtilizator);
        if (usernameExists) {
            setNumeUtilizatorValid(false);
            return;
        }

        try {
            const databaseRef = ref(getDatabase());
            const snapshot = await get(child(databaseRef, 'posts'));

            if (snapshot.exists()) {
                const posts = snapshot.val();
                const userKey = Object.keys(posts).find(key => posts[key].email === currentUser.email);

                if (userKey) {
                    const userRef = ref(database, `posts/${userKey}`);
                    const updates = {
                        nume: newData.nume,
                        numeUtilizator: newData.numeUtilizator,
                        email: newData.email,
                        nivel: newData.nivel,
                        obiectiv: newData.obiectiv,
                    };
                    await update(userRef, updates);
                    localStorage.setItem('user_data', JSON.stringify(newData));
                    navigate('/');
                } else {
                    console.log("Utilizatorul nu a fost găsit în baza de date.");
                }
            }
        } catch (error) {
            console.error('Eroare în timpul actualizării:', error);
        }
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

    return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '95vh', display: 'flex', flexDirection: 'column' }}>
        <Container style={{ marginTop: 'auto', marginBottom: 'auto'}}>
            <Stack spacing={10} className="form">
                <Stack style={{marginTop: '3rem'}} className="form-body" direction="column">
                    <TextField label='Nume'
                               type="text"
                               id="nume"
                               value={nume}
                               style={{marginBottom: '2rem'}}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    <TextField label='Nume de utilizator'
                               type="text"
                               id="numeUtilizator"
                               value={numeUtilizator}
                               style={{marginBottom: '2rem'}}
                               onChange = {(e) => handleInputChange(e)}
                    />
                    {!numeUtilizatorValid && (
                        <Typography style={{ color: 'red', textAlign: 'center' }}>
                            Numele de utilizator nu este valid sau există deja.
                        </Typography>
                    )}
                    <TextField label='Obiectiv'
                               id="obiectiv"
                               select value={newData.obiectiv}
                               onChange={(e) => handleObiectivChange(e)}
                               fullWidth
                               color='primary'
                               style={{marginBottom: '2rem'}}
                    >
                        <MenuItem value="Bacalaureat">Bacalaureat</MenuItem>
                        <MenuItem value="Examen de admitere">Examen de admitere</MenuItem>
                        <MenuItem value="Dezvoltare personală">Dezvoltare personală</MenuItem>
                        <MenuItem value="Pregatire test">Pregătire test</MenuItem>
                    </TextField>

                    <TextField label='Nivel'
                               id="nivel"
                               select value={newData.nivel}
                               onChange={(e) => handleNivelChange(e)}
                               color='primary'
                               style={{marginBottom: '2rem'}}
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
                <Container style={{textAlign: 'center', marginTop:'2rem'}}>
                    <Button variant='contained' size='large' onClick={()=>handleEditare()} type="submit">Editare</Button>
                </Container>
            </Stack>
        </Container>
    </div>
    );
};

export default EditareProfil;