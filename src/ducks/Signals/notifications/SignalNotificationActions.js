import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SignalNotificationActions.module.scss'
import RemoveSignalButton from '../../../components/SignalCard/controls/RemoveSignalButton'

const SignalNotificationActions = ({ id }) => {
  const [show, setShow] = useState(true)

  if (!show) {
    return null
  }

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={'/sonar/signal/' + id}>
        Open
      </Link>
      <RemoveSignalButton
        id={id}
        trigger={({ onClick }) => (
          <div
            onClick={() => {
              onClick()
              setShow(false)
            }}
            className={styles.undo}
          >
            Undo
          </div>
        )}
        withConfirm={false}
      />
    </div>
  )
}

export default SignalNotificationActions
