import * as React from 'react';
import styles from '@/styles/components/component.module.scss'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { ISelectListData } from '@/types/componentTypes';

interface ISelectBox {
    label: string;                      // ドロップダウンリストのラベル
    data: ISelectListData[];            // リスト表示用のデータ
    selected: number;                   // 選択中の値
    callback: (value: number) => void;  // 値変更処理を実行する関数
}

/**
 * ドロップダウンリスト
 * @param props 
 * @returns 
 */
const SelectBox: React.FC<ISelectBox> = (props) => {
  return (
    <Box sx={{ width: '100%' }} className={styles.selectBox}>
      <FormControl fullWidth>
        <InputLabel variant="standard">
          {props.label}
        </InputLabel>
        <NativeSelect
            value={props.selected}
            onChange={(e) => props.callback(+e.currentTarget.value)}
            inputProps={{
                name: props.label,
            }}
        >
            {
                props.data?.map(val => (
                    <option key={val.value} value={val.value}>{val.text}</option>
                ))
            }
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default React.memo(SelectBox)