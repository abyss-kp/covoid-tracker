import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { setCountryList, setCountryCities, setCountryCitYSelection } from '../../actions/index'
import axios from 'axios';
import File from '../../states.txt';
import readTextFile from './countryCities'
import NovelCovid from 'novelcovid';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});
class Search extends React.Component {
  state = {
    country: "",//{ name: 'India', alpha2Code: 'IN' },
    city: "",
    data: ""
  }
  getCity = async () => {
    this.props.setCountryCitYSelection({ "country": this.state.country, "city": this.state.city })
  }
  async componentDidMount() {
    await axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        this.props.setCountryList(res.data)
      })
    let countryCityMap = readTextFile(File)
    this.props.setCountryCities(countryCityMap)
  }
  handleStateChange = (e, value) => {
    this.setState({ city: value.title }, () => {
      this.getCity()
    })
  }
  render() {
    let countryNames = this.props.countries.map(e => { return { "title": e.name, "callingCodes": e.callingCodes, "capital": e.capital, "population": e.population, "flag": e.flag, "alpha3Code": e.alpha3Code, "alpha2Code": e.alpha2Code } })

    let cityNames = this.props.cities[this.state.country.alpha2Code] ? this.props.cities[this.state.country.alpha2Code].map(city => {
      return {
        "title": city
      }
    }) : []
    return (<>
      <Autocomplete
        id="filter-demo"
        options={countryNames}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        style={{ width: 400, margin: '0 auto', paddingTop: '90px', backgroundColor: 'white' }}
        renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
        onChange={(e, value) => this.setState({ country: value })}
      // disabled
      />
      <Autocomplete
        id="filter-demo2"
        options={cityNames}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        style={{ width: 400, margin: '0 auto', paddingTop: '15px', backgroundColor: 'white' }}
        renderInput={(params) => <TextField {...params} label="Select Place" variant="outlined" />}
        onChange={(e, value) => this.handleStateChange(e, value)}
      />
      {this.state.city &&
        <div style={{ textAlignLast: 'center' }}>
          <h2>....Feature coming soon....</h2>
          <h3>Stay tuned</h3>
        </div>
      }
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
export default connect(mapStateToProps, mapDispatchToProps)(Search)