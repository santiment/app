import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import { Button } from '@santiment-network/ui'
import styles from './SharePanel.module.scss'

class ShareCopyBtn extends PureComponent {
  static propTypes = {
    shareLink: PropTypes.string.isRequired
  }

  state = {
    notificationTimer: null
  }

  componentWillUnmount () {
    clearTimeout(this.state.notificationTimer)
  }

  startNotification () {
    this.setState({
      notificationTimer: setTimeout(
        () => this.setState({ notificationTimer: null }),
        1000
      )
    })
  }

  onCopyClick = () => {
    copy(this.props.shareLink)
    this.startNotification()
  }

  render () {
    return (
      <Button
        className={styles.link__btn}
        variant='flat'
        onClick={this.onCopyClick}
        style={{ minWidth: 83 }}
      >
        {this.state.notificationTimer ? 'Copied!' : 'Copy link'}
      </Button>
    )
  }
}

export default ShareCopyBtn
