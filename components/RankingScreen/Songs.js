import React, { Component } from 'react';
import TabBarIcon from '../TabBarIcon';
import { Platform, StyleSheet } from 'react-native';
import { ListItem, Text, Button, Icon } from 'native-base';

export default class Songs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      likes: parseInt(this.props.likes)
    }
  }

  render() {
    return (
      <ListItem style={styles.list}>
        <Text style={styles.text1}>{this.state.name}</Text>
        <Button style={styles.containerIcons} iconLeft transparent onPress={() => this.like(this.state.likes)}>
          <Icon ios='ios-thumbs-up-outline' android='md-thumbs-up' style={{fontSize: 20, color: '#F3C66C'}} />
        </Button>
        <Button style={styles.containerIcons} iconRight transparent onPress={() => this.dislike(this.state.likes)}>
          <Icon ios='ios-thumbs-down-outline' android='md-thumbs-down'  style={{fontSize: 20, color: '#CBCAC9'}}/>
        </Button>
        <Text style={styles.text2}>{this.state.likes}</Text>
      </ListItem>
    )
  }

  like(likes) {
    likes = likes + 1;
    this.setState({ likes: likes });
    return likes;
  }

  dislike(likes) {
    likes = likes - 1;
    this.setState({ likes: likes });
    return likes;
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    justifyContent: 'space-between'
  },
  containerIcons: {
    flex: 1,
    flexDirection: 'row'
  },
  text1:{
    fontSize: 12,
    flex: 2,
    flexDirection: 'row'
  },
  text2: {
    fontSize: 12,
    flex: 1,
    flexDirection: 'row'
  }
});
