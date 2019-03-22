import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Notification as NotificationItem } from '@santiment-network/ui'
import SlideEntry from './../Animated/SlideEntry'
import styles from './Notification.module.scss'

class Notification extends Component {
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
    this.setState(
      {
        dissmisedNotification: [
          ...this.state.dissmisedNotification,
          notificationId
        ]
      },
      () => {
        setTimeout(() => {
          this.setState({
            notifications: this.state.notifications.filter(
              ({ key }) => key !== notificationId
            )
          })
        }, 300)
      }
    )
  }

  render () {
    const { notifications, dissmisedNotification } = this.state

    if (!notifications.length) {
      return null
    }

    return (
      <div className={styles.notificationStack}>
        {notifications.map(notification => (
          <SlideEntry
            key={notification.id}
            leaving={dissmisedNotification.includes(notification.id)}
          >
            <NotificationItem
              {...notification}
              className={styles.notification}
              onClose={() => this.closeNotification(notification.key)}
              solidFill
            />
          </SlideEntry>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
