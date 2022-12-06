import React from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  style?: any;
  onClose: () => void;
}

export interface DialogContentProps {
  id: string;
  children?: React.ReactNode;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: "linear-gradient(180deg, #000000 0%, #3F3F46 100%)",
    maxWidth: '1110px',
    width: '1110px',
    overflow: 'none'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    // borderTopColor: "#27272A"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .metadata-properties::-webkit-scrollbar': {
    height: "2px",
    background: "#52525B",
    scrollbarWidth: "thin"
  },
  '& .metadata-properties::-webkit-scrollbar-thumb': {
    width: "100px",
    background: "#fff"
  }
}));

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

export const BootstrapDialogContent = (props: DialogContentProps) => {
  const { children, ...other } = props;
  return <DialogContent dividers>
    {children}
  </DialogContent>
}


export const Modal = (props) => {
  const { open, setOpen, children, onClose, ...other } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={() => { setOpen(false) }}
      aria-labelledby="customized-dialog-title"
      open={open}
      {...other}
    >
      {children}
    </BootstrapDialog>
  );
};

