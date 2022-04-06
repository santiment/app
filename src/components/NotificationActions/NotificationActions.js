import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './NotificationActions.module.scss'

const UndoTrigger = ({ onClick, isOpenLink }) => (
  <div onClick={onClick} className={cx(styles.undo, isOpenLink && styles.margin)}>
    Undo
  </div>
)

const NotificationActions = ({
  id,
  link,
  isOpenLink = true,
  isDialog = true,
  undoTrigger: ElUndo,
  onClick,
}) => {
  const [show, setShow] = useState(true)

  const hide = () => setShow(false)

  if (!show) {
    return null
  }

  return (
    <div className={styles.container}>
      {isOpenLink && (
        <Link className={styles.link} to={link}>
          Open
        </Link>
      )}
      {isDialog && ElUndo ? (
        <ElUndo
          id={id}
          trigger={({ onClick }) => (
            <UndoTrigger
              isOpenLink={isOpenLink}
              onClick={() => {
                onClick()
                hide()
              }}
            />
          )}
          withConfirm={false}
        />
      ) : (
        <UndoTrigger
          isOpenLink={isOpenLink}
          onClick={() => {
            onClick()
            hide()
          }}
        />
      )}
    </div>
  )
}

export default NotificationActions
