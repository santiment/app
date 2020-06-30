import React from 'react'
import { Query } from '@apollo/react-components'
import Loader from '@santiment-network/ui/Loader/Loader'
import { getTimeRangeForChart, skipHistoricalPreview } from '../../utils/utils'
import { HISTORICAL_TRIGGER_POINTS_QUERY } from '../../epics'
import SignalPreviewChart from './SignalPreviewChart'
import styles from './SignalPreview.module.scss'

export const PreviewLoader = (
  <div className={styles.loaderWrapper}>
    <Loader className={styles.loader} />
  </div>
)

export const getAvailableCooldown = baseCooldown => {
  if (
    baseCooldown &&
    (baseCooldown.indexOf('d') !== -1 || baseCooldown.indexOf('w') !== -1)
  ) {
    return '1d'
  }

  return baseCooldown && baseCooldown.indexOf('m') !== -1 ? '1h' : baseCooldown
}

const filterPoints = (points, { settings: { metric } = {} }) => {
  switch (metric) {
    case 'mvrv_usd_intraday': {
      const last = points[points.length - 1]

      if (last && last.current !== 0) {
        return points
      }

      return points.slice(0, points.length - 1)
    }
    default: {
      return points
    }
  }
}

const SignalPreview = ({
  type,
  trigger = {},
  showExpand = true,
  showTitle = true
}) => {
  const { settings: { target, asset } = {}, cooldown } = trigger

  if (!target && !asset) {
    return null
  }

  return (
    <Query
      query={HISTORICAL_TRIGGER_POINTS_QUERY}
      skip={skipHistoricalPreview(trigger)}
      variables={{
        cooldown: getAvailableCooldown(cooldown),
        settings: JSON.stringify(trigger.settings)
      }}
    >
      {({
        data: { historicalTriggerPoints: points = [], error, loading } = {}
      }) => {
        if (loading) {
          return PreviewLoader
        }

        const isError = error && (!points || points.length === 0)

        if (isError) {
          return (
            <div className={styles.loaderWrapper}>
              Something's gone wrong.
              <br />
              Backtesting chart is unavailable.
            </div>
          )
        }

        const { label, value: timeRange } = getTimeRangeForChart(type)

        return (
          <SignalPreviewChart
            type={type}
            label={label}
            timeRange={timeRange}
            points={filterPoints(points, trigger)}
            showExpand={showExpand}
            showTitle={showTitle}
            target={target}
            trigger={trigger}
          />
        )
      }}
    </Query>
  )
}

export default SignalPreview
