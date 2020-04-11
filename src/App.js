import React from 'react';
import IndiaCardView from './pages/IndiaCardView'
import Resources from './pages/About'
import PersistentDrawerRight from './components/drawer'
import CountryView from './pages/CountryView'
import CityGraphView from './pages/CityGraphView'
import Loader from './components/Loader'
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
          <Loader/>
          <Switch>
            <Route exact path="/All" component={CountryView} />
            <Route exact path="/India" component={IndiaCardView} />
            <Route exact path="/Resources" component={Resources} />
            <Route exact path="/" component={IndiaCardView} />
            <Route exact path="/State/:name" component={CityGraphView} />
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}
export default (App);
