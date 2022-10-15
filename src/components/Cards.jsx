import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
import Grid from '@mui/material/Grid';





function CreateCard(cardDetails) {
    return <Grid item xs={12} sm={6} md={3} >
        <Card
            key={cardDetails.id}
            id={cardDetails.id}
            imgUrl={cardDetails.imgUrl}
            name={cardDetails.name}
            price={cardDetails.price}
            seller={cardDetails.seller}
            sellers={cardDetails.sellers}
        />
    </Grid >;
}



function MediaCard() {
    const [laptops, setlaptop] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/").then((response) => {
            setlaptop(response.data);
        });
    }, []);
    // console.log(props.laptops)
    return (
        <Grid container spacing={2}>
            {laptops.map(CreateCard)}
            {laptops.map(CreateCard)}
            {laptops.map(CreateCard)}
        </Grid>
    );
}

export default MediaCard;
