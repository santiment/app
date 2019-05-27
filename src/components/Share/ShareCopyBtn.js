import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import { Button } from '@santiment-network/ui'
import styles from './SharePanel.module.scss'

class ShareCopyBtn extends PureComponent {
  static propTypes = {
    shareLink: PropTypes.string.isRequired
  }

  static defaultProps = {
    label: 'Copy link'
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
    const { label } = this.props
    return (
      <Button
        className={styles.link__btn}
        variant='flat'
        onClick={this.onCopyClick}
      >
        {this.state.notificationTimer ? 'Copied!' : label}
      </Button>
    )
  }
}

export default ShareCopyBtn
