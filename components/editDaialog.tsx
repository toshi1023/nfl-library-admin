import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IEditDialog {
    /**
     * モーダルのタイトル
     */
    title: string;
    /**
     * モーダルのオープン用stateを渡す
     */
    open: boolean;
    /**
     * モーダルのオープン用stateを更新する処理を渡す
     */
    closeCallback: (value: boolean) => void;
    /**
     * 更新ボタンを押下した時の処理を渡す
     */
    saveCallback: () => void;
    /**
     * モーダルに表示するフォームをjsxで渡す
     */
    renderForm: React.ReactNode
}

/**
 * 編集用モーダル
 * @returns 
 */
const EditDialog: React.FC<IEditDialog> = (props) => {
    const handleClose = () => {
        props.closeCallback(false)
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>{props.title} Edit</DialogTitle>
                <DialogContent>
                    {props.renderForm}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={props.saveCallback}>Register</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default React.memo(EditDialog)