import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'react-materialize';
import '../App.css';

class CountLikes extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired
  };
  constructor() {
    super();
    this.myRefUp = React.createRef();
    this.myRefDown = React.createRef();
    this.state = {
      countLikes: '',
      count: 0,
      newPlus: 0
    }
  }

  componentDidMount() {
    const { likes } = this.props;
    this.setState({ countLikes: likes })
  }

  countLikes(e) {
    this.setState({ count: this.state.count + 1 })
  }

  countDislikes(e) {
    const parseLikes = parseInt(this.state.countLikes);
    if (parseLikes > 0) {
      this.setState({ count: this.state.count - 1000 })
    } else {
      this.setState({ countLikes: 0 })
    }
    // this.setState({countLikes: parseLikes + this.state.count });

  }

  render() {
    const { name } = this.props;
    const parseLikes = parseInt(this.state.countLikes);
    // this.setState({countLikes: parseLikes + this.state.count });
    return (
      <Col s={12} className="artist" key={name}>
        <Col s={5}>{name}</Col>
        <Col s={2}><span onClick={this.countLikes.bind(this)}><Icon className="icon-up">thumb_up_alt</Icon></span></Col>
        <Col s={2}><span onClick={this.countDislikes.bind(this)}><Icon className="icon-down">thumb_down_alt</Icon></span></Col>
        <Col s={3}>{parseLikes + this.state.count}</Col>
      </Col>)
  }
}

export default CountLikes;
