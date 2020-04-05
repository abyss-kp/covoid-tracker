import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCaseSeries, setStateWiseData, setHeaderSearch } from '../actions/index'
import Tooltip from '@material-ui/core/Tooltip';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
const columns = [
  { id: 'state', label: 'State', minWidth: 10, align: 'left', maxWidth: 50 },
  { id: 'confirmed', label: 'Total', minWidth: 80, align: 'center', },
  {
    id: 'deltaconfirmed',
    label: 'New',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'deaths',
    label: 'Deaths',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'recovered',
    label: 'Recovered',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'active',
    label: 'Active Cases',
    minWidth: 80,
    align: 'center',
  }
];

const styles = (theme) => ({
  root: {
    width: '100%',
    paddingTop: '70px'
  },
  container: {
    maxHeight: 550
  },
  cardRoot: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  img:{
    width:'9%',
    verticalAlign:"middle",
    border:'outset',
  }
});

class IndiaView2 extends React.Component {
  state = {
    time: "",
    statesData: {},
    selectedState: "India",
    rows: [],
    cities: []
  }
  async componentDidMount() {
    //Get India's states data
    await axios.get(`https://api.covid19india.org/data.json`)
      .then(res => {
        let response = res.data
        let state = response.statewise.filter(e => (!["Dadra and Nagar Haveli",
          "Daman and Diu", "Lakshadweep", "Meghalaya", "Nagaland", "Sikkim", "Tripura"].includes(e.state)))
        this.setState({  statesData: response.statewise, rows: state }, () => { //time: response.key_values[0].lastupdatedtime,
          //set data in redux
          this.props.setCaseSeries(response.cases_time_series)
        })
      })
    await axios.get(`https://api.covid19india.org/v2/state_district_wise.json`)
      .then(res => {
        let response = res.data
        this.setState({ cities: response }, () => {
          //  set data in redux
          this.props.setStateWiseData(response)
        })
      })
  }
  showDistrictClicked = (row) => {
    this.props.setHeaderSearch("")
    this.props.history.push(`/State/${row.state}`)
  }

  makeCards = (row) => {
    const { classes } = this.props
    return (
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <b>Confirmed : {row.confirmed}</b>
          </Typography>
          <Typography variant="h5" component="h2">
            <img src={`/Images/${row.state}.png`}className={classes.img}/>  <b> {row.state}</b>
            {/* <img src="logo192.png"className={classes.img}/>  <b> {row.state}</b> */}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Last Updated : {row.lastupdatedtime}
          </Typography>
          <Typography variant="body2" component="p">
            <span style={{color:'darkcyan'}}>Active : {row.active} </span>&emsp; <span style={{color:'green'}}> Recovered : {row.recovered}</span>
            <br />
         <span style={{color:'maroon'}}> Death:{row.deaths}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" disabled={row.state === "Total"} onClick={()=>this.showDistrictClicked(row)}>Show Districts</Button>
        </CardActions>
      </Card>)
  }
  render() {
    let filteredRows = this.props.search ? this.state.rows.filter(row => row.state.toLowerCase().startsWith(this.props.search.toLowerCase())) : this.state.rows
    const { classes } = this.props
    
    return (
      <div className={classes.root}>
        <Grid container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {filteredRows.map((row) =>
            <Grid item xs={12} sm={6} lg={3} md={4}>
              {this.makeCards(row)}
            </Grid>)}
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    search: state.rootReducer.searchField
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCaseSeries: (data) => dispatch(setCaseSeries(data)),
  setStateWiseData: (data) => dispatch(setStateWiseData(data)),
  setHeaderSearch: (data) => dispatch(setHeaderSearch(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IndiaView2))