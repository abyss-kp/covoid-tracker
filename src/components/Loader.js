import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Loader(props) {
  const classes = useStyles();
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    loader: state.rootReducer.loader
  }
}
export default connect(mapStateToProps,null)(Loader)