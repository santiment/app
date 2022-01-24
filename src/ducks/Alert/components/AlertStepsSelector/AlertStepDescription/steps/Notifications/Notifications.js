import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import Icon from '@santiment-network/ui/Icon'
import AlertMessage from '../../../../../../../components/Alert/AlertMessage'
import { formatChannelsTitles } from '../../../../../utils'
import styles from './Notifications.module.scss'

const Notifications = ({
  description,
  status,
  invalidStepsMemo,
  isFinished,
  selected
}) => {
  const { values } = useFormikContext()
  const {
    isPublic,
    settings: { channel }
  } = values

  const isInvalid = invalidStepsMemo.has('notifications')

  useEffect(() => {
    if (channel.length > 0 && isInvalid) {
      invalidStepsMemo.delete('notifications')
    }
  }, [channel, isInvalid])

  let children = ''

  if (status !== 'finish' || channel.length === 0) {
    children = description || ''
  } else {
    const channels = formatChannelsTitles(channel)

    children = (
      <>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            {isPublic ? (
              <>
                <Icon type='eye' className={styles.icon} />
                Public alert
              </>
            ) : (
              <>
                <Icon type='eye-disabled' className={styles.icon} />
                Private alert
              </>
            )}
          </div>
          {channel.length > 0 && (
            <div className={styles.item}>{channels.join(', ')}</div>
          )}
        </div>
      </>
    )
  }

  return (
    <div className={styles.col}>
      {(selected || isFinished) && children}
      {isInvalid && (
        <AlertMessage
          className={styles.error}
          error
          text='Channel is required'
        />
      )}
    </div>
  )
}

export default Notifications
