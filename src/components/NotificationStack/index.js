import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Notification as NotificationItem } from '@santiment-network/ui'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as Actions from '../../actions/rootActions'
import styles from './NotificationStack.module.scss'

const notifyDuration = +styles.notifyduration

class NotificationStack extends Component {
  timerHandles = {}

  componentWillUnmount () {
    Object.keys(this.timerHandles).forEach(timerName => {
      if (this.timerHandles[timerName]) {
        clearTimeout(this.timerHandles[timerName])
      }
    })
  }

  componentDidUpdate ({ notifications }) {
    if (notifications.length < this.props.notifications.length) {
      const { id, dismissAfter } = this.props.notifications[
        this.props.notifications.length - 1
      ]

      this.timerHandles[id] = setTimeout(() => {
        this.closeNotification(id)
        this.timerHandles[id] = null
      }, dismissAfter)
    }
  }

  closeNotification = notificationId => {
    this.props.hideNotification(notificationId)
  }

  render () {
    const { notifications } = this.props

    return (
      <TransitionGroup className={styles.notificationStack}>
        {notifications.map(({ id, dismissAfter, ...notification }, i) => (
          <CSSTransition key={id} timeout={notifyDuration} classNames={styles}>
            <NotificationItem
              {...notification}
              className={styles.notification}
              onClose={() => this.closeNotification(id)}
              style={{
                '--y-offset': `calc(-${i}00% - ${i}0px)`
              }}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

const mapStateToProps = ({ notification }) => ({
  notifications: notification.notifications
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideNotification: Actions.hideNotification
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationStack)
