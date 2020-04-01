import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { connect } from "react-redux";
import './App.css';
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <p>Added Material theme!</p>
      </div>
    </ThemeProvider>
    )
  }
}
export default connect()(App);
