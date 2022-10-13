import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar'
import Cards from './Cards'

function App() {

    const [laptops, setlaptop] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/").then((response) => {
            // console.log(response.data);
            setlaptop(response.data);
        });
    }, []);

    // console.log(laptops);
    return (<div>
        <NavBar />
        <Typography variant="h4" component="div" style={{ textAlign: "center", margin: "2rem" }}>
            laptops
        </Typography>
        <Cards laptops={laptops} />

    </div >)
}

export default App;