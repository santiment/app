import React, { Component } from 'react'
import Label from '@santiment-network/ui/Label'
import cx from 'classnames'
import { CHART_METRICS } from './utils'
import styles from './ChartPage.module.scss'

class ChartMetrics extends Component {
  state = {
    metrics: new Set(this.props.defaultActiveMetrics)
  }

  onClick = ({ currentTarget }) => {
    const { metrics } = this.state
    const { onMetricsChange } = this.props
    const { metric } = currentTarget.dataset

    if (metrics.has(metric)) {
      metrics.delete(metric)
      this.setState({ metrics: new Set([...metrics]) }, () =>
        onMetricsChange([...this.state.metrics])
      )
      return
    }

    this.setState(
      {
        metrics: new Set([...metrics, metric])
      },
      () => onMetricsChange([...this.state.metrics])
    )
  }

  render () {
    const { metrics } = this.state
    const { disabledMetrics = [] } = this.props
    const listOfMetrics = this.props.listOfMetrics || CHART_METRICS
    return (
      <div className={styles.metrics}>
        {Object.keys(listOfMetrics).map(metric => {
          const { color, label } = listOfMetrics[metric]
          return (
            <button
              key={label}
              type='button'
              data-metric={metric}
              className={cx(styles.btn, metrics.has(metric) && styles.active)}
              onClick={this.onClick}
              disabled={disabledMetrics.includes(metric)}
            >
              <Label variant='circle' accent={color} className={styles.label} />
              {label}
            </button>
          )
        })}
      </div>
    )
  }
}

export default ChartMetrics
