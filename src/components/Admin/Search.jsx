import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";







function Admin() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const post = { key: name }


        await axios.post("http://localhost:5000/search", post)
            .then((response) => {
                console.log(response.data)
                console.log("----------------------------\n");
                navigate("/editLaptop", { state: response.data });
            });

        // console.log("----------------------------\n");
        // console.log(laptop);
        // navigate("/editLaptop", { state: laptop });

    }

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    display: 'flex',

                    justifyContent: 'center',
                    padding: '5rem 10rem'
                }}
            >


                <TextField
                    id="standard-search"
                    label="Model No"
                    type="search"
                    variant="standard"
                    style={{ flex: '3', marginRight: '1rem' }}
                    onChange={(e) => setName(e.target.value)}
                />

                <Button type="submit" variant="contained" style={{ flex: '1' }}>Web Scrap</Button>


            </Box>
        </form>

    );
}

export default Admin;
