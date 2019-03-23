import React, { Component } from 'react';
import './App.css';
import sample from './airport.mp4';
import Main from './pages/Main'



class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
      <div className='Center'><Main/></div>
      <video className='videoTag' autoPlay loop muted>
      <source src={sample} type='video/mp4' />
  </video></div></div>
    );
  }
}

export default App;
