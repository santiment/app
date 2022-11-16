import React, { PureComponent } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import { track } from 'webkit/analytics'
import { trackShareLinkCopy } from 'webkit/analytics/events/interaction'
import Button from '@santiment-network/ui/Button'
import { AlertsEvents } from '../../ducks/Alert/analytics'
import styles from './SharePanel.module.scss'

class ShareCopyBtn extends PureComponent {
  static propTypes = {
    shareLink: PropTypes.string.isRequired,
  }

  static defaultProps = {
    label: 'Copy link',
  }

  state = {
    notificationTimer: null,
  }

  componentWillUnmount() {
    clearTimeout(this.state.notificationTimer)
  }

  startNotification() {
    this.setState({
      notificationTimer: setTimeout(() => this.setState({ notificationTimer: null }), 1000),
    })
  }

  onCopyClick = () => {
    const { shareLink, feature, source } = this.props
    trackShareLinkCopy({ url: shareLink, feature, source })

    if (this.props.isAlert) {
      track.event(AlertsEvents.ClickCopyAlertLink)
    }

    copy(shareLink)
    this.startNotification()
  }

  render() {
    const { label, disabled } = this.props
    return (
      <Button
        className={cx(styles.link__btn, disabled && styles.link__btn_disabled)}
        variant='flat'
        disabled={disabled}
        onClick={this.onCopyClick}
      >
        {this.state.notificationTimer ? 'Copied!' : label}
      </Button>
    )
  }
}

export default ShareCopyBtn
