import * as React from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Cardfunc(props) {
    const navigate = useNavigate();

    async function handleEdit(event) {
        console.log(props.id)
        await axios.get(`http://localhost:5000/products/${props.id}`).then((response) => {
            console.log(response.data)
            navigate("/editLaptop", { state: response.data });
        });
    }
    async function handleDelete(event) {
        // window.confirm("Are You sure")
        if (window.confirm("Are You sure") == true) {
            console.log(props.id)
            await axios.get(`http://localhost:5000/products/delete/${props.id}`).then((response) => {
                console.log(response.data)
                navigate("/products");
            });
        } else {
            console.log("You canceled!")
        }

    }



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
                <Button variant="contained" style={{ margin: "8px", backgroundColor: "#006f3c" }} onClick={handleEdit}>Edit</Button>
                <Button variant="contained" style={{ margin: "8px", backgroundColor: "#bf212f" }} onClick={handleDelete}>Delete</Button>
            </CardActions>
        </Card >
    );
}

export default Cardfunc;
