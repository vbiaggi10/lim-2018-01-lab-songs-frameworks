import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RankingSlider from '../components/RankingScreen/RankingSlider';
import Data from '../data/artist.json';
// import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Ranking',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    let { data } = this.state;
    Data.forEach(artist => {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=657cef2918119afec7337a5c8080f934&format=json`)
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
      <ScrollView style={styles.container}>
        <RankingSlider data={this.state.data} />
        {/* <ExpoLinksView /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
