import * as React from 'react';
import Button from '@mui/material/Button';
import styles from '@/styles/components/component.module.scss'

interface IBaseButton {
  /**
   * ボタンのラベル情報を格納
   */
  label: string,
  /**
   * ボタンをクリックした時のコールバック関数を定義
   */
  callback: <T>(props: T) => void,
}

const BaseButton: React.FC<IBaseButton> = (props) => {
    return (
        <Button className={styles.baseButton} onClick={props.callback}>{props.label}</Button>
    )
}

export default React.memo(BaseButton)