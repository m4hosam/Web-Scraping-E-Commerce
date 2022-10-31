import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'





function Details(props) {
    const id = props.id;
    const [laptop, setlaptop] = useState([]);

    useEffect(() => {
        axios.get(`https://shielded-woodland-84794.herokuapp.com/${id}`).then((response) => {
            setlaptop(response.data);
        });
    }, []);
    // console.log(laptop.sellers?.map(CreateSellers));

    return (<>
        <Header
            brand={laptop.brand}
            name={laptop.name}
            imgUrl={laptop.imgUrl}
            sellers={laptop.sellers}

        />
        <Footer laptop={laptop} />
    </>
    );
}

export default Details;