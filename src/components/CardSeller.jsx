import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import './App.css';




function cardSeller(props) {
    console.log(props)
    return (
        <div >
            <Button href={props.productUrl} style={{ minWidth: "17rem", maxWidth: "17rem" }}>
                <Grid container  >
                    <Grid item xs={8}>
                        <span className="CardPrice">{props.seller}</span>
                    </Grid>
                    <Grid item xs={8}>
                        {props.price}
                    </Grid>
                </Grid>
                <ArrowForwardIosIcon />
            </Button>

        </div>
    );
}

export default cardSeller;