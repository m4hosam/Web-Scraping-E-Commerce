import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import ProductCard from './ProductCardAdmin'


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





function Admin() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('https://shielded-woodland-84794.herokuapp.com/products').then((response) => {
            setproducts(response.data);
        });
    }, []);


    async function handleSearch(event) {
        setLoading(true);
        setName(event.target.value)
        console.log(event.target.value);
        const post = { searchKey: event.target.value }

        await axios.post("https://shielded-woodland-84794.herokuapp.com/products/search", post)
            .then((response) => {
                setproducts(response.data);
                // console.log(response.data)
            });
        setLoading(false);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const post = { searchKey: name }
        setLoading(true);
        await axios.post("https://shielded-woodland-84794.herokuapp.com/adminSearch", post)
            .then((response) => {
                // console.log(response.data)
                // console.log("----------------------------\n");
                navigate("/editLaptop", { state: response.data });
            });

        setLoading(false);
        // console.log("----------------------------\n");
        // console.log(laptop);
        // navigate("/editLaptop", { state: laptop });

    }

    return (
        <form onSubmit={handleSubmit}>
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
                <Box
                    sx={{
                        display: 'flex',
                        width: '80%',
                        justifyContent: 'center',
                        padding: '2rem 0rem'
                    }}
                >


                    <TextField
                        id="standard-search"
                        label="Model No"
                        type="search"
                        variant="standard"
                        style={{ flex: '3', marginRight: '1rem' }}
                        onChange={handleSearch}
                    />

                    <Button type="submit" variant="contained" style={{ flex: '0.5' }}>Web Scrap</Button>


                </Box>


                {loading ? (
                    <Box sx={{ width: '80%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <div></div>
                )}


                <Grid container spacing={2} style={{ width: '90%', marginTop: '2rem' }}>
                    {products.map(CreateCard)}
                </Grid>
            </Box>
        </form >

    );
}

export default Admin;
