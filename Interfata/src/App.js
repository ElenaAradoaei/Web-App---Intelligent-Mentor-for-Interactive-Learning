import './App.css';
import Inregistrare from "./pages/Inregistrare/Inregistrare";
import Nav from "./components/Navbar/Navbar";
import Acasa from "./pages/Acasa/Acasa";
import Conectare from "./pages/Conectare/Conectare";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import EditareProfil from "./pages/Acasa/components/EditareProfil";
import Intrebare from "./pages/Provocare/Intrebare/Intrebare";
import Introducere from "./pages/Provocare/Introducere/Introducere";
import Recenzie from "./pages/Provocare/Recenzie/Recenzie";
import Progres from "./pages/Provocare/Progres/Progres";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import Box from "@mui/material/Box";

function App() {
    return (
        <Container>
            <Router>
                <Nav/>
                <Box>
                    <Routes >
                        <Route exact path="/" element={<Acasa />} />
                        <Route path="/conectare" element={<Conectare />} />
                        <Route path="/inregistrare" element={<Inregistrare />} />
                        <Route path="/editare" element={<EditareProfil />} />
                        <Route path="/introducere" element={<Introducere />} />
                        <Route path="/intrebare" element={<Intrebare />} />
                        <Route path="/recenzie" element={<Recenzie />} />
                        <Route path="/progres" element={<Progres />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Box>
                <Footer/>
            </Router>
        </Container>
    );
}

export default App;
