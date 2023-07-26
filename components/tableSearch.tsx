import React from 'react'
import styles from '../styles/components/component.module.scss'
import TextField from '@mui/material/TextField';

interface ITableSearch {
    value?: string
}

const TableSearch: React.FC<ITableSearch> = (props) => {

    return (
        <div className={styles.tableSearch}>
            <TextField
                id="filled-search"
                label="検索条件を入力する"
                type="search"
                variant="filled"
                className={styles.searchField}
                defaultValue={props.value}
            />
        </div>
    )
}

export default TableSearch