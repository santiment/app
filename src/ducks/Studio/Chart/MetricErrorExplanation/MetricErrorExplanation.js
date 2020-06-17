import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import styles from './MetricErrorExplanation.module.scss'

const MetricErrorExplanation = ({ errorsForMetrics, metric, project }) => {
  const { errors_timeseries_metrics } = errorsForMetrics || {}
  const metricError = errors_timeseries_metrics
    ? errors_timeseries_metrics.find(
      ({ metric: metricType }) => metricType === metric.key
    )
    : ''

  if (!metricError) {
    return null
  }

  const text = `Hi, there is a problem with metric '${metric.label}' for ${
    project.ticker
  }.`

  const { details } = metricError

  return (
    <Tooltip
      position='bottom'
      align='start'
      on='hover'
      closeTimeout={500}
      passOpenStateAs='isActive'
      trigger={<div className={styles.trigger}>No data?</div>}
    >
      <Panel padding className={styles.explanation}>
        <div>
          {[
            text,
            'If Intercom is not activated or exist, send a email to ',
            <Button
              as='a'
              key='link'
              className={styles.link}
              href='mailto:support@santiment.net'
            >
              support@santiment.net
            </Button>
          ]}
        </div>

        <Button
          border
          variant='flat'
          className={styles.reportBtn}
          onClick={() =>
            window.Intercom &&
            window.Intercom('showNewMessage', text + ' Error: ' + details[0])
          }
        >
          Report a problem
        </Button>
      </Panel>
    </Tooltip>
  )
}

export default MetricErrorExplanation
