import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
import Grid from '@mui/material/Grid';





function CreateCard(cardDetails) {
    // console.log(cardDetails)
    return <Grid item xs={12} sm={6} md={3} >
        <Card
            key={cardDetails.id}
            imgUrl={cardDetails.imgUrl}
            name={cardDetails.name}
            price={cardDetails.price}
            seller={cardDetails.seller}
            sellers={cardDetails.sellers}
        />
    </Grid >;
}



function MediaCard(props) {
    // console.log(props.laptops)
    return (
        <Grid container spacing={2}>
            {props.laptops.map(CreateCard)}
            {props.laptops.map(CreateCard)}
            {props.laptops.map(CreateCard)}
        </Grid>
    );
}

export default MediaCard;
