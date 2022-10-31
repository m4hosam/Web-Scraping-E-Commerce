import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LinearProgress from '@mui/material/LinearProgress';




function CreateCard(cardDetails) {

    return <Grid item xs={12} sm={6} md={3} >
        <Card
            key={cardDetails._id}
            id={cardDetails._id}
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("https://shielded-woodland-84794.herokuapp.com/").then((response) => {
            setlaptop(response.data);
        });
        setLoading(false)
    }, []);


    async function handleSearch(event) {
        console.log(event.target.value);
        const post = { searchKey: event.target.value }
        setLoading(true);
        await axios.post("https://shielded-woodland-84794.herokuapp.com/search", post)
            .then((response) => {
                setlaptop(response.data);
                // console.log(response.data)
            });
        setLoading(false);
    }
    async function handlePriceToLow(event) {
        setLoading(true);
        await axios.get("https://shielded-woodland-84794.herokuapp.com/priceToLow")
            .then((response) => {
                setlaptop(response.data);
                // console.log(response.data)
            });
        setLoading(false);
    }
    async function handlePriceToHigh(event) {
        setLoading(true);
        await axios.get("https://shielded-woodland-84794.herokuapp.com/priceToHigh")
            .then((response) => {
                setlaptop(response.data);
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
                <Button onClick={handleSearch}>En Popüler Ürünler</Button>
                <Button onClick={handlePriceToHigh}>En Düşük Fiyat</Button>
                <Button onClick={handlePriceToLow}>En Yüksek Fiyat</Button>
            </ButtonGroup>
            {loading ? (
                <Box sx={{ width: '80%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <div></div>
            )}
            <Grid container spacing={2} style={{ width: '90%', marginTop: '2rem' }}>
                {laptops.map(CreateCard)}
            </Grid>

        </Box>

    );
}

export default MediaCard;
