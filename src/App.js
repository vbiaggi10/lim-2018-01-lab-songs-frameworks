import React, { Component } from 'react';
import './App.css';
import Artists from './components/Artists';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    fetch("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${'BQA6Htuhtm3H3AKcJCzL6ltaQFT73js7T4beok8Y1QUlM9BgCPoCdjlL2a3LjoftpRJIraMyP8rpmP95fIqbONDRdidQlxB-JdCdxCMhOP5PQWbJaboYVlgOfB6038fzSV4hH1Fr6AzjfRei'}`
      }
    })
      .then(response => response.json())
      .then(({ beats }) => {
        console.log(beats)
      // beats.forEach((beat, index) => {
      //   console.log(`Beat ${index} starts at ${beat.start}`);
      // })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Ranking songs</h1>
        <Artists></Artists>
      </div>
    );
  }
}

export default App;
