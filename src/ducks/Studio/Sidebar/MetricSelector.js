import React, { Fragment, useState, useEffect } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { NO_GROUP } from './utils'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import { Metrics } from '../../SANCharts/data'
import styles from './MetricSelector.module.scss'

const { price_usd } = Metrics

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isDisabled,
  onClick
}) => (
  <Button
    variant='ghost'
    className={cx(styles.btn, className, isDisabled && styles.btn_disabled)}
    isActive={isActive}
    onClick={onClick}
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
  toggleAdvancedView,
  toggleICOPrice,
  Timebound,
  options,
  isICOPriceDisabled
}) => {
  return (
    <>
      {title !== NO_GROUP && <h4 className={styles.group}>{title}</h4>}
      {metrics.map(metric => {
        if (metric.hidden) {
          return null
        }

        const timebounds = Timebound[metric.key]

        return (
          <Fragment key={metric.key}>
            <MetricButton
              metric={metric}
              label={metric.label}
              isActive={actives.includes(metric)}
              onClick={() => toggleMetric(metric)}
            />
            {/* TODO: refactor 'ICO Price', 'advancedView' and 'Timebounds' to be a submetric array [@vanguard | March 10, 2020] */}
            {isICOPriceDisabled ||
              (metric === price_usd && (
                <MetricButton
                  className={styles.advanced}
                  label='ICO Price'
                  isActive={options.isICOPriceActive}
                  isDisabled={!actives.includes(metric)}
                  onClick={toggleICOPrice}
                />
              ))}
            {metric.subMetrics &&
              metric.subMetrics.map(subMetric => {
                return (
                  <MetricButton
                    key={subMetric.label}
                    className={styles.advanced}
                    label={subMetric.label}
                    isActive={actives.includes(subMetric)}
                    onClick={() => toggleMetric(subMetric)}
                  />
                )
              })}
            {metric.advancedView && (
              <MetricButton
                className={styles.advanced}
                label={metric.advancedView}
                isActive={advancedView === metric.advancedView}
                onClick={() => toggleAdvancedView(metric.advancedView)}
              />
            )}
            {timebounds &&
              timebounds.map(timeboundMetric => (
                <MetricButton
                  key={timeboundMetric.key}
                  className={styles.advanced}
                  label={timeboundMetric.label}
                  isActive={actives.includes(timeboundMetric)}
                  onClick={() => toggleMetric(timeboundMetric)}
                />
              ))}
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
  const { options, setOptions } = rest
  const actives = activeMetrics.concat(activeEvents)

  useEffect(
    () => {
      if (options.isICOPriceActive && !activeMetrics.includes(price_usd)) {
        setOptions(state => ({ ...state, isICOPriceActive: false }))
      }
    },
    [activeMetrics]
  )

  function toggleICOPrice () {
    setOptions(state => ({
      ...state,
      isICOPriceActive: !state.isICOPriceActive
    }))
  }

  return (
    <div className={styles.wrapper}>
      {Object.keys(categories).map(key => (
        <Category
          key={key}
          title={key}
          groups={categories[key]}
          actives={actives}
          toggleICOPrice={toggleICOPrice}
          {...rest}
        />
      ))}
    </div>
  )
}

export default MetricSelector
