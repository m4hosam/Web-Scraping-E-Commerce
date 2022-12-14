import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




function Header(props) {

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
                        <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                                {props.brand}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.price} TL
                            </Typography>
                        </CardContent>


                    </Grid>

                </Grid>
            </Card>
        </Box>

    );
}

export default Header;