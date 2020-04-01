import React from 'react';
import { connect } from "react-redux";
import './App.css';

class App extends React.Component{
  render(){
    return(
      <div>
        <p>Hello</p>
      </div>
    )
  }
}
export default connect()(App);
