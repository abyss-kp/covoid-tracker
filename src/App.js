import React from 'react';
import { connect } from "react-redux";
import Search from './components/Search'
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
        <Route exact path="/Search" component={Search} />
        <Route  path="/" component={TableView} />
      </Switch>
      </Router>,
      {/* </PersistentDrawerRight> */}

    </ThemeProvider>
    )
  }
}
export default connect()(App);
