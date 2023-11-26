import React from 'react'
import styles from '@/styles/components/component.module.scss'
import Avatar from '@mui/material/Avatar';
import { IRosterDomain } from '@/types/domainTypes';

interface IPlayerCard {
    /**
     * ロスター情報の単体データ
     */
    roster: IRosterDomain
}

const PlayerCard: React.FC<IPlayerCard> = (props) => {
    const { roster } = props
    return (
        <div className={styles.playerCard}>
            <div className={styles.header}>
                <div className={styles.position}>
                    {roster.position.name}
                    <p>#{roster.number}</p>
                </div>
                <div className={styles.avatarContainer}>
                    <Avatar className={styles.avatar} alt="" src="/static/images/avatar/1.jpg" />
                </div>
                <div className={styles.rating}>
                    <p>RT</p>
                    <p>{roster.rating}</p>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.fullName}>{`${roster.player.firstname} ${roster.player.lastname}`}</div>
                <div className={styles.infoContainer}>
                    <div>
                        <div>
                            <label>height</label>
                            <p>{roster.player.height}cm</p>
                        </div>
                        <div>
                            <label>weight</label>
                            <p>{roster.player.weight}kg</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>birthday</label>
                            <p>{roster.player.birthday_date}</p>
                        </div>
                        <div>
                            <label>college</label>
                            <p>{roster.player.college}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>drafted team</label>
                            <p>{roster.player.drafted_team}</p>
                        </div>
                        <div>
                            <label>drafted year</label>
                            <p>{roster.player.drafted_year}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>drafted round</label>
                            <p>{roster.player.drafted_round}</p>
                        </div>
                        <div>
                            <label>drafted rank</label>
                            <p>{roster.player.drafted_rank}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PlayerCard)