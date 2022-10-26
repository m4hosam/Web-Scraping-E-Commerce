import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function Cardfunc(props) {
    // console.log(props.sellers);
    return (
        <Card sx={{ maxWidth: 350, minHeight: 200 }} >
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
                <Typography gutterBottom variant="h6" component="div" color={'#EB1D36'}>
                    {props.price}
                </Typography>



            </CardContent >
            <CardActions>
                <Button variant="contained" style={{ margin: "8px" }} href={"/products/" + props.id}>Details</Button>
            </CardActions>
        </Card >
    );
}

export default Cardfunc;
