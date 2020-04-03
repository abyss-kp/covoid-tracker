import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { setCountryList, setCountryCities, setCountryCitYSelection } from '../../actions/index'
import axios from 'axios';
import File from '../../states.txt';
import readTextFile from './countryCities'

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});
class StateSearch extends React.Component {
  state = {
    country: "",
    city: "",
    data: ""
  }

  handleStateChange = (e, value) => {
    this.setState({ city: value.title }, () => {
      this.getCity()
    })
  }
  render() {
    return (<>
      <Autocomplete
        id="filter-demo2"
        options={[]}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        style={{ width: 400, margin: '0 auto', paddingTop: '15px', backgroundColor: 'white' }}
        renderInput={(params) => <TextField {...params} label="Select Place" variant="outlined" />}
        onChange={(e, value) => this.handleStateChange(e, value)}
      />
    </>
    );
  }
}


function mapStateToProps(state) {
  return {
    countries: state.rootReducer.countries,
    cities: state.rootReducer.states
  };
}
const mapDispatchToProps = (dispatch) => ({
  setCountryList: (data) => dispatch(setCountryList(data)),
  setCountryCities: (data) => dispatch(setCountryCities(data)),
  setCountryCitYSelection: (data) => dispatch(setCountryCitYSelection(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(StateSearch)