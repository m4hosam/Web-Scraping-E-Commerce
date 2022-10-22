import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';





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
    return (<>
        <TextField
            id="standard-search"
            label="Search"
            type="search"
            variant="standard"
            style={{ width: "90%", margin: "2rem 3rem" }}
            onChange={handleSearch}
        />
        <Grid container spacing={2}>
            {laptops.map(CreateCard)}
        </Grid>
    </>
    );
}

export default MediaCard;
