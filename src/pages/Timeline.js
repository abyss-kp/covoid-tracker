import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCaseSeries, setLoader } from '../actions/index'
import LineChart from '../components/LineChart'
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
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
    labels: [],
    data: []
  }
  makeGraphData = (arr) => {
    let labels = [],
      dailyconfirmed = [],
      dailydeceased = [],
      dailyrecovered = []
    arr.map(itm => {
      labels.push(itm.date)
      dailyconfirmed.push(+itm.dailyconfirmed)
      dailydeceased.push(+itm.dailydeceased)
      dailyrecovered.push(+itm.dailyrecovered)
    })
    this.setState({
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
    }, () => this.props.setLoader(false))
  }
  async componentDidMount() {
    this.props.setLoader(true)
    if (!this.props.series.length) {
      await axios.get(`https://api.covid19india.org/data.json`)
        .then(res => {
          let response = res.data
          this.props.setCaseSeries(response.cases_time_series)
          this.makeGraphData(response.cases_time_series)
        }).catch(e => alert("An error occured! \n Please reload!"))
    } else
      this.makeGraphData(this.props.series)
  }
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <LineChart
          datasets={this.state.data}
          labels={this.state.labels}
          text={`Click on any label`}
        />
      </Paper>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCaseSeries: (data) => dispatch(setCaseSeries(data)),
  setLoader: (data) => dispatch(setLoader(data)),
});
function mapStateToProps(state) {
  return {
    series: state.rootReducer.caseSeries
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TimeSeries))