import React from 'react';
// import IndiaView from './components/IndiaView'
import IndiaView2 from './components/IndiaView2'
import Resources from './components/About'
import CityView from './components/CityView'
import PersistentDrawerRight from './components/drawer'
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
          <PersistentDrawerRight />
          <Switch>
            <Route exact path="/All" component={CountryView} />
            <Route exact path="/India" component={IndiaView2} />
            <Route exact path="/Resources" component={Resources} />
            <Route exact path="/" component={IndiaView2} />
            <Route exact path="/State/:name" component={CityView} />
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}
export default (App);
