import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardSeller from './CardSeller'
import './App.css';

function CreateSellers(sellerDetails) {
    // console.log(sellerDetails);
    return <CardSeller
        key={sellerDetails._id}
        productUrl={sellerDetails.productUrl}
        seller={sellerDetails.seller}
        price={sellerDetails.price}
    />
}


function Cardfunc(props) {
    // console.log(props.sellers);
    return (
        <Card sx={{ maxWidth: 340, minHeight: 400 }} >
            <CardMedia
                component="img"
                height="140"
                image={props.imgUrl}
                alt="green iguana"
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />
            {/* mapping throw the sellers array from api */}
            <CardContent>
                <Typography gutterBottom variant="h7" component="div">
                    {props.name}
                </Typography>
                <div>{props.sellers.map(CreateSellers)}</div>

            </CardContent >
            <CardActions>
                <Button variant="contained" style={{ margin: "8px" }} href={"/" + props.id}>Details</Button>
            </CardActions>
        </Card >
    );
}

export default Cardfunc;
