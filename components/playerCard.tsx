import React from 'react'
import styles from '@/styles/components/component.module.scss'
import Avatar from '@mui/material/Avatar';

const PlayerCard: React.FC = () => {
  return (
    <div className={styles.playerCard}>
        <div className={styles.header}>
            <div className={styles.position}>
                QB
            </div>
            <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} alt="" src="/static/images/avatar/1.jpg" />
            </div>
            <div className={styles.rating}>
                <p>RT</p>
                <p>73</p>
            </div>
        </div>
        <div className={styles.body}>
            <div className={styles.fullName}>Brock Purdy</div>
            <div className={styles.infoContainer}>
                <div>
                    <div>
                        <label>height</label>
                        <p>184.2cm</p>
                    </div>
                    <div>
                        <label>weight</label>
                        <p>80.2kg</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label>birthday</label>
                        <p>1999年05月12日</p>
                    </div>
                    <div>
                        <label>college</label>
                        <p>Alabama</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label>drafted team</label>
                        <p>Chicago Bears</p>
                    </div>
                    <div>
                        <label>drafted year</label>
                        <p>2022年</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label>drafted round</label>
                        <p>7th</p>
                    </div>
                    <div>
                        <label>drafted rank</label>
                        <p>159th pick</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlayerCard