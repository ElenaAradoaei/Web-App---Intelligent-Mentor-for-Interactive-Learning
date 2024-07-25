import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useProgres } from './ProgresContext';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {useAuth} from "../../../components/Context/AuthContext"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Progres = () => {
    const { progres } = useProgres();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [toateProgresele, setToateProgresele] = useState(() => {
        if (currentUser) {
            const progreseLocaleStocate = JSON.parse(localStorage.getItem(`toateProgresele_${currentUser.email}`));
            return Array.isArray(progreseLocaleStocate) ? progreseLocaleStocate : [];
        }
        return [];
    });
    const [indexProgres, setIndexProgres] = useState(0);
    const [colors, setColors] = useState([]);
    const progreseValide = toateProgresele.filter(progres => Object.keys(progres).length > 0);

    useEffect(() => {
        const generatedColors = toateProgresele.map(() => generateRandomColor());
        setColors(generatedColors);
    }, [toateProgresele]);

    useEffect(() => {
        if (currentUser) {
            const progreseLocaleStocate = JSON.parse(localStorage.getItem(`toateProgresele_${currentUser.email}`));
            if (progreseLocaleStocate) {
                setToateProgresele(progreseLocaleStocate);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && progres && !toateProgresele.find(p => JSON.stringify(p) === JSON.stringify(progres))) {
            const noiProgrese = [...toateProgresele, progres];
            setToateProgresele(noiProgrese);
            localStorage.setItem(`toateProgresele_${currentUser.email}`, JSON.stringify(noiProgrese));
        }
    }, [progres, toateProgresele, currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`toateProgresele_${currentUser.email}`, JSON.stringify(toateProgresele));
        }
    }, [toateProgresele, currentUser]);

    const handleDeleteProgress = () => {
        console.log(indexProgres);
        const newProgressList = [...toateProgresele.slice(0, indexProgres), ...toateProgresele.slice(indexProgres + 1)];
        setToateProgresele(newProgressList);
        if (currentUser) {
            localStorage.setItem(`toateProgresele_${currentUser.email}`, JSON.stringify(newProgressList));
        }
        setIndexProgres(prevIndex => Math.min(prevIndex, newProgressList.length - 1));
    };

    const calculeazaTotalIntrebariCorecte = (rezultate) => {
        let totalCorecte = 0;
        for (const [_, rezultat] of Object.entries(rezultate)) {
            if (rezultat.raspunsCorect) {
                totalCorecte++;
            }
        }
        return totalCorecte;
    };

    const generateRandomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `rgba(${parseInt(randomColor.substring(0,2), 16)}, ${parseInt(randomColor.substring(2,4), 16)}, ${parseInt(randomColor.substring(4,6), 16)}, 0.15)`;
    };

    useEffect(() => {
        const generatedColors = Array.from({ length: toateProgresele.length }, () => generateRandomColor());
        setColors(generatedColors);
    }, [toateProgresele]);

    const handleProvocare = () => {
        navigate("/introducere");
    };

    const handleIntrebare = () => {
        navigate("/recenzie");
    };

    const handleNext = () => {
        setIndexProgres(prevIndex => Math.min(prevIndex + 1, progreseValide.length - 1));
    };

    const handlePrevious = () => {
        setIndexProgres(prevIndex => Math.max(prevIndex - 1, 0));
    };

    return (
        <Container style={{ marginTop: '7rem', marginLeft: '4rem', paddingBottom: '100px' }}>
            {progreseValide.length > 0 && (
                <Container>
                    {Object.keys(progreseValide[indexProgres]).length > 0 && (
                        <Box style={{ marginBottom: '2rem' }}>
                            {Object.entries(progreseValide[indexProgres]).map(([data, rezultate], i) => (
                                <Box
                                    key={data}
                                    style={{
                                        marginBottom: '2rem',
                                        backgroundColor: colors[i] || '#f0f0f0',
                                        padding: '20px',
                                        marginLeft: '100px',
                                        marginRight: '100px',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <Typography style={{ fontSize: '20px' }}>Rezultat provocare, data: {data}</Typography>
                                    <Box component="ul">
                                        {Object.entries(rezultate).map(([intrebare, rezultat]) => (
                                            <Typography component="li" key={intrebare} variant="body1">
                                                Intrebarea {parseInt(intrebare) + 1}: Ati raspuns <span style={{ marginTop: '1.5rem', textAlign: 'center', color: rezultat.raspunsCorect ? 'green' : 'red' }}> {rezultat.raspunsCorect ? 'corect' : 'gresit'} </span>
                                                <Typography style={{ color: '#0b7e7e', fontWeight: 'bold' }}> {rezultat.intrebari}
                                                    <span style={{ color: 'green', fontStyle: 'italic' }}> {rezultat.explicatie} </span></Typography>
                                            </Typography>
                                        ))}
                                    </Box>
                                    <Typography variant="body1" style={{marginLeft: '20px', color: 'green', fontWeight: 'bold'}}>
                                        Numărul total de răspunsuri corecte: {calculeazaTotalIntrebariCorecte(rezultate)}
                                    </Typography>
                                    <Box textAlign='center'>
                                        {progreseValide.length > 1 && (
                                            <>
                                                <Button disabled={indexProgres === 0} onClick={handlePrevious}><ArrowBackIcon /></Button>
                                                <Button style={{ marginLeft: '2rem', marginRight: '2rem', backgroundColor: '#f85555', color: 'white'}} variant='contained' size='medium' onClick={handleDeleteProgress}>Șterge această provocare</Button>
                                                <Button disabled={indexProgres === progreseValide.length - 1} onClick={handleNext}><ArrowForwardIcon/></Button>
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Box textAlign='center'>
                        <Button style={{ marginTop: '3rem' }} variant='contained' size='large' onClick={handleProvocare} type="button" className="button">Provocare nouă</Button>
                        <Button style={{ marginTop: '3rem', marginLeft: '3rem' }} variant='contained' size='large' onClick={handleIntrebare} type="button">Adresează o întrebare</Button>
                    </Box>
                </Container>
            )}
        </Container>
    );
};

export default Progres;