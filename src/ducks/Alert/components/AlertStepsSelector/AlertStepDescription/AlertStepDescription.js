import React from 'react'
import cx from 'classnames'
import { ProjectIcon } from '../../../../../components/ProjectIcon/ProjectIcon'
import { getMetric } from '../../../../Studio/Sidebar/utils'
import { useAssets } from '../../../../../hooks/project'
import { useWatchlistAndScreener } from '../../../hooks/useWatchlistAndScreener'
import {
  clipText,
  formatChannelsTitles,
  getDescriptionStr,
  getTitleStr
} from '../../../utils'
import styles from './AlertStepDescription.module.scss'

const DESCRIPTION_TYPES = {
  TITLE: 'title',
  NOTIFICATIONS: 'notifications_settings',
  METRICS_AND_CONDITIONS: 'metrics_and_conditions',
  ASSETS: 'assets',
  WATCHLISTS: 'watchlists',
  SCREENERS: 'screeners'
}

function checkValueByType (values, type) {
  switch (type) {
    case 'Check name and description':
    case 'Name & Description':
      return {
        value: {
          channels: values.settings.channel,
          cooldown: values.cooldown,
          slug: values.settings.target && values.settings.target.slug,
          metric: values.settings.metric,
          operation: values.settings.operation,
          timeWindow: values.settings.time_window,
          isRepeating: values.isRepeating
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
    case 'Select Asset':
    case 'Asset':
      return {
        value: values.settings.target && values.settings.target.slug,
        type: DESCRIPTION_TYPES.ASSETS
      }
    case 'Select Watchlist':
    case 'Watchlist':
      return {
        value: values.settings.target && values.settings.target.watchlist_id,
        type: DESCRIPTION_TYPES.WATCHLISTS
      }
    case 'Select Screener':
    case 'Screener':
      return {
        value:
          values.settings.operation.selector &&
          values.settings.operation.selector.watchlist_id,
        type: DESCRIPTION_TYPES.SCREENERS
      }
    default:
      return {}
  }
}

const AlertStepDescription = ({
  description,
  size,
  type,
  values,
  status,
  selectedType
}) => {
  const valueDescription = checkValueByType(values, type)
  const [projects] = useAssets({
    shouldSkipLoggedInState: false
  })
  const watchlist = useWatchlistAndScreener({
    type: selectedType.title,
    settings: values.settings,
    skip:
      selectedType.title !== 'Screener' && selectedType.title !== 'Watchlist'
  })

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
        channels,
        isRepeating
      } = valueDescription.value

      if (operation && metric && channels.length > 0) {
        let descriptionStr = getDescriptionStr({
          cooldown,
          channels,
          isRepeating
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
                {clipText(restCondition, 50)}
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
    case DESCRIPTION_TYPES.ASSETS: {
      const { value: slug } = valueDescription

      const shouldRenderTicker = slug.length > 1

      if (slug.length === 0) {
        return description || ''
      }

      const assets =
        typeof slug === 'string'
          ? projects.find(project => project.slug === slug)
          : slug.map(item => projects.find(project => project.slug === item))

      let children = ''

      if (typeof slug !== 'string') {
        children = (
          <>
            {assets.slice(0, 2).map(asset => (
              <div key={asset.id} className={styles.assetWrapper}>
                <ProjectIcon
                  size={16}
                  slug={asset.slug}
                  logoUrl={asset.logoUrl}
                />
                <div className={styles.assetTitle}>
                  {shouldRenderTicker ? asset.ticker : asset.name}
                </div>
              </div>
            ))}
            {assets.length > 2 && (
              <div className={styles.assetWrapper}>
                <div className={styles.assetTitle}>+ {assets.length - 2}</div>
              </div>
            )}
          </>
        )
      }

      if (typeof slug === 'string') {
        children = (
          <div className={styles.assetWrapper}>
            <ProjectIcon
              size={16}
              slug={assets.slug}
              logoUrl={assets.logoUrl}
            />
            <div className={styles.assetTitle}>{assets.name}</div>
          </div>
        )
      }

      return (
        <div
          className={cx(
            styles.rowWrapper,
            size === 'small' && styles.smallAsset
          )}
        >
          {children}
        </div>
      )
    }
    case DESCRIPTION_TYPES.WATCHLISTS: {
      const { value: watchlistId } = valueDescription

      if (!watchlistId) {
        return description || ''
      }

      return (
        <div
          className={cx(
            styles.rowWrapper,
            size === 'small' && styles.smallAsset
          )}
        >
          <div className={styles.assetWrapper}>
            <div className={styles.assetTitle}>
              {watchlist && watchlist.name}
            </div>
          </div>
        </div>
      )
    }
    default:
      return ''
  }
}

export default AlertStepDescription
