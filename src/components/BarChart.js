import React from 'react';
import { Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  // chartWrapper: {
  //   position: 'relative'
  // },

  // canvas: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   pointerEvents: 'none'
  // },

  chartAreaWrapper: {
    width: 'auto',
    overflowX: 'scroll',
    paddingTop: '60px'
  }
});

class BarChart extends React.Component {
  render() {
    console.log(this.props)
    const { classes } = this.props
    const barChartData={
      labels:this.props.barChartData.label,
      datasets: [
        {
          label: this.props.label,
          backgroundColor: "#96adce",
          borderColor: "#2d4f7e",
          borderWidth: 1,
          data: this.props.barChartData.data
        }
      ]
    }
    return (
      // <div className={classes.chartWrapper}>
      <div className={classes.chartAreaWrapper}>
        <Bar
          className={classes.canvas}
          data={barChartData}
          width={1000}
          height={500}
          options={{
            title: {
              display: true,
              text: this.props.text,
              fontSize: 20
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              // xAxes: [{
              //   // categorySpacing: 0
              //   barThickness : 10
              //   // barPercentage: 0.5
              // }],
            },
            // responsive: true,
            maintainAspectRatio: false,
            // maxHeight: '1500px',
            // minHeight:'900px',
            legend: {
              display: true,
              position: 'top'
            }
          }}
        />
      </div>
      // </div>
    );
  }
}
export default withStyles(styles)(BarChart)