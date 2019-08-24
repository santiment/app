import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import { PROJECT_METRICS_BY_SLUG_QUERY } from './gql'
import { Metrics } from './utils'
import styles from './ChartMetricSelector.module.scss'

const NO_GROUP = '_'

const DEFAULT_CATEGORIES = {
  Financial: [
    {
      label: 'Price'
    }
  ]
}

const addItemToGraph = (categories, metricCategory, metrics) => {
  const category = categories[metricCategory]
  if (category) {
    category.push(...metrics)
  } else {
    categories[metricCategory] = metrics
  }
}

let memo = {}

const getCategoryGraph = availableMetrics => {
  if (availableMetrics.length === 0) {
    return {}
  }

  if (memo.lastInput === availableMetrics) {
    return memo.result
  }

  const categories = {}
  const { length } = availableMetrics

  for (let i = 0; i < length; i++) {
    const availableMetric = availableMetrics[i]
    const targetMetric = Metrics[availableMetric]

    if (!targetMetric) {
      continue
    }

    if (Array.isArray(targetMetric)) {
      const metricCategory = targetMetric[0].category
      addItemToGraph(categories, metricCategory, targetMetric)
      continue
    }

    const metricCategory = targetMetric.category
    const metric = { ...targetMetric, key: availableMetric }
    const metrics = [metric]

    if (metric.key === 'historyPrice') {
      metrics.push({ ...Metrics.volume, key: 'volume' })
    }

    addItemToGraph(categories, metricCategory, metrics)
  }

  Object.keys(categories).forEach(key => {
    categories[key] = categories[key].reduce((acc, metric) => {
      const { group = NO_GROUP } = metric
      addItemToGraph(acc, group, [metric])
      return acc
    }, {})
  })

  memo.lastInput = availableMetrics
  memo.result = categories

  return categories
}

const ActionBtn = ({ metric, children, isActive, isDisabled, ...props }) => {
  return (
    <Button
      variant='ghost'
      fluid
      className={styles.btn}
      classes={styles}
      isActive={isActive}
      disabled={isDisabled}
      {...props}
    >
      <div className={styles.btn__left}>
        {isDisabled ? (
          <span className={styles.btn_disabled}>no data</span>
        ) : (
          <ExplanationTooltip
            className={styles.btn__expl}
            text={isActive ? 'Remove metric' : 'Add metric'}
            offsetY={8}
          >
            <div
              className={cx(
                styles.btn__action,
                isActive ? styles.btn__action_remove : styles.btn__action_add
              )}
            >
              <Icon type={isActive ? 'close-small' : 'plus'} />
            </div>
          </ExplanationTooltip>
        )}{' '}
        {children}
      </div>
      {metric.description && (
        <Tooltip
          className={styles.explanation}
          trigger={<Icon type='info-round' className={styles.info} />}
        >
          <div className={styles.explanation__content}>
            <div className={styles.visible__scroll}>
              <h4 className={styles.title}>{metric.label}</h4>
              <p className={styles.text}>{metric.description}</p>
            </div>
          </div>
        </Tooltip>
      )}
    </Button>
  )
}

const countCategoryActiveMetrics = (activeMetrics = []) => {
  const counter = {}
  for (let i = 0; i < activeMetrics.length; i++) {
    const { category } = Metrics[activeMetrics[i]]
    counter[category] = (counter[category] || 0) + 1
  }
  return counter
}

const ChartMetricSelector = ({
  className = '',
  toggleMetric,
  activeMetrics,
  disabledMetrics,
  data: { project: { availableMetrics = [] } = {}, loading },
  ...props
}) => {
  const [activeCategory, setCategory] = useState('Financial')

  const categories = getCategoryGraph(availableMetrics)
  const categoryActiveMetricsCounter = countCategoryActiveMetrics(activeMetrics)

  useEffect(
    () => () => {
      memo = {}
    },
    []
  )

  return (
    <Panel {...props}>
      <Panel.Title className={styles.header}>
        <span>Select up to 5 metrics</span>
        <Button border>
          <Icon type='chart' fill='var(--casper)' /> Suggest metrics
        </Button>
      </Panel.Title>
      <Panel.Content className={cx(styles.wrapper, className)}>
        <div className={cx(styles.column, styles.categories)}>
          {Object.keys(categories).map(category => {
            const counter = categoryActiveMetricsCounter[category]
            return (
              <div key={category} className={styles.category}>
                <Button
                  onClick={() => setCategory(category)}
                  variant='ghost'
                  fluid
                  className={styles.btn}
                  isActive={category === activeCategory}
                  classes={styles}
                >
                  {category}
                  {counter > 0 ? ` (${counter})` : ''}
                  <Icon type='arrow-right' />
                </Button>
              </div>
            )
          })}
        </div>
        <div className={cx(styles.column, styles.metrics)}>
          <div className={styles.visible}>
            <div className={styles.visible__scroll}>
              {categories[activeCategory] &&
                Object.keys(categories[activeCategory]).map(group => (
                  <div key={group} className={styles.group}>
                    {group !== NO_GROUP && (
                      <h3 className={styles.group__title}>{group}</h3>
                    )}
                    {categories[activeCategory][group].map(metric => {
                      const isActive = activeMetrics.includes(metric.key)
                      const isDisabled = disabledMetrics.includes(metric.key)

                      return (
                        <ActionBtn
                          key={metric.label}
                          metric={metric}
                          onClick={() => toggleMetric(metric.key)}
                          isActive={isActive}
                          isDisabled={isDisabled}
                        >
                          {metric.label}
                        </ActionBtn>
                      )
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Panel.Content>
    </Panel>
  )
}

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})(ChartMetricSelector)
