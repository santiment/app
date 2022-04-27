import { useEffect } from 'react'
import { useField } from 'formik'
import { getMetricByKey } from '../../Studio/metrics'
import { getConditionsStr, getDescriptionStr, parseOperation } from '../utils'
import { useAssets } from '../../../hooks/project'
import { useWatchlistAndScreener } from './useWatchlistAndScreener'
import { capitalizeStr } from '../../../utils/utils'
import {
  PERCENT_METRICS,
  USD_METRICS,
} from '../components/AlertModalContent/StepsContent/MetricAndConditions/constants'

export const useUpdateNameAndDescription = ({
  selectedType,
  selectedStep,
  values,
  hasSignal,
  isEdited,
}) => {
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false,
  })
  const [, , { setValue: setTitle }] = useField('title')
  const [, , { setValue: setDescription }] = useField('description')
  const { watchlist, isWatchlistLoading } = useWatchlistAndScreener({
    type: selectedType && selectedType.title,
    settings: values.settings,
    skip:
      !selectedType ||
      (selectedType.title !== 'Screener' &&
        selectedType.title !== 'Watchlist' &&
        selectedType.title !== 'Social trends'),
  })
  const stepsLength = selectedType ? selectedType.steps.length : 1
  const nameAndDescriptionIndex = stepsLength - 1
  const shouldUpdateNameAndDescription = !hasSignal || isEdited

  useEffect(() => {
    if (
      selectedStep !== nameAndDescriptionIndex &&
      shouldUpdateNameAndDescription &&
      selectedType
    ) {
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
              target: { slug },
            },
          } = values
          let assets = 'Asset'
          const hasSlug = slug && slug.length > 0 && !loading

          if (hasSlug) {
            if (typeof slug === 'string') {
              const found = projects.find((project) => project.slug === slug)
              assets = found ? found.name : ''
            } else {
              assets = slug
                .map((item) => projects.find((project) => project.slug === item).name)
                .join(', ')
            }
          }

          if (operation && metric && time_window && hasSlug) {
            const { selectedCount, selectedOperation } = parseOperation(operation)
            const selectedMetric = getMetricByKey(metric)
            const metricLabel = selectedMetric ? selectedMetric.label : 'metric'
            const hasPriceIcon = USD_METRICS.has(metric)
            const isPercentIcon = PERCENT_METRICS.has(metric)
            const conditionsStr = getConditionsStr({
              operation: selectedOperation,
              count: selectedCount,
              timeWindow: time_window,
              hasPriceIcon,
              isPercentIcon,
            })

            setTitle(
              `${assets || ''} ${metricLabel ? metricLabel.toLowerCase() : ''} ${
                conditionsStr || ''
              }`,
            )

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating,
              })

              setDescription(
                `Notify me when the ${metricLabel ? metricLabel.toLowerCase() : ''} of ${
                  assets || ''
                } ${conditionsStr || ''}. ${notificationsStr}`,
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
            settings: { channel, operation, metric, time_window },
          } = values
          let watchlistName = 'Watchlist'
          const hasWatchlist = watchlist && watchlist.name

          if (hasWatchlist) {
            watchlistName = watchlist.name
          }

          const { selectedCount, selectedOperation } = parseOperation(operation)
          const selectedMetric = getMetricByKey(metric)
          const metricLabel = selectedMetric ? selectedMetric.label : 'metric'
          const hasPriceIcon = USD_METRICS.has(metric)
          const isPercentIcon = PERCENT_METRICS.has(metric)
          const conditionsStr = getConditionsStr({
            operation: selectedOperation,
            count: selectedCount,
            timeWindow: time_window,
            hasPriceIcon,
            isPercentIcon,
          })

          if (operation && metric && time_window && hasWatchlist) {
            setTitle(
              `${capitalizeStr(watchlistName) || ''} ${
                metricLabel ? metricLabel.toLowerCase() : ''
              } ${conditionsStr || ''}`,
            )

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating,
              })

              setDescription(
                `Notify me when the ${metricLabel ? metricLabel.toLowerCase() : ''} of ${
                  watchlistName || ''
                } ${conditionsStr || ''}. ${notificationsStr}`,
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
            settings: { channel },
          } = values
          let screenerName = 'Screener'
          const hasScreener = watchlist && watchlist.name

          if (hasScreener) {
            screenerName = watchlist.name
          }
          if (hasScreener) {
            setTitle(`Project enters/exits ${capitalizeStr(screenerName) || ''}`)

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating,
              })

              setDescription(
                `Notify me when any project enters/exits ${screenerName}. ${notificationsStr}`,
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
              selector: { slug, infrastructure } = {
                slug: '',
                infrastructure: '',
              },
              target: { address } = { address: '' },
              operation,
              time_window,
            },
          } = values
          const currentProject = projects.find((project) => project.slug === slug)
          let slugTicker = 'Screener'
          const hasSlugTicker = currentProject && currentProject.ticker

          if (hasSlugTicker) {
            slugTicker = currentProject.ticker
          }

          if (hasSlugTicker && address && infrastructure) {
            const { selectedCount, selectedOperation } = parseOperation(operation)
            const conditionsStr = getConditionsStr({
              operation: selectedOperation,
              count: selectedCount,
              timeWindow: time_window,
            })

            setTitle(`${slugTicker} wallet ${address} ${conditionsStr || ''}`)

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating,
              })

              setDescription(
                `Notify me when the balance of ${slugTicker.toLowerCase()} wallet ${
                  address || ''
                } ${conditionsStr || ''}. ${notificationsStr}`,
              )
            }
          } else {
            setTitle('')
          }
          break
        }
        case 'Social trends': {
          const {
            cooldown,
            isRepeating,
            settings: {
              channel,
              target: { slug, word, watchlist_id },
            },
          } = values
          let assets = 'Asset'
          const noSlug = typeof slug === 'string' ? !slug : slug && slug.length === 0
          const noWord = typeof word === 'string' ? !word : word && word.length === 0

          let watchlistName = 'Watchlist'
          const hasWatchlist = watchlist_id && watchlist && watchlist.name

          if (hasWatchlist) {
            watchlistName = watchlist.name
          }

          if (!noSlug && slug && projects.length > 0) {
            assets =
              typeof slug === 'string'
                ? projects.find((project) => project.slug === slug).name
                : slug
                    .map((item) => projects.find((project) => project.slug === item).name)
                    .join(', ')
          }
          if (!noWord && word && projects.length > 0) {
            const projectItem = projects.find((project) => project.slug === word) || {
              slug: word,
            }
            assets =
              typeof word === 'string'
                ? projectItem.slug
                : word
                    .map(
                      (item) =>
                        (
                          projects.find((project) => project.slug === item) || {
                            slug: item,
                          }
                        ).slug,
                    )
                    .join(', ')
          }

          if ((!noWord && word) || (!noSlug && slug) || hasWatchlist) {
            if (!noSlug && slug) {
              setTitle(`${assets || ''} in trending assets/projects`)
            }
            if (!noWord && word) {
              setTitle(`${assets || ''} in trending words`)
            }
            if (hasWatchlist) {
              setTitle(`${watchlistName || ''} in trending`)
            }

            if (cooldown && channel.length > 0) {
              const notificationsStr = getDescriptionStr({
                cooldown,
                channels: channel,
                isRepeating,
              })

              if ((!noWord && word) || (!noSlug && slug)) {
                setDescription(
                  `Notify me when the ${assets} appears in social trends. ${notificationsStr}`,
                )
              }

              if (hasWatchlist) {
                setDescription(
                  `Notify me when the ${watchlistName} appears in social trends. ${notificationsStr}`,
                )
              }
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
  }, [values, loading, isWatchlistLoading])
}
