import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Notification as NotificationItem } from '@santiment-network/ui'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './NotificationStack.module.scss'

const notifyDuration = +styles.notifyDuration

class NotificationStack extends Component {
  state = {
    notifications: [],
    dissmisedNotification: []
  }

  componentWillReceiveProps ({ notification }) {
    if (notification) {
      this.setState(
        {
          notifications: [...this.state.notifications, notification]
        },
        () => {
          setTimeout(
            () => this.closeNotification(notification.key),
            notification.dismissAfter
          )
        }
      )
    } else {
      this.setState({
        notifications: []
      })
    }
  }

  closeNotification = notificationId => {
    this.setState(({ notifications }) => ({
      notifications: notifications.filter(({ id }) => id !== notificationId)
    }))
  }

  render () {
    const { notifications, dissmisedNotification } = this.state

    return (
      <TransitionGroup className={styles.notificationStack}>
        {notifications.map(({ id, dismissAfter, ...notification }, i) => (
          <CSSTransition key={id} timeout={notifyDuration} classNames={styles}>
            <NotificationItem
              {...notification}
              className={styles.notification}
              onClose={() => this.closeNotification(notification.key)}
              solidFill
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
