import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Details/Footer'
import Header from './ProductDetailsHeader'





function Details(props) {
    const id = props.id;
    const [laptop, setlaptop] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`).then((response) => {
            setlaptop(response.data);
        });
    }, []);
    console.log(laptop);

    return (<>
        <Header
            brand={laptop.brand}
            name={laptop.name}
            imgUrl={laptop.imgUrl}
            price={laptop.price}

        />
        <Footer laptop={laptop} />
    </>
    );
}

export default Details;