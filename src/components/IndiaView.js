import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import StateSearch from './not used/StateSearch'
import { render } from '@testing-library/react';
import axios from 'axios';
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

// function createData(state, confirmed, deltaconfirmed, deaths, recovered, active) {
//   return { state, confirmed, deltaconfirmed, deaths, recovered, active };
// }

const styles = (theme)=>({
  root: {
    width: '100%',
    paddingTop: '70px'
  },
  container: {
    maxHeight: 550
  },
});

class IndiaView extends React.Component {
  state={
    time:"",
    statesData:{},
    selectedState:"India",
    rows:[]
  }
  async componentDidMount(){
    //Get India's states data
    await axios.get(`https://api.covid19india.org/data.json`)
    .then(res => {
     let response=res.data
    //  let rowsData=response.statewise.map(itm=>{
    //    createData(itm.state, itm.confirmed, itm.deltaconfirmed, itm.deaths, itm.recovered, itm.active)
    //  })
     this.setState({time:response.key_values[0].lastupdatedtime,statesData:response.statewise,rows:response.statewise},()=>{
       //set data in redux
     })
    })
  }
  render() {
    const {classes}=this.props
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
          {!this.state.rows.length ?  <caption style={{"textAlignLast":'center'}}>Please wait!<b> Loading data 🔄🔄🔄</b></caption>:
        <caption style={{"textAlignLast":'center'}} ><b>Updated at: </b> {this.state.time}</caption>}
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
            <TableBody>
               {this.state.rows.map((row,idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

export default withStyles(styles)(IndiaView)