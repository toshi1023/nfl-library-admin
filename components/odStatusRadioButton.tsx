import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from '@/styles/components/component.module.scss'

interface IOdStatusRadioButton {
  /**
   * アクティブなステータス情報を格納
   */
  status: number,
  /**
   * 選択したステータス情報を取得するコールバック関数を定義
   */
  callback: (status: number) => void,
}

const OdStatusRadioButton: React.FC<IOdStatusRadioButton> = (props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.callback(+(event.target as HTMLInputElement).value);
    }

    return (
        <FormControl className={styles.odStatusRadioButton}>
            <FormLabel id="demo-row-radio-buttons-group-label" className={styles.label}>Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={props.status}
              onChange={handleChange}
            >
                <FormControlLabel value={99} control={<Radio />} label="すべて" />
                <FormControlLabel value={1} control={<Radio />} label="オフェンス" />
                <FormControlLabel value={0} control={<Radio />} label="ディフェンス" />
            </RadioGroup>
        </FormControl>
    )
}

export default React.memo(OdStatusRadioButton)