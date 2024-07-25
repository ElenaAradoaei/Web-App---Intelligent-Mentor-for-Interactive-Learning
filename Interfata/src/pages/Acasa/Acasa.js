import React, {useState} from 'react';
import Profil from "./components/Profil";
import Box from "@mui/material/Box";
import './components/style.css'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import backgroundImage from "./components/Home4.png"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
const Acasa = () => {
    const navigate = useNavigate();
    const [showGhid, setShowGhid] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const handleProvocare = async () => {
        navigate("/introducere");
    }

    const handleIntrebare = async () => {
        navigate("/recenzie");
    }
    const handleGhid = () => {
        setCurrentStep(0); // Reset to the first step when opening the guide
        setOpen(true);
    };
    const handleOpenDialog = (step) => {
        setCurrentStep(step);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const ghidSteps = [
        {
            title: "Provocări personalizate",
            description: "Începe o provocare adaptată nivelului tău de cunoștințe în biologie. Numărul și dificultatea întrebărilor vor fi ajustate în funcție de profilul tău."
        },
        {
            title: "Răspunsuri la întrebări",
            description: "În funcție de timpul de învățare alocat, va fi generată o provocare cu un număr de întrebări proporțional cu timpul. Se va afișa câte o singură întrebare care va avea o singură variantă corectă de răspuns. Pentru fiecare întrebare există opțiunea de a verifica răspunsul și de a primi explicații suplimentare."
        },
        {
            title: "Interacțiune continuă",
            description: "Adresați întrebări suplimentare sau solicitați clarificări pentru subiectele dificile."
        }
    ];
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '90vh' }}>
    <Container style={{ marginTop: '5rem', marginBottom: '4rem' }} className="acasa">
        <Profil/>
        <Box textAlign='center'>
            <Button style={{ marginTop: '3rem', fontSize: '20px', backgroundColor: '#137355', padding: '28px'}} variant='contained' size='large' onClick={handleProvocare} type="button" className="provocare-button">Începe provocarea!</Button>
        </Box>
        <Box textAlign='center'>
            <Button style={{marginTop: '3rem', backgroundColor: '#1fa8a8'}} variant='contained' size='large' onClick={handleIntrebare} type="button">Adresează o întrebare</Button>
        </Box>
        <Box textAlign='center'>
            <Button variant='contained' size='medium' onClick={handleGhid} type="button" style={{marginTop: '7rem', marginBottom: '2rem', background: '#bdffff', color: 'black'}}>Ghid de utilizare</Button>
        </Box>
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{ghidSteps[currentStep].title}</DialogTitle>
            <DialogContent>
                <Typography>{ghidSteps[currentStep].description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button style={{fontSize: '22px'}} onClick={handlePrevious} disabled={currentStep === 0}><MdArrowBackIos /></Button>
                <Button style={{fontSize: '22px'}} onClick={handleNext} disabled={currentStep === ghidSteps.length - 1}><MdArrowForwardIos/></Button>
                <Button onClick={handleCloseDialog}>Închide</Button>
            </DialogActions>
        </Dialog>
    </Container>
        </div>
    )
};

export default Acasa;