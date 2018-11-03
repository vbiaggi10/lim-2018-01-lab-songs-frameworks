import React from 'react';
import { Button, Icon, Left, Body, Right, Title, Container, Header, Content, List, ListItem, Text } from 'native-base';
import Songs from './Songs';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: this.props.artistName,
      getTracks: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({getTracks: this.props.getTracks})
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.changeStatus(true); this.setState({getTracks: []})}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.artistName}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {this.state.getTracks.map( track => {
              return(<Songs key={`track${track.name}`} name={track.name} likes={track.playcount}/>)
            })}
          </List>
        </Content>
      </Container>
    )
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