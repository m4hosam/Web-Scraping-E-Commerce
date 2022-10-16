import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function DrawerAppBar() {

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" >
                <Toolbar>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { sm: 'block' } }}
                    >
                        Logo
                    </Typography>
                    <Box sx={{ display: { sm: 'block' } }}>
                        <Button href='/' sx={{ color: '#fff' }}>
                            Home
                        </Button>
                        <Button href='/products' sx={{ color: '#fff' }}>
                            E-Commerce
                        </Button>
                        <Button href='/admin' sx={{ color: '#fff' }}>
                            Admin
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>


        </Box>
    );
}


export default DrawerAppBar;
