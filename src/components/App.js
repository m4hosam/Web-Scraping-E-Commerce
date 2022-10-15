import React from 'react';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar'
import Cards from './Cards'
import AppDetails from './Details/AppDetails'
import { Route, Routes, useParams } from 'react-router-dom'


function ProductDetails() {
    let { id } = useParams();
    return <AppDetails id={id} />;
}

function App() {

    return (<div>
        <NavBar />
        <Typography variant="h4" component="div" style={{ textAlign: "center", margin: "2rem" }}>
            laptops
        </Typography>
        <Routes>
            <Route path='/' element={<Cards />} />

            <Route path='/:id' element={<ProductDetails />} />

        </Routes>
    </div >)
}

export default App;