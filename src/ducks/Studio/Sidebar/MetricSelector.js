import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { NO_GROUP } from './utils'
import styles from './MetricSelector.module.scss'

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
      {metrics.map(metric => (
        <Fragment key={metric.key}>
          <Button
            className={styles.btn}
            variant='ghost'
            onClick={() => toggleMetric(metric)}
            isActive={actives.includes(metric)}
          >
            <Icon type='plus' className={styles.plus} />
            {metric.label}
          </Button>
          {metric.advancedView && (
            <Button
              className={cx(styles.btn, styles.advanced)}
              variant='ghost'
              onClick={() => toggleAdvancedView(metric.advancedView)}
              isActive={advancedView === metric.advancedView}
            >
              <Icon type='plus' className={styles.plus} />
              {metric.advancedView}
            </Button>
          )}
        </Fragment>
      ))}
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
