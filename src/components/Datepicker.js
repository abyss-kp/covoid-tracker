import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux'
import { setEndDate, setStartDate } from '../actions/datepicker'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles({
  input: {
    cursor: 'not-allowed',
  },
  root: {
    color: 'white'
  }
});
function Datepicker(props) {
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState(props.startDate);
  const [endDate, setEndDate] = React.useState(props.endDate);
  const handleStartDateChange = (date) => {
    console.log(date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
    if (date !== "Invalid Date") {
      setStartDate(date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
      props.setStartDate(date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
    }
  };
  const handleEndDateChange = (date) => {
    if (date !== "Invalid Date") {
      setEndDate(date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
      props.setEndDate(date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
    }
  };
console.log(startDate,endDate)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ color: 'white' }}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          minDate={new Date("02/01/2020")}
          maxDate={new Date(Date.now() - 2*24 * 60 * 60 * 1000).toLocaleDateString('en-US')}
          disableToolbar
          variant="inline"
          id="date-picker-inline"
          format="MMM/dd/yyyy"
          margin="normal"
          // id="date-picker-dialog"
          label="Start date"
          InputProps={{ classes }}
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            classes
          }}
          InputLabelProps={{
            classes
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          variant="inline"
          disableToolbar
          id="date-picker-inline"
          // id="date-picker-dialog"
          label="End Date"
          minDate={new Date("02/04/2020")}
          maxDate={new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US')}
          format="MMM/dd/yyyy"
          value={endDate}
          onChange={handleEndDateChange}
          InputProps={{ classes }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            classes
          }}
          InputLabelProps={{
            classes
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
function mapStateToProps(state) {
  return {
    startDate: state.dateSearch.startDate,
    endDate: state.dateSearch.endDate,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setStartDate: (date) => dispatch(setStartDate(date)),
  setEndDate: (date) => dispatch(setEndDate(date))
});
export default connect(mapStateToProps, mapDispatchToProps)((Datepicker))