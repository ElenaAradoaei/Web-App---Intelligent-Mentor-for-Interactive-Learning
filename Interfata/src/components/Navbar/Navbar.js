import React from 'react';
import logo from './logo.png'
import './style.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Box from "@mui/material/Box";
import { useNavigate} from "react-router-dom";
import { IoArrowBackCircleOutline   } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { LuLogIn } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from '../Context/AuthContext';

function Nav() {
    let navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    return (
        <Container>
            <Navbar expand="lg" className="navbar" position="static">
                <Container className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </Container>
                <Container className="navbar-links-left">
                    <IoArrowBackCircleOutline onClick={() => navigate(-1)} style={{ fontSize: '30px', marginRight: '5px', marginLeft: '20px' }}/>
                    <Navbar.Brand onClick={() => navigate(-1)}> Înapoi</Navbar.Brand>
                    <FaHome style={{ fontSize: '25px', marginLeft: '30px', marginRight: '5px' }}/>
                    <Navbar.Brand href="/">Acasă</Navbar.Brand>
                    <BiSolidContact style={{ fontSize: '25px', marginLeft: '30px', marginRight: '5px' }}/>
                    <Navbar.Brand href="/contact">Contact</Navbar.Brand>

                </Container>
                <Container className="navbar-links-right">
                    {currentUser ? (
                        <>
                            <BiLogOut style={{ fontSize: '25px', marginRight: '5px' }} onClick={logout} />
                            <Navbar.Brand style={{ marginRight: '50px' }} onClick={logout}>Deconectare</Navbar.Brand>
                        </>
                    ) : (
                        <>
                            <LuLogIn style={{ fontSize: '25px', marginRight: '5px' }} />
                            <Navbar.Brand style={{ marginRight: '50px' }} href="/conectare">Conectare</Navbar.Brand>
                        </>
                    )}
                </Container>
            </Navbar>
            <Box mt={4} />
        </Container>
    );
}

export default Nav;