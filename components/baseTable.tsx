import React from 'react';
import styles from '@/styles/components/component.module.scss'
import PlayerCard from './playerCard';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const createData = (
    id: number,
    image: string,
    name: string,
    age: number,
    position: string,
    rating: number
) => {
    return {
        id,
        image,
        name,
        age,
        position,
        rating
    };
}

const rows = [
    createData(1, '', 'Brock Purdy', 23, 'QB', 73),
    createData(2, '', 'Deebo Samuel', 27, 'WR', 89),
    createData(3, '', 'Nick Bosa', 26, 'RE', 98),
    createData(4, '', 'Trent Williams', 37, 'LT', 98),
    createData(5, '', 'Christian Mccaffrey', 27, 'HB', 96),
];

const BaseTable: React.FC = () => {
    return (
        <TableContainer className='baseTable' component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead className='baseTableHeader'>
                    <TableRow>
                        <TableCell className='cell' style={{width: '10%'}} />
                        <TableCell className='cell' style={{width: '10%'}}>ID</TableCell>
                        <TableCell className='cell' style={{width: '10%'}} align="center">Face</TableCell>
                        <TableCell className='cell' style={{width: '25%'}} align="center">Name</TableCell>
                        <TableCell className='cell' style={{width: '10%'}} align="center">Age</TableCell>
                        <TableCell className='cell' style={{width: '10%'}} align="center">Position</TableCell>
                        <TableCell className='cell' style={{width: '10%'}} align="center">Rating</TableCell>
                        <TableCell className='cell' style={{width: '15%'}} align="center">Option</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={styles.baseTableBody}>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
  
const Row: React.FC<{ row: ReturnType<typeof createData> }> = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', padding: '8px' } }}>
                <TableCell align='center' className='cell'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left" className='cell'>{row.id}</TableCell>
                <TableCell align="center" className='cell'>
                    <Avatar className='avatar' alt="" src={row.image} />
                </TableCell>
                <TableCell scope="row" className='cell'>
                    {row.name}
                </TableCell>
                <TableCell align="center" className='cell'>{row.age}</TableCell>
                <TableCell align="center" className='cell'>{row.position}</TableCell>
                <TableCell align="center" className='cell'>{row.rating}</TableCell>
                <TableCell align="center" className='cell'>
                    <Button variant="contained" color="primary" sx={{width: '10px'}}><EditIcon /></Button>
                    <Button variant="contained" color="error" sx={{width: '10px'}}><DeleteIcon /></Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={8} className='rowExpanded'>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <PlayerCard />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default BaseTable