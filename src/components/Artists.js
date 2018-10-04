import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardTitle, Icon } from 'react-materialize';
import '../App.css';

class Artists extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    artistData: PropTypes.array.isRequired
  };
  render() {
    const { photo, name, artistData } = this.props;
    return (
      <Col s={6} className="container">
        <Card header={<CardTitle reveal image={photo} waves='light' />}
          title={name}
          reveal={
            artistData.map(element => {
              return (
                <Col s={12} className="artist">
                  <Col s={5}>{element.name}</Col>
                  <Col s={2}><Icon className="icon-up">thumb_up_alt</Icon></Col>
                  <Col s={2}><Icon className="icon-down">thumb_down_alt</Icon></Col>
                  <Col s={3}>{element.playcount}</Col>
                </Col>)
            })
          }>
        </Card>
      </Col>
    );
  }
}

export default Artists;
