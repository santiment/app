import React, { Component } from 'react'
import { Label } from '@santiment-network/ui'
import cx from 'classnames'
import { Metrics } from './utils'
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
      if (metrics.size === 1) {
        return
      }

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
    return (
      <div className={styles.metrics}>
        {Object.keys(Metrics).map(metric => {
          const { color, label } = Metrics[metric]
          return (
            <button
              data-metric={metric}
              className={cx(styles.btn, metrics.has(metric) && styles.active)}
              onClick={this.onClick}
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
