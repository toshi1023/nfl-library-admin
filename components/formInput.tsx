import * as React from 'react';
import TextField from '@mui/material/TextField';

interface IFormInput {
    label: string;                      // 入力項目のラベル
    value: string;                      // 入力の初期データ
    validation: boolean;                // エラーステータス
    message: string;                    // バリデーションメッセージ
    callback: (value: string) => void;  // 値変更処理を実行する関数
}

/**
 * 入力フィールド
 * @param props 
 * @returns 
 */
const FormInput: React.FC<IFormInput> = (props) => {
  return (
    <div>
        <TextField
            error={props.validation}
            label={props.label}
            value={props.value}
            size="small"
            helperText={props.message}
            onChange={() => props.callback}
            InputLabelProps={{
                style: {fontSize: '1.5rem'}
            }}
        />
    </div>
  );
}

export default React.memo(FormInput)