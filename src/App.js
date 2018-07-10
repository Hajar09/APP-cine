import React, { Component } from 'react';
import './App.css';
import AddFilm from "./components/AddFilm"
import ShowFilm from "./components/ShowFilm"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to my Movies API</h1>
        <AddFilm/>
        <ShowFilm/>
      </div>
    );
  }
}

export default App;
