import React from 'react'
import cx from 'classnames'
import { getMetric } from '../../../../Studio/Sidebar/utils'
import {
  formatChannelsTitles,
  getDescriptionStr,
  getTitleStr
} from '../../../utils'
import styles from './AlertStepDescription.module.scss'

const DESCRIPTION_TYPES = {
  TITLE: 'title',
  NOTIFICATIONS: 'notifications_settings',
  METRICS_AND_CONDITIONS: 'metrics_and_conditions'
}

function checkValueByType (values, type) {
  switch (type) {
    case 'Check name and description':
    case 'Name & Description':
      return {
        value: {
          channels: values.settings.channel,
          cooldown: values.cooldown,
          slug: values.settings.target.slug,
          metric: values.settings.metric,
          operation: values.settings.operation,
          timeWindow: values.settings.time_window
        },
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
    case 'Choose Metric and Conditions':
    case 'Metric & Conditions':
      return {
        value: {
          metric: values.settings.metric,
          operation: values.settings.operation,
          timeWindow: values.settings.time_window
        },
        type: DESCRIPTION_TYPES.METRICS_AND_CONDITIONS
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

  switch (valueDescription.type) {
    case DESCRIPTION_TYPES.TITLE: {
      if (size === 'small') {
        return ''
      }

      const {
        operation,
        timeWindow,
        metric,
        slug,
        cooldown,
        channels
      } = valueDescription.value

      if (operation && metric) {
        let descriptionStr = getDescriptionStr({
          cooldown,
          channels
        })

        if (metric && operation && timeWindow) {
          descriptionStr = `Notify me when ${getTitleStr({
            slug,
            metric,
            operation,
            timeWindow
          })}. ${descriptionStr}`
        }

        return (
          <div
            className={cx(
              styles.wrapper,
              styles.rowWrapper,
              styles.expandableHeight
            )}
          >
            {descriptionStr}
          </div>
        )
      }

      return description || ''
    }
    case DESCRIPTION_TYPES.NOTIFICATIONS: {
      if (size === 'small') {
        return ''
      }

      const { channels, isPublic } = valueDescription.value

      if (status === 'finish') {
        const channelTitles = formatChannelsTitles(channels)

        return (
          <div className={styles.rowWrapper}>
            <div className={styles.wrapper}>
              {isPublic ? 'Public alert' : 'Private alert'}
            </div>
            {channels.length > 0 && (
              <div className={styles.wrapper}>
                Notify me on {channelTitles.join(', ')}
              </div>
            )}
          </div>
        )
      }
      return description || ''
    }
    case DESCRIPTION_TYPES.METRICS_AND_CONDITIONS: {
      const { operation, timeWindow, metric } = valueDescription.value

      if (metric && operation && timeWindow) {
        if (size === 'small') {
          const conditionStr = getTitleStr({
            slug: '',
            metric,
            operation,
            timeWindow,
            onlyCondition: true
          })
          const selectedMetric = getMetric(metric)
          const conditionType = conditionStr.split(' ')[0]
          const restCondition = conditionStr.replace(conditionType, '')

          return (
            <div className={styles.smallCol}>
              <div className={styles.metric}>
                {(selectedMetric && selectedMetric.label) || 'Metric'}
              </div>
              <div className={styles.condition}>
                <span className={styles.conditionType}>{conditionType}</span>
                {restCondition}
              </div>
            </div>
          )
        }

        const titleStr = getTitleStr({
          slug: '',
          metric,
          operation,
          timeWindow
        })

        return (
          <div
            className={cx(
              styles.wrapper,
              styles.rowWrapper,
              styles.expandableHeight
            )}
          >
            {titleStr}
          </div>
        )
      }

      return description || ''
    }
    default:
      return ''
  }
}

export default AlertStepDescription
