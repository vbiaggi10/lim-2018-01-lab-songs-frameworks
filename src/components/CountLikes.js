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
      countLikes: ''
    }
  }

  componentDidMount() {
    const { likes } = this.props;
    this.setState({ countLikes: likes })
  }

  countLikes(e) {
    const { name } = this.props;
    const parseLikes = parseInt(this.state.countLikes);
    this.setState({ countLikes: parseLikes + 1 })
    this.props.updateInfo(name, parseLikes)
  }

  countDislikes(e) {
    const { name } = this.props;
    const parseLikes = parseInt(this.state.countLikes);
    if (parseLikes >= 0) {
      this.setState({ countLikes: parseLikes - 1 });
    }else{
      this.setState({ countLikes: 0 });
    }
    this.props.updateInfo(name, parseLikes)
  }

  updateInfo(){
    const { name } = this.props;
    const parseLikes = parseInt(this.state.countLikes);
    this.props.updateInfo(name, parseLikes)
  }

  render() {
    const { name, likes } = this.props;
    const parseLikes = parseInt(this.state.countLikes);
    // this.updateInfo.bind(this)
    // this.setState({countLikes: parseLikes + this.state.count });
    return (
      <Col s={12} className="artist" key={name}>
        <Col s={5}>{name}</Col>
        <Col s={2}><span onClick={this.countLikes.bind(this)}><Icon className="icon-up">thumb_up_alt</Icon></span></Col>
        <Col s={2}><span onClick={this.countDislikes.bind(this)}><Icon className="icon-down">thumb_down_alt</Icon></span></Col>
        <Col s={3}>{likes}</Col>
      </Col>)
  }
}

export default CountLikes;
