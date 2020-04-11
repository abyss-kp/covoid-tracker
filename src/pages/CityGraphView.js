import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
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

class CityGraphView extends React.Component {
  state = {
    label: [],
    data: [],
    stateName:""
  }
  componentDidMount() {
    let stateName = this.props.match.params.name
    if (!this.props.city.length)
      this.props.history.push("/India")
    else {
      let stateCities = this.props.city.filter(e => e.state === stateName)[0]
      if (!stateCities.districtData)
        this.props.history.push("/India")
      else {
        let label = []
        let data = []
        stateCities.districtData.filter(e => e.district !== "Unknown").map(itm => {
          label.push(itm.district)
          data.push(itm.confirmed)
        })
        this.setState({ label, data,stateName })
      }
    }
  }
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
<LineChart
barChartData={this.state}
label={"Confirmed cases"}
text={`Total confirmed cases in ${this.state.stateName}`}
/>
      </Paper>
    );
  }
}
function mapStateToProps(state) {
  return {
    city: state.rootReducer.statewise,
    search: state.rootReducer.searchField
  }
}
export default connect(mapStateToProps, null)(withStyles(styles)(CityGraphView))