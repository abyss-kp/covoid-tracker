import React from 'react';
import { connect } from "react-redux";
import IndiaView from './components/IndiaView'
import CityView from './components/CityView'
import PersistentDrawerRight from './components/drawer'
import './App.css';
import CountryView from './components/CountryView'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const styles = {
  paperContainer: {
      // backgroundImage: `url(${Image})`
  }
};
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={Router.browserHistory}>
      <PersistentDrawerRight/>
       <Switch>
        {/* <Route exact path="/IndiaView" component={IndiaView} /> */}
        <Route exact path="/All" component={CountryView} />
        <Route  exact path="/India" component={IndiaView} />
        <Route  exact path="/" component={IndiaView} />
        <Route exact path="/State/:name" component={CityView} />
      </Switch>
      </Router>
    </ThemeProvider>
    )
  }
}
export default (App);
