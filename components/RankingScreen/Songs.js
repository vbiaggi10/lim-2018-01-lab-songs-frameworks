import React, { Component } from 'react';
import TabBarIcon from '../TabBarIcon';
import { Platform, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';

export default class Songs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      likes: this.props.likes
    }
  }

  render() {
    return (
      <CardItem>
        <Text style={styles.containerTexts}>{this.state.name}</Text>
        <Button style={styles.containerIcons} iconLeft transparent onPress={() => this.like(this.state.likes)}>
          <TabBarIcon name={Platform.OS === 'ios' ? `ios-happy-outline` : 'md-happy'} />
        </Button>
        <Button style={styles.containerIcons} iconRight transparent onPress={() => this.dislike(this.state.likes)}>
          <TabBarIcon name={Platform.OS === 'ios' ? `ios-sad-outline` : 'md-sad'} />
        </Button>
        <Text style={styles.containerTexts}>{this.state.likes}</Text>
      </CardItem>
    )
  }

  like(likes) {
    likes = likes + 1;
    this.setState({ likes: likes });
    this.props.updateInfo(this.state.name, likes)
    return likes;
  }

  dislike(likes) {
    likes = likes - 1;
    this.setState({ likes: likes });
    this.props.updateInfo(this.state.name, likes)
    return likes;
  }
}

const styles = StyleSheet.create({
  containerTexts: {
    width: 200,
  },
  containerIcons: {
    width: 30,
    marginRight: 15,
    marginLeft: 15,
  },
});
