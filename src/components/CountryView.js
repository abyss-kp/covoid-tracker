import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import {setCountryList} from '../actions/index'
const columns = [
  { id: 'country', label: 'Country', minWidth: 10,align:'left',maxWidth:50 },
  { id: 'total_cases', label: 'Total', minWidth: 80 , align: 'center',},
  {
    id: 'new_cases',
    label: 'New',
    minWidth: 80,
    align: 'center',
    // format: (value) => value.toLocaleString(),
  },
  {
    id: 'total_deaths',
    label: 'Deaths',
    minWidth: 80,
    align: 'center',
    // format: (value) => value.toLocaleString(),
  },
  {
    id: 'total_recovered',
    label: 'Recovered',
    minWidth: 80,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'active_cases',
    label: 'Active Cases',
    minWidth: 80,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'serious_critical',
    label: 'Critical',
    minWidth: 80,
    align: 'center',
    // format: (value) => value.toFixed(2),
  }
];

function createData(country, total_cases, new_cases, total_deaths,total_recovered,active_cases,serious_critical,new_deaths) {
  return { country, total_cases, new_cases, total_deaths,total_recovered,active_cases,serious_critical,new_deaths };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop:'70px'
  },
  container: {
    maxHeight: 550
  },
});

 function CountryView(props) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]); 
  const [time,setTime]=React.useState("")
  React.useEffect(() => {
    fetch('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=209')
      .then(results => results.json())
      .then(data => {
     let rowData= data.data.rows.map(itm=>createData(
        itm.country, itm.total_cases, itm.new_cases, itm.total_deaths,itm.total_recovered,itm.active_cases,itm.serious_critical,itm.new_deaths
      ))
      let time=new Date(data.data.last_update.split(",").join("")).toString()
      setRows(rowData)
      setTime(time)
      props.setCountryList(data)
      });
  }, []); 
  let filteredRows=props.search?rows.filter(row=>row.country.toLowerCase().startsWith(props.search.toLowerCase())):rows
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          {!rows.length ?  <caption >Please wait!<b> Loading data 🔄🔄🔄</b></caption>:
        <caption  ><b>Updated at: </b> {time}</caption>}
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
          
            {filteredRows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
const mapDispatchToProps = (dispatch) => ({
  setCountryList: (data) => dispatch(setCountryList(data))
});
function mapStateToProps(state) {
  return {
    search:state.rootReducer.searchField,
    country:state.rootReducer.countries
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CountryView)