import React from 'react'
import cx from 'classnames'
import { formatChannelsTitles } from '../../../utils'
import styles from './AlertStepDescription.module.scss'

const DESCRIPTION_TYPES = {
  TITLE: 'title',
  NOTIFICATIONS: 'notifications_settings'
}

function checkValueByType (values, type) {
  switch (type) {
    case 'Check name and description':
    case 'Name & Description':
      return {
        value: values.title,
        type: DESCRIPTION_TYPES.TITLE
      }
    case 'Set up Notifications and Privacy':
    case 'Notification & Privacy settings':
      return {
        value: {
          isPublic: values.isPublic,
          channels: values.settings.channel
        },
        type: DESCRIPTION_TYPES.NOTIFICATIONS
      }
    default:
      return {}
  }
}

const AlertStepDescription = ({ description, size, type, values, status }) => {
  const valueDescription = checkValueByType(values, type)

  if (!valueDescription.value) {
    return description || ''
  }

  if (size === 'small') {
    switch (valueDescription.type) {
      default:
        return ''
    }
  }

  switch (valueDescription.type) {
    case DESCRIPTION_TYPES.TITLE:
      return (
        <div className={cx(styles.wrapper, styles.rowWrapper)}>
          {valueDescription.value}
        </div>
      )
    case DESCRIPTION_TYPES.NOTIFICATIONS:
      if (status === 'finish') {
        const channelTitles = formatChannelsTitles(
          valueDescription.value.channels
        )

        return (
          <div className={styles.rowWrapper}>
            <div className={styles.wrapper}>
              {valueDescription.value.isPublic
                ? 'Public alert'
                : 'Private alert'}
            </div>
            {valueDescription.value.channels.length > 0 && (
              <div className={styles.wrapper}>
                Notify me on {channelTitles.join(', ')}
              </div>
            )}
          </div>
        )
      }
      return description || ''
    default:
      return ''
  }
}

export default AlertStepDescription
