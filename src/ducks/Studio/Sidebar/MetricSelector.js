import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { NO_GROUP } from './utils'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import styles from './MetricSelector.module.scss'

const MetricButton = ({ className, metric, label, isActive, onClick }) => (
  <Button
    variant='ghost'
    className={cx(styles.btn, className)}
    onClick={onClick}
    isActive={isActive}
  >
    <div className={styles.btn__left}>
      <Icon
        type='plus'
        className={cx(styles.plus, isActive && styles.active)}
      />
      {label}
    </div>
    <MetricExplanation {...metric} position='right'>
      <Icon type='info-round' className={styles.info} />
    </MetricExplanation>
  </Button>
)

const Group = ({
  title,
  metrics,
  actives,
  advancedView,
  toggleMetric,
  toggleAdvancedView
}) => {
  return (
    <>
      {title !== NO_GROUP && <h4 className={styles.group}>{title}</h4>}
      {metrics.map(metric => {
        if (metric.hidden) {
          return null
        }

        return (
          <Fragment key={metric.key}>
            <MetricButton
              metric={metric}
              label={metric.label}
              isActive={actives.includes(metric)}
              onClick={() => toggleMetric(metric)}
            />
            {metric.advancedView && (
              <MetricButton
                className={styles.advanced}
                label={metric.advancedView}
                isActive={advancedView === metric.advancedView}
                onClick={() => toggleAdvancedView(metric.advancedView)}
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}

const Category = ({ title, groups, ...rest }) => {
  const [hidden, setHidden] = useState(false)

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <div className={cx(styles.category, hidden && styles.category_hidden)}>
      <h3 className={styles.title}>
        {title}
        <Icon
          type='arrow-up'
          className={styles.toggle}
          onClick={onToggleClick}
        />
      </h3>
      <div className={styles.metrics}>
        {Object.keys(groups).map(group => (
          <Group key={group} title={group} metrics={groups[group]} {...rest} />
        ))}
      </div>
    </div>
  )
}

const MetricSelector = ({
  loading,
  categories = {},
  activeMetrics,
  activeEvents,
  ...rest
}) => {
  const actives = activeMetrics.concat(activeEvents)
  return (
    <div className={styles.wrapper}>
      {Object.keys(categories).map(key => (
        <Category
          key={key}
          title={key}
          groups={categories[key]}
          actives={actives}
          {...rest}
        />
      ))}
    </div>
  )
}

export default MetricSelector
