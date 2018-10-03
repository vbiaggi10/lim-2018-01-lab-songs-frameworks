import React, { Component } from 'react';
import {Carousel} from 'react-materialize'
import '../App.css';

class Artists extends Component {
  render() {
    return (
      <div className="container">
        <Carousel images={[
          'https://lorempixel.com/250/250/nature/1',
          'https://lorempixel.com/250/250/nature/2',
          'https://lorempixel.com/250/250/nature/3',
          'https://lorempixel.com/250/250/nature/4',
          'https://lorempixel.com/250/250/nature/5'
        ]} />
      </div>
    );
  }
}

export default Artists;
