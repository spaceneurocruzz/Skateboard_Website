import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ShowAlertMessages = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          更新成功！
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowAlertMessages;