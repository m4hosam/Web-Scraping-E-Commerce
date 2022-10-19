import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function createData(name, value) {
    return { name, value };
}


function Footer(props) {
    const rows = [
        createData('Model', props.laptop.series),
        createData('Model No', props.laptop.modelNo),
        createData('Operating System', props.laptop.ops),
        createData('CPU Type', props.laptop.cpuType),
        createData('CPU Generation', props.laptop.cpuGen),
        createData('RAM', props.laptop.ram),
        createData('Disk Size', props.laptop.diskSize),
        createData('Disk Type', props.laptop.diskType),
        createData('Screen Size', props.laptop.screenSize),
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 1100
                },
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell >
                                    <TextField
                                        id="outlined-name"
                                        label={row.name}
                                        defaultValue={row.value}
                                        style={{ width: "100%" }}
                                        onChange={(e) => props.array[index + 3](e.target.value)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
}

export default Footer;