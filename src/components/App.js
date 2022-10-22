import React from 'react';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar'
import Home from './Home'
import AppDetails from './Details/AppDetails'
import AppDetailsEC from './Products/ProductDetails'
import Products from './Products/products'
import Admin from './Admin/Search'
import EditDetails from './Admin/EditDetails'
import { Route, Routes, useParams } from 'react-router-dom'


function ProductDetails() {
    let { id } = useParams();
    return <AppDetails id={id} />;
}

function ProductDetailsEC() {
    let { id } = useParams();
    return <AppDetailsEC id={id} />;
}

function App() {

    return (<div>
        <NavBar />
        <Typography variant="h4" component="div" style={{ textAlign: "center", margin: "8rem" }}>

        </Typography>
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/:id' element={<ProductDetails />} />

            <Route path='/products' element={<Products />} />

            <Route path='/admin' element={<Admin />} />

            <Route path='/editLaptop' element={<EditDetails />} />

            <Route path='/products/:id' element={<ProductDetailsEC />} />

        </Routes>
    </div >)
}

export default App;