import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

    useEffect(() => {
        axios.get("http://localhost:5000/").then((response) => {
            setlaptop(response.data);
        });
    }, []);

    async function handleSearch(event) {
        console.log(event.target.value);
        const post = { searchKey: event.target.value }


        await axios.post("http://localhost:5000/search", post)
            .then((response) => {
                setlaptop(response.data);
                // console.log(response.data)
            });
    }
    // console.log(props.laptops)
    return (
        // <Box
        //     sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         '& > :not(style)': {
        //             m: 1,
        //             width: 1300
        //         },
        //     }}
        // >
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
            <ButtonGroup variant="outlined" aria-label="outlined button group" >
                <Button>En Popüler Ürünler</Button>
                <Button>En Düşük Fiyat</Button>
                <Button>En Yüksek Fiyat</Button>
            </ButtonGroup>
            <Grid container spacing={2}>
                {laptops.map(CreateCard)}
            </Grid>
        </Box>

    );
}

export default MediaCard;
