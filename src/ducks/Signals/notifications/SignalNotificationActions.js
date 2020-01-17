import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SignalNotificationActions.module.scss'

const SignalNotificationActions = ({ id }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={'/sonar/signal/' + id}>
        Open
      </Link>
      <div className={styles.link}>Undo</div>
    </div>
  )
}

export default SignalNotificationActions
