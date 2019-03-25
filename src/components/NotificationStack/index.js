import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Notification as NotificationItem } from '@santiment-network/ui'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './NotificationStack.module.scss'

const notifyDuration = +styles.notifyDuration

class NotificationStack extends Component {
  timerHandles = {}

  state = {
    notifications: []
  }

  static getDerivedStateFromProps ({ notification }, prevState) {
    return {
      notifications: notification
        ? [...prevState.notifications, notification]
        : []
    }
  }

  componentWillUnmount () {
    Object.keys(this.timerHandles).forEach(timerName => {
      if (this.timerHandles[timerName]) {
        clearTimeout(this.timerHandles[timerName])
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.notifications.length > prevState.notifications.length) {
      const { id, dismissAfter } = this.state.notifications[
        this.state.notifications.length - 1
      ]

      this.timerHandles[id] = setTimeout(() => {
        this.closeNotification(id)
        this.timerHandles[id] = null
      }, dismissAfter)
    }
  }

  closeNotification = notificationId => {
    this.setState(({ notifications }) => ({
      notifications: notifications.filter(({ id }) => id !== notificationId)
    }))
  }

  render () {
    const { notifications } = this.state

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

const mapStateToProps = ({ notification }) => ({ notification })

export default connect(mapStateToProps)(NotificationStack)
