import React, { useState } from 'react'
import TeamTabs from '@/components/teamTabs'
import SelectBox from '@/components/selectBox'
import TableSearchInput from '@/components/tableSearchInput'
import ToggleButton from '@/components/toggleButton'
import styles from '@/styles/pages/roster.module.scss'
import PlayerCard from '../../components/playerCard';
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
import json_team from '@/data/team.json'

/******************************************************************
* 変数定義
*******************************************************************/
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
    createData(6, '', 'Brock Purdy', 23, 'QB', 73),
    createData(7, '', 'Deebo Samuel', 27, 'WR', 89),
    createData(8, '', 'Nick Bosa', 26, 'RE', 98),
    createData(9, '', 'Trent Williams', 37, 'LT', 98),
    createData(10, '', 'Christian Mccaffrey', 27, 'HB', 96),
];

const yearSelectList = [
    {value: 2021, text: '2021'},
    {value: 2020, text: '2020'},
    {value: 2019, text: '2019'},
]

/******************************************************************
* コンポーネント関数
*******************************************************************/
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
            <TableRow className='rowExpanded'>
                <TableCell colSpan={8}>
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

/******************************************************************
* メイン関数
*******************************************************************/
const index: React.FC = () => {
    const [conf, setConf] = useState<number>(1)
    const [searchYear, setSearchYear] = useState<number>(yearSelectList[0].value)
    const [selectTab, setSelectTab] = useState<number>(1)
    const tbCallback = (val: number) => {
        setConf(val)
    }

    return (
        <div>
            <div className={styles.searchBox}>
                <div className={styles.selectBox}>
                    <SelectBox label='Year' data={yearSelectList} selected={searchYear} callback={(value: number) => setSearchYear(value)} />
                </div>
                <div className={styles.tableSearchInput}>
                    <TableSearchInput />
                </div>
            </div>
            <div className={styles.roster}>
                <div className={styles.toggleButton}>
                    <ToggleButton conf={conf} callback={tbCallback} />
                </div>
                <TeamTabs data={json_team} selectConf={conf} selectTab={selectTab} callback={(value) => setSelectTab(value)} />
                <div className={styles.tableContainer}>
                    <TableContainer className='baseTable' component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead className='baseTableHeader'>
                                <TableRow>
                                    <TableCell className='cell' style={{width: '10%'}} />
                                    <TableCell className='cell' style={{width: '10%'}} align="center">ID</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Face</TableCell>
                                    <TableCell className='cell' style={{width: '25%'}} align="center">Name</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Age</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Position</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Rating</TableCell>
                                    <TableCell className='cell' style={{width: '15%'}} align="center">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='baseTableBody'>
                                {rows.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default index