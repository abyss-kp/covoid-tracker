import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCaseSeries, setLoader, hideMessage, showMessage } from '../actions/index'
import LineChart from '../components/LineChart'
const styles = (theme) => ({
  root: {
    width: '100%',
    paddingTop: '70px'
  },
  container: {
    maxHeight: 550
  },
});

class TimeSeries extends React.Component {
  state = {
    caseSeries:[]
  }
  makeGraphData = (originalArr) => {
    let arr = originalArr.filter(itm => {
      let dt = new Date(itm.date + 2020).getTime()
      return (dt >= new Date(this.props.startDate).getTime()) && (dt <= new Date(this.props.endDate).getTime())
    })
    let labels = [],
      dailyconfirmed = [],
      dailydeceased = [],
      dailyrecovered = []
      this.props.setLoader(false)
    arr.map(itm => {
      labels.push(itm.date)
      dailyconfirmed.push(+itm.dailyconfirmed)
      dailydeceased.push(+itm.dailydeceased)
      dailyrecovered.push(+itm.dailyrecovered)
    })
    return({
      labels,
      data:
        [
          {
            label: "Deceased",
            backgroundColor: '#008B8E',
            borderColor: "#008B8E",
            data: dailydeceased,
            borderWidth: 1,
            fill: false,
            spanGaps: true,
          },
          {
            label: 'Recovered',
            backgroundColor: 'green',
            data: dailyrecovered,
            borderColor: "green",
            borderWidth: 1,
            fill: false, spanGaps: true,
          }, {
            label: 'New Cases',
            backgroundColor: "rgba(160,0,0,0.4)",
            borderColor: "#9F0000",
            data: dailyconfirmed,
            borderWidth: 1,
            fill: false, spanGaps: true,
          },
        ]
    })
  }
  async componentDidMount() {
    this.props.setLoader(true)
    if (!this.props.series.length) {
      this.props.showMessage("info", "Fetching data")
      await axios.get(`https://api.covid19india.org/data.json`)
        .then(res => {
          let response = res.data
          this.setState({caseSeries:response.cases_time_series})
          this.props.setCaseSeries(response.cases_time_series)
          this.props.showMessage("success", "You can toggle between 3 option")
        }).catch(e => this.props.showMessage("error", "An error occured! \n Please try again"))
    } else{
      this.setState({caseSeries:this.props.series})
      this.props.setCaseSeries(this.props.series)
  }
  }
  render() {
    let graphObj=this.makeGraphData(this.props.series)
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <LineChart
          datasets={graphObj.data}
          labels={graphObj.labels}
          text={`Click on any label`}
        />
      </Paper>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCaseSeries: (data) => dispatch(setCaseSeries(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  showMessage: (type, msg) => dispatch(showMessage(type, msg)),
  hideMessage: (data) => dispatch(hideMessage(data)),
});
function mapStateToProps(state) {
  return {
    series: state.rootReducer.caseSeries,
    startDate: state.dateSearch.startDate,
    endDate: state.dateSearch.endDate,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TimeSeries))