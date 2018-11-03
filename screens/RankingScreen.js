import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import ArtistList from '../components/RankingScreen/ArtistList';
import RankingList from '../components/RankingScreen/RankingList';
import Data from '../data/artist.json';

export default class RankingScreen extends React.Component {
  static navigationOptions = {
    title: 'Ranking',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [], 
      isLoading: true,
      statusRankingList: true,
      getTracks: [],
      artistName: ''
    }
  }

  componentDidMount() {
    const { data } = this.state;
    Data.forEach(artist => {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=657cef2918119afec7337a5c8080f934&format=json`)
        .then(response => response.json())
        .then(artistsData => {
          Object.values(artistsData).forEach(artistData => {
            data.push({
              key: artist.key,
              name: artist.name,
              photo: artist.photo,
              information: artist.information,
              artistData: artistData.track
            })
            this.setState({
              isLoading: false,
              data: data,
            }, () => { });
          })
        })
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    if(this.state.statusRankingList){
      return (
          <ArtistList data={this.state.data} changeStatus={this._changeStatus} showArtistData={this._showArtistData}/>
     
      );
    }else {
      return(
          <RankingList changeStatus={this._changeStatus} getTracks={this.state.getTracks} artistName={this.state.artistName}/>
      )
    }
  }

  _changeStatus = (status) => {
    this.setState({
      statusRankingList: status
    });
  }

  _showArtistData = (artistData, artistName) => {
    this.setState({
      getTracks: artistData,
      artistName: artistName
    });
  }
}
