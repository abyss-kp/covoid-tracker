import React from 'react';
import { connect } from "react-redux";
import Search from './components/not used/Search'
import IndiaView from './components/IndiaView'
import CityView from './components/CityView'
import PersistentDrawerRight from './components/drawer'
import './App.css';
import TableView from './components/TableView'
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
        <Route exact path="/All" component={TableView} />
        <Route  exact path="/India" component={IndiaView} />
        <Route  exact path="/" component={IndiaView} />
        <Route exact path="/State/:name" component={CityView} />
      </Switch>
      </Router>,
      {/* </PersistentDrawerRight> */}

    </ThemeProvider>
    )
  }
}
export default connect()(App);
