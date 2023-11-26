import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/layouts/header.module.scss'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'

const Header: React.FC = () => {
    const menuList = [
        {menu: 'Roster', active: true},
        {menu: 'Player', active: false},
        {menu: 'Team', active: false},
        {menu: 'User', active: false},
        {menu: 'Data Update', active: false}
    ]
    const [avtiveMenu, setActiveMenu] = useState(menuList[0])
    const [open, setOpen] = useState(false)
    const menuStyle = open ? styles.menu : `${styles.menu} ${styles.slideinTop}`

    /**
     * ドロワーの開閉処理
     * @param value ドロワーの開閉フラグ
     * @returns 
     */
    const toggleDrawer = (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpen(value);
    };


    /**
     * メニュークリック時にmenuListのactive情報を更新
     * @param menu 
     * @param val 
     */
    const handleClick = (menu: string, val: boolean) => {
        setActiveMenu({menu: menu, active: val})
        toggleDrawer(false)
    }

    return (
        <div className={`md ${styles.header}`}>
            <div className={styles.relative}>
                <div className={`fx between ${styles.topContainer}`}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer(!open)}
                        sx={{
                            marginLeft: 1,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={`fx align-center fx-right ${styles.titleContainer}`}>
                        <div className={styles.logo}>
                            <img src='nfl_logo_resize.jpg' alt='no image' />
                        </div>
                        <p>LIBRARY ADMIN</p>
                    </div>
                </div>
                <div className={menuStyle}>
                    <ul>
                        {
                            menuList.map((val, index) => (
                                <React.Fragment key={index}>
                                    <li 
                                        key={index} 
                                        className={val.menu === avtiveMenu.menu ? styles.active : ''} 
                                        onClick={() => handleClick(val.menu, val.active)}
                                        onKeyDown={toggleDrawer(false)}
                                    >
                                        {
                                            val.menu 
                                        }
                                    </li>
                                </React.Fragment>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header