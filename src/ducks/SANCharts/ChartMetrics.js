import React, { Component } from 'react'
import Label from '@santiment-network/ui/Label'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import { PROJECT_METRICS_BY_SLUG_QUERY } from './gql'
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
    const { metrics = [] } = this.state
    const {
      disabledMetrics = [],
      data: { project: { availableMetrics = [] } = {} },
      showOnlyDefault
    } = this.props
    const listOfMetrics = this.props.listOfMetrics || Metrics

    let drawableMetrics = showOnlyDefault
      ? Array.from(metrics)
      : availableMetrics

    return (
      <div className={styles.metrics}>
        {drawableMetrics.map(metric => {
          const { color, label = metric } = listOfMetrics[metric] || {}
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

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  options: data => {
    const { slug } = data
    return { variables: { slug } }
  }
})(ChartMetrics)
