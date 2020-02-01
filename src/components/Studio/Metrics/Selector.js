import React, { useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { NO_GROUP } from './utils'
import styles from './Selector.module.scss'

const Group = ({ title, metrics, toggleMetric, activeMetrics }) => {
  return (
    <>
      {title !== NO_GROUP && <h4 className={styles.group}>{title}</h4>}
      {metrics.map(metric => (
        <>
          <Button
            className={styles.btn}
            variant='ghost'
            onClick={() => toggleMetric(metric)}
            isActive={activeMetrics.includes(metric)}
          >
            <Icon type='plus' className={styles.plus} />
            {metric.label}
          </Button>
          {metric.advancedData && (
            <Button
              className={cx(styles.btn, styles.advanced)}
              variant='ghost'
              onClick={() => toggleMetric(metric)}
              isActive={activeMetrics.includes(metric)}
            >
              <Icon type='plus' className={styles.plus} />
              {metric.advancedData}
            </Button>
          )}
        </>
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

const MetricSelector = ({ loading, categories, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      {Object.keys(categories).map(key => (
        <Category key={key} title={key} groups={categories[key]} {...rest} />
      ))}
    </div>
  )
}

export default MetricSelector
