import React from 'react';
import Container from 'react-bootstrap/Container';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import backgroundImage from "./Contact1.png";

const Contact = () => {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '90vh' }}>
            <Container style={{ marginLeft: '5.5rem', color: 'black'}}>
                <Grid container alignItems="center" style={{ marginTop: '2rem'}}>
                    <Grid item>
                        <Typography variant="h4" style={{ marginTop: '15rem'}}>
                            Contactează-ne
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginTop: '2rem'}}>
                    <Grid item>
                        <EmailIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ marginLeft: '1rem', fontSize: '20px'}}>
                            Email: mentor_virtual@gmail.com
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginTop: '1rem'}}>
                    <Grid item>
                        <PhoneIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ marginLeft: '1rem', fontSize: '20px'}}>
                            Telefon: +40752932179
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item>
                        <LocationOnIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ marginLeft: '1rem', marginTop: '1rem', fontSize: '20px'}}>
                            Universitatea Tehnică Gheorghe Asachi, <br/>
                            Bulevardul Profesor Dr. doc. Dimitrie Mangeron 27, <br/>
                            Iași 700050
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Contact;