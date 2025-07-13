import React, { useState, useCallback } from 'react'
import TeamTabs from '@/components/teamTabs'
import SelectBox from '@/components/selectBox'
import TableSearchInput from '@/components/tableSearchInput'
import ToggleButton from '@/components/toggleButton'
import styles from '@/styles/pages/roster.module.scss'
import PlayerCard from '../../components/playerCard'
import { GetStaticProps } from 'next'
import { 
    Avatar, Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import json_team from '@/data/team.json'
import { fetchSearchedRoster } from '@/lib/rosterFetch'
import { ISuccessResponse, ISearchedRosterResponse } from '@/types/fetchTypes'
import { IEditRosterDomain, IRosterDomain } from '@/types/domainTypes'
import OdStatusRadioButton from '@/components/odStatusRadioButton'
import EditDaialog from '@/components/editDaialog'
import FormInput from '@/components/formInput'

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
/**
 * テーブルの行データ表示用コンポーネント
 * @param props 
 * @returns 
 */
const Row: React.FC<{ row: IRosterDomain, season: number, openCallback: (value: boolean, roster: IRosterDomain | null) => void }> = (props) => {
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
                    <Button variant="contained" color="primary" sx={{width: '10px'}} onClick={() => props.openCallback(true, row)}><EditIcon /></Button>
                    <Button variant="contained" color="error" sx={{width: '10px'}}><DeleteIcon /></Button>
                </TableCell>
            </TableRow>
            <TableRow className='rowExpanded'>
                <TableCell colSpan={12}>
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
    data: ISuccessResponse<ISearchedRosterResponse>
}
export default function index({data}: Props) {
    const [rosters, setRosters] = useState<IRosterDomain[]>(data.data.rosters)
    const [editRoster, setEditRoster] = useState<IEditRosterDomain>()
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
     * @param roster rostersの１レコード
     */
    const changeOpenCallback = useCallback((value: boolean, roster: IRosterDomain | null = null) => {
        if(roster) {
            const editRosterData: IEditRosterDomain = {
                roster: {
                    number: roster.number,
                    position_id: roster.position.id,
                    rating: roster.rating
                },
                player: {
                    firstname: roster.player.firstname,
                    lastname: roster.player.lastname,
                    birthday: roster.player.birthday_date,
                    height: roster.player.height,
                    weight: roster.player.weight,
                    college: roster.player.college,
                    drafted_team: roster.player.drafted_team,
                    drafted_round: roster.player.drafted_round,
                    drafted_rank: roster.player.drafted_rank,
                    drafted_year: roster.player.drafted_year
                }
            }
            setEditRoster(editRosterData)
        }
        setOpen(value)
    }, [open])
    /**
     * 保存処理
     */
    const editSaveCallback = (props: IEditRosterDomain): void => {
        console.log('保存処理', props)
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
        setRosters(data.data.rosters)
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
                        <div key={row.id} className={styles.cardContainer} onClick={() => changeOpenCallback(true)}>
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
                    saveCallback={() => editRoster && editSaveCallback(editRoster)} 
                    renderForm={() => {
                        return (
                            editRoster ? 
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <FormInput label='Number' value={editRoster.roster.number} validation={true} message='入力値が無効です' callback={(val) => {}} />
                                    <FormInput label='Name' value={editRoster.player.firstname} validation={false} message='' callback={(val) => {}} />
                                    <FormInput label='Name' value={editRoster.player.lastname} validation={false} message='' callback={(val) => {}} />
                                    <FormInput label='Age' value={editRoster.player.birthday} validation={false} message='' callback={(val) => {}} />
                                    <FormInput label='Position' value={editRoster.roster.position_id} validation={false} message='' callback={(val) => {}} />
                                    <FormInput label='Rating' value={editRoster.roster.rating} validation={false} message='' callback={(val) => {}} />
                                </Box>
                            : <div></div> // editRosterがnullの場合は何も表示しない
                        )
                    }}
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