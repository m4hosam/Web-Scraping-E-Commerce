import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('https://shielded-woodland-84794.herokuapp.com/products').then((response) => {
            setproducts(response.data);
        });
    }, []);
    // console.log(products);

    async function handleSearch(event) {
        setLoading(true);
        console.log(event.target.value);
        const post = { searchKey: event.target.value }

        await axios.post("https://shielded-woodland-84794.herokuapp.com/products/search", post)
            .then((response) => {
                setproducts(response.data);
                // console.log(response.data)
            });
        setLoading(false);
    }
    async function handlePriceToLow(event) {
        setLoading(true);
        await axios.get("https://shielded-woodland-84794.herokuapp.com/products/priceToLow")
            .then((response) => {
                setproducts(response.data);
                // console.log(response.data)
            });
        setLoading(false);
    }
    async function handlePriceToHigh(event) {
        setLoading(true);
        await axios.get("https://shielded-woodland-84794.herokuapp.com/products/priceToHigh")
            .then((response) => {
                setproducts(response.data);
                // console.log(response.data)
            });
        setLoading(false);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <TextField
                id="standard-search"
                label="Search"
                type="search"
                variant="standard"
                style={{ width: "80%" }}
                onChange={handleSearch}
            />
            <ButtonGroup variant="outlined" aria-label="outlined button group" style={{ marginTop: '2rem' }}>
                <Button onClick={handleSearch}>En Pop??ler ??r??nler</Button>
                <Button onClick={handlePriceToLow}>En D??????k Fiyat</Button>
                <Button onClick={handlePriceToHigh}>En Y??ksek Fiyat</Button>
            </ButtonGroup>
            <Grid container spacing={2} style={{ width: '90%', marginTop: '2rem' }}>
                {products.map(CreateCard)}
            </Grid>
        </Box>


    );
}

export default Details;