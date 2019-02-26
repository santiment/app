import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Icon } from '@santiment-network/ui'
import styles from './Refresh.module.scss'

class Refresh extends Component {
  static propTypes = {
    timestamp: PropTypes.number,
    onRefreshClick: PropTypes.func
  }

  static defaultProps = {
    onRefreshClick: () => {},
    timestamp: undefined
  }

  static getDerivedStateFromProps ({ timestamp }) {
    return {
      timestamp,
      label: moment(timestamp).fromNow()
    }
  }

  componentDidMount () {
    const { timestamp } = this.props
    const momentTime = moment(timestamp)
    this.intervalID = setInterval(
      () => this.setState({ label: momentTime.fromNow() }),
      1000 * 60
    )
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  render () {
    const { label } = this.state
    const { onRefreshClick, timestamp } = this.props

    return (
      <div className={styles.refresh}>
        <Icon
          type='refresh'
          className={styles.refresh__icon}
          onClick={onRefreshClick}
        />
        {timestamp ? `Updated ${label}` : 'Data is not loaded'}
      </div>
    )
  }
}

export default Refresh
