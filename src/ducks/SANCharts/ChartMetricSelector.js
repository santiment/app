import React from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { PROJECT_METRICS_BY_SLUG_QUERY } from './gql'
import { Metrics } from './utils'
import styles from './ChartMetricSelector.module.scss'

const DEFAULT_CATEGORIES = {
  Financial: [
    {
      label: 'Price'
    }
  ]
}

const getCategoryGraph = availableMetrics => {
  const categories = {}
  const { length } = availableMetrics

  for (let i = 0; i < length; i++) {
    const availableMetric = availableMetrics[i]

    if (availableMetric === 'nvtRatio') {
      const data = [
        {
          ...Metrics.nvtRatioCirculation,
          key: 'nvtRatioCirculation'
        },
        {
          ...Metrics.nvtRatioTxVolume,
          key: 'nvtRatioTxVolume'
        }
      ]
      if (categories['On-chain']) {
        categories['On-chain'].push(...data)
      } else {
        categories['On-chain'] = data
      }
    }

    const metric = { ...Metrics[availableMetric], key: availableMetric }
    const metricCategory = metric.category
    if (!metricCategory) {
      continue
    }
    const category = categories[metricCategory]
    if (category) {
      category.push(metric)
      continue
    }

    const metrics = [metric]
    if (metric.key === 'historyPrice') {
      metrics.push({ ...Metrics.volume, key: 'volume' })
    }

    categories[metricCategory] = metrics
  }

  return categories
}

const ChartMetricSelector = ({
  className = '',
  toggleMetric,
  activeMetrics,
  disabledMetrics,
  data: { project: { availableMetrics = [] } = {}, loading }
}) => {
  const categories = getCategoryGraph(availableMetrics)

  const [activeCategory, setCategory] = React.useState('Financial')
  const [activeMetric, setMetric] = React.useState(
    DEFAULT_CATEGORIES.Financial[0]
  )

  return (
    <>
      <h4 className={styles.constraint}>Select up to 5 metrics</h4>
      <Panel className={cx(styles.wrapper, className)}>
        <div className={cx(styles.column, styles.categories)}>
          {Object.keys(categories).map(category => (
            <div key={category} className={styles.category}>
              <Button
                onClick={() => setCategory(category)}
                variant='ghost'
                fluid
                className={styles.btn}
                isActive={category === activeCategory}
                classes={styles}
              >
                {category} <Icon type='arrow-right' />
              </Button>
            </div>
          ))}
        </div>
        <div className={cx(styles.column, styles.metrics)}>
          <div className={styles.visible}>
            <div className={styles.visible__scroll}>
              {categories[activeCategory] &&
                categories[activeCategory].map(metric => {
                  const isActive = activeMetrics.includes(metric.key)
                  return (
                    <Button
                      key={metric.label}
                      variant='ghost'
                      fluid
                      className={styles.btn}
                      classes={styles}
                      onMouseEnter={() => setMetric(metric)}
                      onClick={() => toggleMetric(metric.key)}
                      isActive={isActive}
                      disabled={disabledMetrics.includes(metric.key)}
                    >
                      {metric.label}{' '}
                      <Icon type={isActive ? 'subtract-round' : 'plus-round'} />
                    </Button>
                  )
                })}
            </div>
          </div>
        </div>
        <div className={cx(styles.column, styles.explanation)}>
          <div className={styles.visible}>
            {activeMetric && (
              <div className={styles.visible__scroll}>
                <h3 className={styles.title}>{activeMetric.label}</h3>
                <p className={styles.text}>{activeMetric.description}</p>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </>
  )
}

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})(ChartMetricSelector)
