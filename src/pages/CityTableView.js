import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
const columns = [
  { id: 'district', label: 'District', minWidth: 10, align: 'left', maxWidth: 50 },
  { id: 'confirmed', label: 'Total', minWidth: 80, align: 'center', },
  {
    id: 'deltaconfirmed',
    label: 'New',
    minWidth: 80,
    align: 'center',
  }
];

function createData(district, confirmed, deltaconfirmed) {
  return { district, confirmed, deltaconfirmed };
}

const styles = (theme) => ({
  root: {
    width: '100%',
    paddingTop: '70px'
  },
  container: {
    maxHeight: 550
  },
});

class CityTableView extends React.Component {
  state = {
    time: "",
    rows: []
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
        let rows = stateCities.districtData.map(itm =>{
          return createData(itm.district, itm.confirmed, itm.delta.confirmed)}
        ).filter(e=>e.district!=="Unknown")
        this.setState({ rows })
      }
    }
  }
  render() {
    let filteredRows=this.props.search?this.state.rows.filter(row=>row.district.toLowerCase().startsWith(this.props.search.toLowerCase())):this.state.rows
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
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
              {filteredRows.map((row, idx) => {
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
function mapStateToProps(state) {
  return {
    city: state.rootReducer.statewise, 
    search:state.rootReducer.searchField
  }
}
export default connect(mapStateToProps, null)(withStyles(styles)(CityTableView))