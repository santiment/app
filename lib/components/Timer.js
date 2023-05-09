import { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {
    this.intervalID = setInterval(() => this.forceUpdate(), this.props.interval);
  }

  componentDidUpdate({
    syncRef
  }) {
    if (syncRef === this.props.syncRef) {
      return;
    }

    clearInterval(this.intervalID);
    this.intervalID = setInterval(() => this.forceUpdate(), this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return this.props.children();
  }

}

Timer.propTypes = {
  interval: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
  syncRef: PropTypes.any
};
Timer.defaultProps = {
  syncRef: undefined
};
export default Timer;