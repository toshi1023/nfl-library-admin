import React, { useState } from 'react'
import BaseTable from '@/components/baseTable'
import TableSearch from '@/components/tableSearch'
import ToggleButton from '@/components/toggleButton'
import styles from '@/styles/pages/test.module.scss'

const index: React.FC = () => {
    const [conf, setConf] = useState(1)
    const tbCallback = (val: number) => {
        setConf(val)
    }

    return (
        <div>
            <div className={styles.searchBox}>
                <TableSearch />
            </div>
            <div className={styles.test}>
                <div className={styles.toggleButton}>
                    <ToggleButton conf={conf} callback={tbCallback} />
                </div>
            </div>
            <div className={styles.test}>
                Testページです
                <div className={styles.tableContainer}>
                    <BaseTable />
                </div>
            </div>
        </div>
    )
}

export default index