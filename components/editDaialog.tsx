import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BaseButton from './baseButton';

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
    saveCallback: <T>(props: T) => void;
    /**
     * モーダルに表示するフォームをjsxで渡す
     */
    renderForm: () => React.ReactElement
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
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                    >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {props.renderForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <BaseButton label='Register' callback={props.saveCallback}></BaseButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default React.memo(EditDialog)