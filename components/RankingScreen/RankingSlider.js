import React, { Component } from 'react';
import Data from '../../data/artist.json';
import TabBarIcon from '../TabBarIcon';
import Songs from './Songs';
import { Platform, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';

const cards = [
  {
    "key": "A0001",
    "name": "Red Hot Chili Peppers",
    "photo": require('../../assets/images/rhcp.png')
  },
  {
    "key": "A0002",
    "name": "Aerosmith",
    "photo": require('../../assets/images/aerosmith.png')
  },
  {
    "key": "A0003",
    "name": "Bon Jovi",
    "photo": require('../../assets/images/bonjovi.png')
  },
  {
    "key": "A0004",
    "name": "Ed Sheeran",
    "photo": require('../../assets/images/edsheeran.png')
  },
  {
    "key": "A0005",
    "name": "Bruno Mars",
    "photo": require('../../assets/images/brunomars.png')
  },
  {
    "key": "A0006",
    "name": "Nirvana",
    "photo": require('../../assets/images/nirvana.png')
  }
]

export default class DeckSwiperAdvancedExample extends Component {
  state = {
    fontLoaded: false,
    isLoading: true,
    dataSource: [],
  }

  componentDidMount() {
    let { dataSource } = this.state;
    cards.forEach(card => {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${card.name}&api_key=657cef2918119afec7337a5c8080f934&format=json`)
        .then((response) => response.json())
        .then((responseJson) => {
          Object.values(responseJson).forEach(artistData => {
            dataSource.push({
              artist: card.name,
              artistData: artistData.track
            })
            this.setState({
              isLoading: false,
              dataSource: dataSource,
            }, () => { });

          })
        })
        .catch((error) => {
          console.error(error);
        });
    })
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Container>
        {
          this.state.fontLoaded ? (
            <View>
              {/* <Header /> */}
              <View style={{ flexDirection: "row", left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
                  <Icon name="arrow-back" />
                  <Text>Swipe Left</Text>
                </Button>
                <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
                  <Icon name="arrow-forward" />
                  <Text>Swipe Right</Text>
                </Button>
              </View>
              <View>
                <DeckSwiper
                  ref={(c) => this._deckSwiper = c}
                  dataSource={cards}
                  renderEmpty={() =>
                    <View style={{ alignSelf: "center" }}>
                      <Text>Over</Text>
                    </View>
                  }
                  renderItem={item =>
                    <Card style={{ elevation: 3 }}>
                      <CardItem>
                        <Left>
                          <Body>
                            <Text>{item.name}</Text>
                          </Body>
                        </Left>
                      </CardItem>
                      <CardItem cardBody>
                        <Image style={{ height: 300, flex: 1 }} source={item.photo} />
                      </CardItem>
                      {this.rank(item.name)}
                    </Card>
                  }
                />
              </View>

            </View>
          ) : null
        }
      </Container>
    );
  }

  rank(name) {
    return this.state.dataSource.map(element => {
      if (element.artist === name) {
        return Object.values(element.artistData).map((asd, i) => {
          let likes = parseInt(asd.playcount)
          return (
            <Songs key={i} name={asd.name} likes={likes} updateInfo={this.updateInfo.bind(this)}></Songs>
          )
        })
      }
    })
  }

  updateInfo(name, countLikes) {
    // return this.state.dataSource.map(element => {
    //   if (element.artist === name) {
    //     const artists = Object.values(element.artistData);
    //     const newArtist = artists.map((artist, i) => {
    //       if (artist.name === name) {
    //         const indexUpdate = artists.indexOf(artist)
    //         delete artists[indexUpdate];
    //       }
    //       return artist;
    //     })
    //     return newArtist;
    //   }
    // })
    // const artists = this.state.artistData;
    // artists.map(artist => {
    //   if (artist.name === name) {
    //     const indexUpdate = artists.indexOf(artist)
    //     delete artists[indexUpdate];
    //   }
    //   return artist;
    // })
    // let { artistData } = this.state;
    // artistData.push({
    //   name: name,
    //   playcount: countLikes
    // })
    // this.setState({ artistData: artistData });
  }

  sortData = (data, orderDirection) => {
    let dataSorted = (data).sort(
      (x, y) => {
        if (orderDirection === 'DESC')
          return (y.playcount - x.playcount)
        else
          return (x.playcount - y.playcount)
      }
    );

    return dataSorted;
  }

  orderDir() {
    if (this.state.orderDir === 'ASC') {
      this.setState({ orderDir: 'DESC' });
    } else {
      this.setState({ orderDir: 'ASC' });
    }
  }
}
