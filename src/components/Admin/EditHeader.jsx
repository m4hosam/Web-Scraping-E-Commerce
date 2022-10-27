import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';




function Header(props) {
    console.log("brand" + props.brand)
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 1100,
                    height: 400,
                },
            }}
        >
            <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={props.imgUrl}
                            alt="green iguana"
                            sx={{ objectFit: "contain" }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={6}>
                        <CardContent style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '15rem',
                            justifyContent: 'space-between',
                            marginTop: '3rem'

                        }}>
                            <TextField
                                id="outlined-name"
                                label="Brand"
                                defaultValue={props.brand}
                                onChange={(e) => props.array[0](e.target.value)}
                            />
                            <TextField
                                id="outlined-name"
                                label="Name"
                                defaultValue={props.name}
                                onChange={(e) => props.array[1](e.target.value)}
                            />
                            <TextField
                                id="outlined-name"
                                label="Price"
                                defaultValue={props.price}
                                onChange={(e) => props.array[2](e.target.value)}
                            />

                        </CardContent>


                    </Grid>

                </Grid>
            </Card>
        </Box>

    );
}

export default Header;