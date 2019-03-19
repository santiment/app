import React, { Component } from 'react'
import { Label } from '@santiment-network/ui'
import cx from 'classnames'
import { Metrics } from './utils'
import styles from './ChartMetrics.module.scss'

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
      <div>
        {Object.keys(Metrics).map(metric => {
          const { color, label } = Metrics[metric]
          return (
            <button
              data-metric={metric}
              className={cx(metrics.has(metric) && styles.active)}
              onClick={this.onClick}
            >
              <Label variant='circle' accent={color} />
              {label}
            </button>
          )
        })}
      </div>
    )
  }
}

export default ChartMetrics
