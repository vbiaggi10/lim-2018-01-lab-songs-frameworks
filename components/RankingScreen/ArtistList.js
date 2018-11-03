import React, { Component } from 'react';
import Songs from './Songs';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class DeckSwiperAdvancedExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Container>
        {
          this.state.fontLoaded ? (
            <Content>
              <List>
                {this.props.data.map(data => {
                  return(
                    <ListItem key={data.key} thumbnail>
                      <Left>
                        <Thumbnail square source={{ uri: data.photo }} />
                      </Left>
                      <Body>
                        <Text>{data.name}</Text>
                        <Text note numberOfLines={1}>{data.information}</Text>
                      </Body>
                      <Right>
                        <Button transparent data={data.artistData} onPress={() => {this.props.showArtistData(data.artistData, data.name); this.props.changeStatus(false);}}>
                          <Text>Canciones</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  )
                })}
              </List>
            </Content>
          ) : null
        }
      </Container>
    );
  }
}
