import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/layouts/sidebar.module.scss'

const Sidebar: React.FC = () => {
    const menuList = [
        {menu: 'Roster', active: true},
        {menu: 'Player', active: false},
        {menu: 'Team', active: false},
        {menu: 'User', active: false},
        {menu: 'Data Update', active: false}
    ]
    const [avtiveMenu, setActiveMenu] = useState(menuList[0]);

    /**
     * メニュークリック時にmenuListのactive情報を更新
     * @param menu 
     * @param val 
     */
    const handleClick = (menu: string, val: boolean) => {
        setActiveMenu({menu: menu, active: val})
    }

    return (
        <div className={styles.sidebar}>
            <div>
                <div className={styles.logo}>
                    <img src='nfl_logo_resize.jpg' alt='no image' />
                </div>
                <p>LIBRARY ADMIN</p>
            </div>
            <div className={styles.menu}>
                <ul>
                    {
                        menuList.map((val, index) => (
                            <React.Fragment key={index}>
                                {
                                    val.menu === avtiveMenu.menu ? 
                                        <div></div>
                                    :
                                        null
                                }
                                <li key={index} className={val.menu === avtiveMenu.menu ? styles.active : ''} onClick={() => handleClick(val.menu, val.active)}>
                                    {
                                        val.menu === avtiveMenu.menu ? 
                                            <>
                                                {val.menu}<span style={{backgroundColor: '#541EC8'}}></span>
                                            </> 
                                        : 
                                            val.menu
                                    }
                                </li>
                                {
                                    val.menu === avtiveMenu.menu ? 
                                        <div></div>
                                    :
                                        null
                                }
                            </React.Fragment>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar