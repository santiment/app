import { useEffect } from 'react'
import { useField } from 'formik'
import { getMetricByKey } from '../../Studio/metrics'
import { getConditionsStr, getDescriptionStr, parseOperation } from '../utils'
import { useAssets } from '../../../hooks/project'
import { useWatchlistAndScreener } from './useWatchlistAndScreener'
import { capitalizeStr } from '../../../utils/utils'

export const useUpdateNameAndDescription = ({
  selectedType,
  selectedStep,
  values
}) => {
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false
  })
  const [, , { setValue: setTitle }] = useField('title')
  const [, , { setValue: setDescription }] = useField('description')
  const watchlist = useWatchlistAndScreener({
    type: selectedType.title,
    settings: values.settings,
    skip:
      selectedType.title !== 'Screener' && selectedType.title !== 'Watchlist'
  })
  const stepsLength = selectedType.steps.length
  const nameAndDescriptionIndex = stepsLength - 1

  useEffect(() => {
    if (selectedStep !== nameAndDescriptionIndex || !selectedStep) {
      switch (selectedType.title) {
        case 'Asset': {
          const {
            cooldown,
            isRepeating,
            settings: {
              channel,
              operation,
              metric,
              time_window,
              target: { slug }
            }
          } = values
          let assets = 'Asset'
          const hasSlug = slug && slug.length > 0 && !loading

          if (hasSlug) {
            assets =
              typeof slug === 'string'
                ? projects.find(project => project.slug === slug).name
                : slug
                    .map(
                      item =>
                        projects.find(project => project.slug === item).name
                    )
                    .join(', ')
          }

          const { selectedCount, selectedOperation } = parseOperation(operation)
          const selectedMetric = getMetricByKey(metric)
          const metricLabel = selectedMetric ? selectedMetric.label : 'metric'
          const conditionsStr = getConditionsStr({
            operation: selectedOperation,
            count: selectedCount,
            timeWindow: time_window
          })

          if (operation && metric && time_window && hasSlug) {
            setTitle(
              `${assets || ''} ${
                metricLabel ? metricLabel.toLowerCase() : ''
              } ${conditionsStr || ''}`
            )

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating
              })

              setDescription(
                `Notify me when the ${
                  metricLabel ? metricLabel.toLowerCase() : ''
                } of ${assets || ''} ${conditionsStr ||
                  ''}. ${notificationsStr}`
              )
            }
          } else {
            setTitle('')
          }
          break
        }
        case 'Watchlist': {
          const {
            cooldown,
            isRepeating,
            settings: { channel, operation, metric, time_window }
          } = values
          let watchlistName = 'Watchlist'
          const hasWatchlist = watchlist && watchlist.name

          if (hasWatchlist) {
            watchlistName = watchlist.name
          }

          const { selectedCount, selectedOperation } = parseOperation(operation)
          const selectedMetric = getMetricByKey(metric)
          const metricLabel = selectedMetric ? selectedMetric.label : 'metric'
          const conditionsStr = getConditionsStr({
            operation: selectedOperation,
            count: selectedCount,
            timeWindow: time_window
          })

          if (operation && metric && time_window && hasWatchlist) {
            setTitle(
              `${capitalizeStr(watchlistName) || ''} ${
                metricLabel ? metricLabel.toLowerCase() : ''
              } ${conditionsStr || ''}`
            )

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating
              })

              setDescription(
                `Notify me when the ${
                  metricLabel ? metricLabel.toLowerCase() : ''
                } of ${watchlistName || ''} ${conditionsStr ||
                  ''}. ${notificationsStr}`
              )
            }
          } else {
            setTitle('')
          }
          break
        }
        case 'Screener': {
          const {
            cooldown,
            isRepeating,
            settings: { channel }
          } = values
          let screenerName = 'Screener'
          const hasScreener = watchlist && watchlist.name

          if (hasScreener) {
            screenerName = watchlist.name
          }
          if (hasScreener) {
            setTitle(
              `Project enters/exits ${capitalizeStr(screenerName) || ''}`
            )

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating
              })

              setDescription(
                `Notify me when any project enters/exits ${screenerName}. ${notificationsStr}`
              )
            }
          } else {
            setTitle('')
          }
          break
        }
        case 'Wallet address': {
          const {
            cooldown,
            isRepeating,
            settings: {
              channel,
              selector: { slug, infrastructure },
              target: { address },
              operation,
              time_window
            }
          } = values
          const currentProject = projects.find(project => project.slug === slug)
          let slugTicker = 'Screener'
          const hasSlugTicker = currentProject && currentProject.ticker

          if (hasSlugTicker) {
            slugTicker = currentProject.ticker
          }

          if (hasSlugTicker && address && infrastructure) {
            const { selectedCount, selectedOperation } = parseOperation(
              operation
            )
            const conditionsStr = getConditionsStr({
              operation: selectedOperation,
              count: selectedCount,
              timeWindow: time_window
            })

            setTitle(`${slugTicker} wallet ${address} ${conditionsStr || ''}`)

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating
              })

              setDescription(
                `Notify me when the balance of ${slugTicker.toLowerCase()} wallet ${address ||
                  ''} ${conditionsStr || ''}. ${notificationsStr}`
              )
            }
          } else {
            setTitle('')
          }
          break
        }
        default:
          break
      }
    }
  }, [values])
}

// KICK wallet 0x008024771614f4290696b63ba3dd3a1ceb34d4d9 historical balance down 10% compared to 1 day(s) earlier
// Notify me when the balance of kick wallet 0x008024771614f4290696b63ba3dd3a1ceb34d4d9 down 10% compared to 1 day(s) earlier. Send me notifications every 1 day(s) via telegram.
