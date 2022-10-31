import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


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
                        <Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>Logo</Link>
                    </Typography>
                    <Box sx={{ display: { sm: 'block' } }}>
                        <Button>
                            <Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
                        </Button>
                        <Button>
                            <Link to='/products' style={{ color: '#fff', textDecoration: 'none' }}>E-Commerce</Link>
                        </Button>
                        <Button>
                            <Link to='/admin' style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>


        </Box>
    );
}


export default DrawerAppBar;
