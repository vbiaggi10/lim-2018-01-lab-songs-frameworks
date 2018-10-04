import React, { Component } from 'react';
import './App.css';
import Artists from './components/Artists';
import Data from './data/artist.json';
import { Row } from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    let { data } = this.state;
    Data.forEach(artist => {
      fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=657cef2918119afec7337a5c8080f934&format=json`)
        .then(response => response.json())
        .then(artistsData => {
          Object.values(artistsData).forEach(artistData => {
            data.push({
              key: artist.key,
              name: artist.name,
              photo: artist.photo,
              artistData: artistData.track
            })
            this.setState({ data });
          })
        })
    });

  }

  render() {
    return (
      <Row className="App">
        <h1>Ranking songs</h1>
        {
          this.state.data.map(artist =>{
            return (<Artists name={artist.name} photo={artist.photo} key={artist.key} artistData={artist.artistData}></Artists>)
          })
          // Data.map(artist => {
          //   return (<Artists name={artist.name} photo={artist.photo} key={artist.key}></Artists>)
          // })
        }
      </Row>
    );
  }
}

export default App;
