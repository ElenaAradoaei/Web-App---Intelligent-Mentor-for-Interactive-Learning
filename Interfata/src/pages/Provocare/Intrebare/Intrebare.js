import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useLocation } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {useProgres} from "../Progres/ProgresContext"
import { HiOutlineLightBulb } from "react-icons/hi";
const Intrebare = () => {
    const [intrebari, setIntrebari] = useState([]);
    const [indexIntrebare, setIndexIntrebare] = useState(0);
    const [raspunsSelectat, setRaspunsSelectat] = useState(null);
    const [raspunsCorect, setRaspunsCorect] = useState(null);
    const [numarIntrebariCorecte, setNumarIntrebariCorecte] = useState(0);
    const [mesajEroare, setMesajEroare] = useState("");
    const [explicatie, setExplicatie] = useState(null);
    const [verificat, setVerificat] = useState(false);
    const [capitol, setCapitol] = useState(null);
    const [urmatoareaIntrebare, setUrmatoareaIntrebare] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { responseData } = location.state;
    const { setProgres } = useProgres();
    const [afiseazaExplicatie, setAfiseazaExplicatie] = useState(false);

    useEffect(() => {
        if (responseData && responseData.questions && responseData.questions.Intrebari) {
            setIntrebari(responseData.questions.Intrebari);
        }
    }, [responseData]);

    useEffect(() => {
        if (raspunsCorect !== null) {
            const index = intrebari[indexIntrebare]["Explicatie"].indexOf(".");
            const dataCurenta = new Date().toLocaleDateString();
            setProgres(prevProgres => ({
                ...prevProgres,
                [dataCurenta]: {
                    ...prevProgres[dataCurenta],
                    [indexIntrebare]: {
                        intrebari: intrebari[indexIntrebare]["Enunt"],
                        explicatie: intrebari[indexIntrebare]["Explicatie"].substring(0, index),
                        raspunsCorect: raspunsCorect,
                        numarIntrebariCorecte: raspunsCorect ? prevProgres[dataCurenta]?.[indexIntrebare]?.numarIntrebariCorecte + 1 : prevProgres[dataCurenta]?.[indexIntrebare]?.numarIntrebariCorecte
                    }
                }
            }));
        }
    }, [raspunsCorect, intrebari, explicatie, indexIntrebare, setProgres]);
    const handleSelectareRaspuns = (event) => {
        const raspunsSelectat = event.target.value;
        setRaspunsSelectat(raspunsSelectat);
        setMesajEroare("");
    };

    const handleAfisareExplicatie = () => {
        setAfiseazaExplicatie(!afiseazaExplicatie);
    };

    const handleVerifica = () => {
        if (raspunsSelectat === null) {
            setMesajEroare("Vă rugăm să selectați un răspuns.");
            return;
        }
        const variantaCorecta = intrebari[indexIntrebare]["Varianta corecta de raspuns"];
        const raspunsCorect = variantaCorecta === intrebari[indexIntrebare]["Raspunsuri"][parseInt(raspunsSelectat)].charAt(0); // Extrage prima litera din raspunsul selectat
        const explicatie = intrebari[indexIntrebare]["Explicatie"];
        setRaspunsCorect(raspunsCorect);
        setExplicatie(explicatie)
        if (raspunsCorect) {
            setNumarIntrebariCorecte(prevNumarIntrebariCorecte => prevNumarIntrebariCorecte + 1);
        }
        setVerificat(true);
        setUrmatoareaIntrebare(true);
    };

    const handleIntrebareUrmatoare = () => {
        setIndexIntrebare(indexIntrebare + 1);
        setRaspunsSelectat(null);
        setRaspunsCorect(null);
        setExplicatie(null);
        setVerificat(false);
        setCapitol(null);
        setUrmatoareaIntrebare(false);
        setAfiseazaExplicatie(false);
    };
    const handleProgres = () => {
        navigate("/progres");
    }
    const handleProvocare = () => {
        navigate("/introducere");
    }
    return (
        <Container style={{marginTop: '120px', paddingBottom: '100px', overflowY: 'auto'}}>
            {intrebari.length > 0 && indexIntrebare < intrebari.length && (
                <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '1rem', backgroundColor: '#f9f9f9', maxWidth: '600px', margin: 'auto'}}>
                    <Typography style={{fontSize: 17}} variant="body1" paragraph>
                        <span style={{fontSize: '20px', fontWeight: 'bold', color: "#018861"}}>Capitol:</span> {intrebari[indexIntrebare]["Capitol"]}
                    </Typography>
                    <Typography style={{color: "black", fontSize: 21, fontWeight: "bold", marginTop: '1.5rem'}} variant="body1" paragraph>
                        {indexIntrebare + 1}. {intrebari[indexIntrebare]["Enunt"]}
                    </Typography>
                    <RadioGroup value={raspunsSelectat} onChange={handleSelectareRaspuns}>
                        {intrebari[indexIntrebare]["Raspunsuri"].map((raspuns, indexRaspuns) => (
                            <FormControlLabel
                                key={indexRaspuns}
                                value={indexRaspuns.toString()}
                                control={<Radio />}
                                label={<Typography style={{fontSize: 19}}>{raspuns}</Typography>}
                            />
                        ))}
                    </RadioGroup>
                    <Box textAlign='center'>
                        <Button style={{ marginTop: '1.5rem', marginRight: '7rem' }} variant='contained' size='large' onClick={handleVerifica} type="button" disabled={verificat} className="button">Verificare</Button>
                        <Button style={{ marginTop: '1.5rem'}} variant='contained' size='large' onClick={handleIntrebareUrmatoare} type="button" className="button" disabled={!urmatoareaIntrebare}>Următoarea întrebare</Button>
                    </Box>
                    {raspunsCorect !== null && (
                        <Container>
                            <Typography variant="body1" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 17, color: raspunsCorect ? 'green' : 'red' }}>
                                Răspunsul este {raspunsCorect ? 'corect' : 'incorect'}.
                            </Typography>
                            {raspunsCorect === false && afiseazaExplicatie && (
                                <Box>
                                    <Typography variant="body1" style={{ marginTop: '1rem', textAlign: 'center', fontSize: 17, color: '#2e9b0e'}}>
                                        {explicatie}
                                    </Typography>
                                </Box>
                            )}
                            {raspunsCorect === false && !afiseazaExplicatie && (
                                <Box textAlign='center'>
                                    <Button
                                        style={{ marginTop: '1rem', backgroundColor: '#white', color: '#f6d505'}}
                                        size='large'
                                        onClick={handleAfisareExplicatie}
                                        type="button"
                                    >
                                        <HiOutlineLightBulb style={{fontSize: '35px'}} />
                                    </Button>
                                </Box>
                            )}
                        </Container>
                    )}
                    {mesajEroare !== "" && (
                        <Typography variant="body1" style={{ marginTop: '1rem', textAlign: 'center', color: 'red'}}>
                            {mesajEroare}
                        </Typography>
                    )}
                </Paper>
            )}
            {indexIntrebare === intrebari.length && (
                <Box textAlign='center'>
                    <Typography variant="h6" style={{ marginTop: '2rem', textAlign: 'center' }}>Felicitări! Ați ajuns la finalul provocării!</Typography>
                    <Typography variant="body1" style={{ marginTop: '1rem', textAlign: 'center' }}>Ați răspuns corect la {numarIntrebariCorecte} din {intrebari.length} întrebări.</Typography>
                    <Button style={{ marginTop: '1.5rem', marginRight: '5rem'}} variant='contained' size='large' onClick={handleProvocare} type="button" className="button">Provocare nouă</Button>
                    <Button style={{ marginTop: '1.5rem'}} variant='contained' size='large' onClick={handleProgres} type="button" className="button">Vezi progresul</Button>
                </Box>
            )}
        </Container>
    );
};
export default Intrebare;