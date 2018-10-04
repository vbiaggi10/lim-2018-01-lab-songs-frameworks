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

  sortData = (data, orderDirection) => {
    let dataSorted = (data).sort(
      (x, y) => {
        return (y.playcount - x.playcount)
        // let auxSort1;
        // let auxSort2;

        // auxSort1 = x.playcount;
        // auxSort2 = y.playcount;

        // const direccion = orderDirection === 'DESC' ? -1 : 1;
        // if (auxSort1 > auxSort2) {
        //   return 1 * direccion;
        // } else if (auxSort1 < auxSort2) {
        //   return -1 * direccion;
        // } else {
        //   return 0;
        // }
      }
    );

    return dataSorted;

  }

  render() {
    const { photo, name, artistData } = this.props;
    return (
      <Col s={4} className="container">
        <Card header={<CardTitle reveal image={photo} waves='light' />}
          title={name}
          reveal={
            this.sortData(artistData, 'DESC').map(element => {
              return (
                <CountLikes name={element.name} likes={element.playcount} />
              )
            })
          }>
        </Card>
      </Col>
    );
  }
}

export default Artists;
