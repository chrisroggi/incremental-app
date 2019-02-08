import React from 'react';
import Cookies from 'universal-cookie';
import CountQuery from './CountQuery'
import Login from './Login'
import '../App.css';
import "antd/dist/antd.css";

class App extends React.Component {
  state = { content: null };

  componentDidMount() {
    this.setContent()
  }

  token = () => {
    const cookies = new Cookies();
    return cookies.get( 'token' );
  }

  setContent = () => {
    const token = this.token();

    if ( token ) {
      this.setState( { content: <CountQuery /> } );
    } else {
      this.setState( { content: <Login onLogin={ this.setContent } /> } );
    }
  }

  render() {
    return this.state.content;
  }
}

export default App;
