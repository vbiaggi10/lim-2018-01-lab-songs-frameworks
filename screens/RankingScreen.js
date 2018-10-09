import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import RankingSlider from '../components/RankingScreen/RankingSlider';
import Ranking from '../components/RankingScreen/Ranking';
import Data from '../data/artist.json';
// import { ExpoLinksView } from '@expo/samples';

export default class RankingScreen extends React.Component {
  static navigationOptions = {
    title: 'Ranking',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [], 
      isLoading: true
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
            this.setState({
              isLoading: false,
              data: data,
            }, () => { });
          })
        })
    });
  }

  ranking() {
    return this.state.data.map(artist =>{
      return (<Ranking name={artist.name} photo={artist.photo} key={artist.key} artistData={artist.artistData} />)
    })
  }

  // ranking() {
  //   return this.state.data.map(artist => {
  //     return (
  //       <View key={artist.key}>
  //         <Text>{artist.name}</Text>
  //         <Image style={{ width: 250, height: 250 }} source={{ uri: artist.photo }} />
  //       </View>
  //     )
  //   })
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        {/* {this.ranking()} */}
        <RankingSlider/>
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
