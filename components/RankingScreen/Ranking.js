import React from 'react';
import { ScrollView, Image, Text, View } from 'react-native';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      photo: this.props.photo,
      artistData: this.props.artistData,
      isLoading: true
    }
  }

  songs() {
    return this.state.artistData.map((element, i) => {
      const likes = parseInt(element.playcount)
      return (
        <View key={i}>
          <Text>{element.name}</Text>
          <TabBarIcon
            name={Platform.OS === 'ios' ? `ios-happy-outline` : 'md-happy-outline'}
          />
          <TabBarIcon
            name={Platform.OS === 'ios' ? `ios-sad-outline` : 'md-sad-outline'}            
          />
          <Text>{likes}</Text>
        </View>
      )
    })
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>{this.state.name}</Text>
          <Image style={{ width: 250, height: 250 }} source={{ uri: this.state.photo }} />
          {this.songs()}
        </View>
      </ScrollView>
    )
  }
}