import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'
import Grid from '@mui/material/Grid';

function CreateCard(cardDetails) {
    return <Grid item xs={12} sm={6} md={3} >
        <ProductCard
            key={cardDetails._id}
            id={cardDetails._id}
            imgUrl={cardDetails.imgUrl}
            name={cardDetails.name}
            price={cardDetails.price}
        />
    </Grid >;
}




function Details() {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products').then((response) => {
            setproducts(response.data);
        });
    }, []);
    // console.log(products);

    return (
        <Grid container spacing={2}>
            {products.map(CreateCard)}
            {products.map(CreateCard)}
            {products.map(CreateCard)}
        </Grid>

    );
}

export default Details;