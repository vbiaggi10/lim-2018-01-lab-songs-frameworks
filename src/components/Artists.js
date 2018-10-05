import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardTitle } from 'react-materialize';
import CountLikes from './CountLikes';
import '../App.css';

class Artists extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    artistData: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = {
      newData: [],
      orderDir: 'DESC'
    }
  }

  updateInfo(name, countLikes) {
    let { newData } = this.state;
    newData.push({
      name: name,
      countLikes: countLikes
    })
    this.setState({ newData: newData });
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

  paintArtist = (artistData) => {
    return (
      <div>
        <button onClick={this.orderDir.bind(this)}>sort</button>
        {artistData.map(element => {
          return (
            <CountLikes name={element.name} likes={element.playcount} updateInfo={this.updateInfo.bind(this)} />
          )
        })}
      </div>
    )
  }

  render() {
    let { photo, name, artistData } = this.props;
    artistData = this.sortData(artistData, this.state.orderDir);
    return (
      <Col s={4} className="container">
        <Card header={<CardTitle reveal image={photo} waves='light' />}
          title={name}
          reveal={this.paintArtist(artistData)}>
        </Card>
      </Col>
    );
  }
}

export default Artists;
