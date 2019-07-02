import React from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { PROJECT_METRICS_BY_SLUG_QUERY } from './gql'
import { Metrics } from './utils'
import styles from './ChartMetricSelector.module.scss'

const getCategoryGraph = availableMetrics => {
  const categories = {}
  const { length } = availableMetrics

  for (let i = 0; i < length; i++) {
    const metric = Metrics[availableMetrics[i]]
    const metricCategory = metric.category
    if (!metricCategory) {
      continue
    }
    const cat = categories[metricCategory]
    if (cat) {
      cat.push(metric)
      continue
    }
    categories[metric.category] = [metric]
  }

  return categories
}

const initState = categories => {
  const keys = Object.keys(categories)
  if (!keys.length) {
    return
  }
  return keys[0]
}

const ChartMetricSelector = ({
  data: { project: { availableMetrics = [] } = {}, loading }
}) => {
  const categories = getCategoryGraph(availableMetrics)

  const [activeCategory, setCategory] = React.useState(initState(categories))
  const [activeMetric, setMetric] = React.useState(categories[activeCategory])

  if (loading) {
    return 'Loading...'
  }

  return (
    <Panel className={styles.wrapper}>
      <div className={cx(styles.column, styles.categories)}>
        {Object.keys(categories).map(category => (
          <div key={category} className={styles.category}>
            <Button
              onClick={() => setCategory(category)}
              variant='ghost'
              fluid
              className={styles.btn}
              isActive={category === activeCategory}
            >
              {category} <Icon type='arrow-right' />
            </Button>
          </div>
        ))}
      </div>
      <div className={cx(styles.column, styles.metrics)}>
        {categories[activeCategory] &&
          categories[activeCategory].map(metric => (
            <Button
              key={metric.label}
              variant='ghost'
              fluid
              className={styles.btn}
              onMouseEnter={() => setMetric(metric)}
            >
              {metric.label} <Icon type='plus-round' />
            </Button>
          ))}
      </div>
      <div className={cx(styles.column, styles.explanation)}>
        {activeMetric && (
          <>
            <h3 className={styles.title}>{activeMetric.label}</h3>
            <p className={styles.text}>{activeMetric.description}</p>
          </>
        )}
      </div>
    </Panel>
  )
}

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})(ChartMetricSelector)
