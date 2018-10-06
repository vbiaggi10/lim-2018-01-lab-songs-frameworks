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
      artistData: [],
      // newData: [],
      orderDir: 'DESC'
    }
  }

  componentDidMount() {
    let { artistData } = this.props;
    this.setState({ artistData: artistData })
  }

  updateInfo(name, countLikes) {
    const artists = this.state.artistData;
    artists.map(artist => {
      if (artist.name === name) {
        const indexUpdate = artists.indexOf(artist)
        delete artists[indexUpdate];
      }
      return artist;
    })
    let { artistData } = this.state;
    artistData.push({
      name: name,
      playcount: countLikes
    })
    this.setState({ artistData: artistData });
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
    // console.log(artistData);
    return (
      <div>
        {/* <button onClick={this.orderDir.bind(this)}>sort</button> */}
        {artistData.map(element => {
          const likes = parseInt(element.playcount)
          return (
            <CountLikes name={element.name} likes={likes} updateInfo={this.updateInfo.bind(this)} />
          )
        })}
      </div>
    )
  }

  render() {
    const { photo, name } = this.props;
    const sortedData = this.sortData(this.state.artistData, this.state.orderDir);
    return (
      <Col s={4} className="container">
        <Card header={<CardTitle reveal image={photo} waves='light' />}
          title={name}
          reveal={this.paintArtist(sortedData)}>
        </Card>
      </Col>
    );
  }
}

export default Artists;
