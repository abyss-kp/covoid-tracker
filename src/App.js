import React from 'react';
import { connect } from "react-redux";
import Search from './components/Search'
import PersistentDrawerRight from './components/drawer'
import Image from './img1.jpg'
import './App.css';
<<<<<<< Updated upstream

class App extends React.Component{
  render(){
    return(
      <div>
        <p>Hello</p>
      </div>
=======
import TableView from './components/TableView'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`
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
>>>>>>> Stashed changes
    )
  }
}
export default connect()(App);
