import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardSeller from '../CardSeller'


function CreateSellers(sellerDetails) {
    return <CardSeller
        key={sellerDetails.id}
        productUrl={sellerDetails.productUrl}
        seller={sellerDetails.seller}
        price={sellerDetails.price}
    />
}


function Header(props) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 1100,
                    height: 400,
                },
            }}
        >
            <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={props.imgUrl}
                            alt="green iguana"
                            sx={{ objectFit: "contain" }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={6}>
                        <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                                {props.brand}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.name}
                            </Typography>
                        </CardContent>

                        <div style={{ padding: '1rem 1rem' }}>{props.sellers?.map(CreateSellers)}</div>
                    </Grid>

                </Grid>
            </Card>
        </Box>

    );
}

export default Header;