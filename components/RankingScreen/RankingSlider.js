import React, { Component } from 'react';
import Data from '../../data/artist.json';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';

const cards = [
  {
    text: 'Card One',
    name: 'One',
    phot: require('../../assets/images/ranking.png')
  },
  {
    text: 'Card Two',
    name: 'Two',
    photo: require('../../assets/images/ranking.png')
  },
  {
    text: 'Card Three',
    name: 'Three',
    photo: require('../../assets/images/ranking.png')
  }
];

export default class DeckSwiperAdvancedExample extends Component {
  state = {
    fontLoaded: false,
    data: []
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
              // artistData: artistData.track
            })
            this.setState({ data });
          })
        })
    });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    console.log(this.state.data);
    return (
      <Container>
        {
          this.state.fontLoaded ? (
            <View>
              <Header />
              <View>
                <DeckSwiper
                  ref={(c) => this._deckSwiper = c}
                  dataSource={this.state.data}
                  renderEmpty={() =>
                    <View style={{ alignSelf: "center" }}>
                      <Text>Over</Text>
                    </View>
                  }
                  renderItem={item =>
                    <Card style={{ elevation: 3 }}>
                      <CardItem>
                        <Left>
                          <Thumbnail source={item.photo} />
                          <Body>
                            <Text>{item.name}</Text>
                            <Text note>NativeBase</Text>
                          </Body>
                        </Left>
                      </CardItem>
                      <CardItem cardBody>
                        <Image style={{ height: 300, flex: 1 }} source={item.photo} />
                      </CardItem>
                      <CardItem>
                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                        <Text>{item.name}</Text>
                      </CardItem>
                    </Card>
                  }
                />
              </View>
              <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
                  <Icon name="arrow-back" />
                  <Text>Swipe Left</Text>
                </Button>
                <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
                  <Icon name="arrow-forward" />
                  <Text>Swipe Right</Text>
                </Button>
              </View></View>
          ) : null
        }
      </Container>
    );
  }
}