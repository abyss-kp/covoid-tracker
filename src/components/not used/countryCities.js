/* import React from 'react';
import { connect } from 'react-redux';
import File from '../states.txt';
import { setCountryCities } from '../actions/index'

class CountryCities extends React.Component {
  componentDidMount() {
    this.readTextFile(File)
  }
  readTextFile = file => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText.split("\n").map(str => str.split("\t"));
          let countryCities = {}
          allText.map(val => {
            let countryCode = val[0].split(".")[0]
            let state = val[1]
            countryCities[countryCode] ? countryCities[countryCode].push(state) : countryCities[countryCode] = [state]
          })
          this.props.setCountryCities(countryCities)
          // this.setState({
          //     fundData: allText
          // });
        }
      }
    };
    rawFile.send(null);
  };
  render() {
    return (
      <></>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCountryCities: (data) => dispatch(setCountryCities(data))
});
export default connect(null, mapDispatchToProps)(CountryCities) */
var readTextFile = file => {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  let countryToCitiesMap = {}
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText.split("\n").map(str => str.split("\t"));

        allText.map(val => {
          let countryCode = val[0].split(".")[0]
          let state = val[1]
          countryToCitiesMap[countryCode] ? countryToCitiesMap[countryCode].push(state) : countryToCitiesMap[countryCode] = [state]
          return null
        })
      }
    }
  };
  rawFile.send(null);
  return countryToCitiesMap
}
export default readTextFile