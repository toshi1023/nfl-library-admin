import React from 'react'
import styles from '@/styles/components/component.module.scss'

interface IToggleButton {
    /**
     * アクティブなカンファレンス情報を格納
     */
    conf: number,
    /**
     * 選択したカンファレンス情報を取得するコールバック関数を定義
     */
    callback: (conference: number) => void,
}

/**
 * カンファレンスの検索用ボタン
 * @param props 
 * @returns 
 */
const ToggleButton: React.FC<IToggleButton> = (props) => {
    return (
        <div className={styles.toggleButton}>
            <button type='button' className={`${styles.left} ${props.conf === 1 ? null : styles.inactive}`} onClick={() => props.callback(1)}>AFC</button>
            <button type='button' className={`${styles.right} ${props.conf === 2 ? null : styles.inactive}`} onClick={() => props.callback(2)}>NFC</button>
        </div>
    )
}

export default React.memo(ToggleButton)