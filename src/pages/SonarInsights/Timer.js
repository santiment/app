import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Timer extends Component {
  static propTypes = {
    interval: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.intervalID = setInterval(() => this.forceUpdate(), this.props.interval)
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  render () {
    console.log('force updating timer')
    return this.props.children()
  }
}

export default Timer
