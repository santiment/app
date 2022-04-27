import { Component } from 'react'
import PropTypes from 'prop-types'

class Timer extends Component {
  static propTypes = {
    interval: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
    syncRef: PropTypes.any,
  }

  static defaultProps = {
    syncRef: undefined,
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.forceUpdate(), this.props.interval)
  }

  componentDidUpdate({ syncRef }) {
    if (syncRef === this.props.syncRef) {
      return
    }

    clearInterval(this.intervalID)
    this.intervalID = setInterval(() => this.forceUpdate(), this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  render() {
    return this.props.children()
  }
}

export default Timer
