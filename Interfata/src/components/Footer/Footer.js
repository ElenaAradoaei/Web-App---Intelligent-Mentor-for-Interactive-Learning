import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
import Typography from "@mui/material/Typography";
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={6}>
                        <Typography style={{ fontSize: '17px', paddingTop: '10px'}}>© 2024 Mentor inteligent. Toate drepturile rezervate.</Typography>
                    </Col>
                    <Col md={6} className="social-icons">
                        <Link href="https://www.facebook.com/elena.aradoaei?locale=ro_RO" target="_blank" rel="noopener noreferrer" className="icon-link">
                            <FaFacebook className="icon" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/elena-aradoaei-b5011a23a/" target="_blank" rel="noopener noreferrer" className="icon-link">
                            <FaLinkedin className="icon" />
                        </Link>
                        <Link href="https://www.instagram.com/aradoaeielena/" target="_blank" rel="noopener noreferrer" className="icon-link">
                            <FaInstagram className="icon2" />
                        </Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

