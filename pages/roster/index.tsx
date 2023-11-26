import React, { useState, useEffect, useCallback } from 'react'
import TeamTabs from '@/components/teamTabs'
import SelectBox from '@/components/selectBox'
import TableSearchInput from '@/components/tableSearchInput'
import ToggleButton from '@/components/toggleButton'
import styles from '@/styles/pages/roster.module.scss'
import PlayerCard from '../../components/playerCard';
import { GetStaticProps, NextPage } from 'next'
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
import { fetchSearchedRoster } from '@/lib/rosterFetch'
import { ISearchedRosterResponse } from '@/types/fetchTypes'
import { IRosterDomain } from '@/types/domainTypes'
import OdStatusRadioButton from '@/components/odStatusRadioButton'
import EditDaialog from '@/components/editDaialog'

/******************************************************************
* 変数定義
*******************************************************************/
const defaultYear = 2020
const defaultTeam = 1
const yearSelectList = [
    {value: 2020, text: '2020'},
    {value: 2019, text: '2019'},
    {value: 2018, text: '2018'},
]

/******************************************************************
* コンポーネント関数
*******************************************************************/
const Row: React.FC<{ row: IRosterDomain, season: number, openCallback: (value: boolean) => void }> = (props) => {
    const { row, season } = props;
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
                    <Avatar className='avatar' alt="" src={row.player.image_url} />
                </TableCell>
                <TableCell align="center" className='cell'>{row.number}</TableCell>
                <TableCell scope="row" className='cell'>
                    {`${row.player.firstname} ${row.player.lastname}`}
                </TableCell>
                <TableCell align="center" className='cell'>{season - row.player.birthday_year}</TableCell>
                <TableCell align="center" className='cell'>{row.position.name}</TableCell>
                <TableCell align="center" className='cell'>{row.rating}</TableCell>
                <TableCell align="center" className='cell'>
                    <Button variant="contained" color="primary" sx={{width: '10px'}} onClick={() => props.openCallback(true)}><EditIcon /></Button>
                    <Button variant="contained" color="error" sx={{width: '10px'}}><DeleteIcon /></Button>
                </TableCell>
            </TableRow>
            <TableRow className='rowExpanded'>
                <TableCell colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <PlayerCard roster={row} />
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
type Props = {
    data: ISearchedRosterResponse
}
const index: NextPage<Props> = ({data}) => {
    const [rosters, setRosters] = useState<IRosterDomain[]>(data.rosters)
    const [conf, setConf] = useState<number>(1)
    const [status, setStatus] = useState<number>(99)
    const [searchSeason, setSearchSeason] = useState<number>(defaultYear)
    const [selectTeam, setSelectTeam] = useState<number>(defaultTeam)
    const [open, setOpen] = useState<boolean>(false)
    /**
     * 攻守ステータスの変更処理
     * @param value クリックしたステータスの値
     */
    const changeStatusCallback = useCallback(async (value: number) => {
        setStatus(value)
    }, [status])
    /**
     * カンファレンスの変更処理
     * @param value クリックしたカンファレンスの値
     */
    const changeConfCallback = useCallback(async (value: number) => {
        setConf(value)
        let team = 1
        // NFCを選択した場合
        if(value === 2 && selectTeam < 17) {
            team = selectTeam + 16
        } else {
            // AFCを選択した場合
            team = selectTeam - 16
        }
        setSelectTeam(team)
        // データ再取得
        await fetch(searchSeason, team)
    }, [conf])
    /**
     * 編集モーダルの開閉処理
     * @param value モーダル開閉の値
     */
    const changeOpenCallback = useCallback((value: boolean) => {
        setOpen(value)
    }, [open])
    /**
     * 保存処理
     */
    const editSaveCallback = () => {

    }

    /**
     * データ取得API
     * @param season 検索したシーズンの年代
     * @param team 選択したチームのID
     */
    const fetch = async (season: number, team: number) => {
        const query = {
            season: season,
            team: team,
            conditions: ''
        }
        const data = await fetchSearchedRoster(query)
        setRosters(data.rosters)
    }

    return (
        <div>
            <div className={styles.searchBox}>
                <div className={styles.selectBox}>
                    <SelectBox label='Season' data={yearSelectList} selected={searchSeason} callback={useCallback(async (value: number) => {
                        setSearchSeason(value)
                        console.log(selectTeam)
                        await fetch(value, selectTeam)
                    }, [searchSeason])} />
                </div>
                <div className={styles.tableSearchInput}>
                    <TableSearchInput />
                </div>
            </div>
            <div>
                <OdStatusRadioButton status={status} callback={changeStatusCallback} />
            </div>
            <div className={styles.roster}>
                <div className={styles.toggleButton}>
                    <ToggleButton conf={conf} callback={changeConfCallback} />
                </div>
                <TeamTabs data={json_team} selectConf={conf} selectTab={selectTeam} callback={useCallback(async (value) => {
                    setSelectTeam(value)
                    await fetch(searchSeason, value)
                }, [selectTeam])} />
                <div className={`sm ${styles.tableContainer}`}>
                    <TableContainer className='baseTable' component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead className='baseTableHeader'>
                                <TableRow>
                                    <TableCell className='cell' style={{width: '5%'}} />
                                    <TableCell className='cell' style={{width: '10%'}} align="center">ID</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Face</TableCell>
                                    <TableCell className='cell' style={{width: '5%'}} align="center">Number</TableCell>
                                    <TableCell className='cell' style={{width: '25%'}} align="center">Name</TableCell>
                                    <TableCell className='cell' style={{width: '5%'}} align="center">Age</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Position</TableCell>
                                    <TableCell className='cell' style={{width: '10%'}} align="center">Rating</TableCell>
                                    <TableCell className='cell' style={{width: '15%'}} align="center">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='baseTableBody'>
                                {rosters.map((row) => (
                                    <Row key={row.id} row={row} season={searchSeason} openCallback={changeOpenCallback} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='md'>
                    {rosters.map((row) => (
                        <div key={row.id} className={styles.cardContainer}>
                            <PlayerCard roster={row} />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <EditDaialog 
                    title='Roster' 
                    open={open} 
                    closeCallback={changeOpenCallback} 
                    saveCallback={editSaveCallback} 
                    renderForm={<div></div>}
                />
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetchSearchedRoster({season: defaultYear, team: defaultTeam, conditions: ''})
    return {
        props: { data },
    }
}

export default index