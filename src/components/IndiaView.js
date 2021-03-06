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
import { setCaseSeries, setStateWiseData, setLoader,setHeaderSearch,setCountryCities } from '../actions/index'
import Tooltip from '@material-ui/core/Tooltip';
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
});

class IndiaView extends React.Component {
  state = {
    time: "",
    statesData: {},
    selectedState: "India",
    rows: [],
    cities: []
  }
  async componentDidMount() {
    this.props.setLoader(true)
    if(!this.props.districts.length)
    await axios.get(`https://api.covid19india.org/v2/state_district_wise.json`)
    .then(res => {
      let response = res.data
      this.setState({ cities: response }, () => {
        //  set data in redux
        this.props.setLoader(true)
        this.props.setStateWiseData(response)
      }).catch(e=>alert("An error occured! \n Please reload!"))
    })
    // .catch(e=> this.props.setLoader(true))
    else
    {
      this.setState({ cities: this.props.districts })
      this.props.setLoader(false)
    }
    if(!this.props.caseSeries.length)
    await axios.get(`https://api.covid19india.org/data.json`)
      .then(res => {
        let response = res.data
        let state = response.statewise.filter(e => (!["Dadra and Nagar Haveli",
          "Daman and Diu", "Lakshadweep", "Meghalaya", "Nagaland", "Sikkim", "Tripura"].includes(e.state)))
        this.setState({  statesData: response.statewise, rows: state }, () => {//time: response.key_values[0].lastupdatedtime,
          //set data in redux
          this.props.setCaseSeries(response.cases_time_series)
        })
      })
      else      
    this.setState({rows:this.props.states})
  }
  rowClick = (row) => {
    this.props.setHeaderSearch("")
    this.props.history.push(`/State/${row.state}`)
  }
  render() {
    let filteredRows = this.props.search ? this.state.rows.filter(row => row.state.toLowerCase().startsWith(this.props.search.toLowerCase())) : this.state.rows
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            {!filteredRows.length ? <caption /* style={{"textAlignLast":'center'}} */>Please wait!<b> Loading data 🔄🔄🔄</b></caption> :
              <caption /* style={{"textAlignLast":'center'}} */ >Thanks for visiting !</caption>}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {filteredRows.map((row, idx) => {
                return (
                  <Tooltip title="Click to view districts">
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} onClick={() => this.rowClick(row)}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </Tooltip>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}
function mapStateToProps(state) {
  return {
    search: state.rootReducer.searchField,
    states: state.rootReducer.states,
    districts: state.rootReducer.statewise,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCaseSeries: (data) => dispatch(setCaseSeries(data)),
  setStateWiseData: (data) => dispatch(setStateWiseData(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  setHeaderSearch: (data) => dispatch(setHeaderSearch(data)),  
  setCountryCities: (data) => dispatch(setCountryCities(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IndiaView))