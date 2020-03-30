import React, { Fragment, useState, useEffect } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import { Metric } from '../../dataHub/metrics'
import { NO_GROUP } from '../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/MetricsList'
import styles from './MetricSelector.module.scss'

const { price_usd } = Metric

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isError,
  isDisabled,
  onClick
}) => (
  <Button
    variant='ghost'
    className={cx(
      styles.btn,
      className,
      (isError || isDisabled) && styles.btn_disabled
    )}
    isActive={isActive}
    onClick={onClick}
  >
    <div className={styles.btn__left}>
      {isError ? (
        <div className={styles.btn__error}>no data</div>
      ) : (
        <Icon
          type='plus'
          className={cx(styles.plus, isActive && styles.active)}
        />
      )}
      {label}
    </div>

    {metric && (
      <MetricExplanation metric={metric} position='right'>
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    )}
  </Button>
)

const Group = ({
  title,
  metrics,
  actives,
  advancedView,
  ErrorMsg,
  toggleMetric,
  toggleAdvancedView,
  toggleICOPrice,
  options,
  Submetrics,
  isICOPriceDisabled
}) => {
  return (
    <>
      {title !== NO_GROUP && <h4 className={styles.group}>{title}</h4>}
      {metrics.map(metric => {
        if (metric.hidden) {
          return null
        }

        const submetrics = Submetrics[metric.key]

        return (
          <Fragment key={metric.key}>
            <MetricButton
              metric={metric}
              label={metric.label}
              isError={ErrorMsg[metric.key]}
              isActive={actives.includes(metric)}
              onClick={() => toggleMetric(metric)}
            />
            {/* TODO: refactor 'ICO Price', 'advancedView' to be a submetric array [@vanguard | March 10, 2020] */}
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
            {metric.advancedView && (
              <MetricButton
                className={styles.advanced}
                label={metric.advancedView}
                isActive={advancedView === metric.advancedView}
                onClick={() => toggleAdvancedView(metric.advancedView)}
              />
            )}
            {submetrics &&
              submetrics.map(submetric => (
                <MetricButton
                  key={submetric.key}
                  className={styles.advanced}
                  label={submetric.label}
                  isActive={actives.includes(submetric)}
                  isError={ErrorMsg[submetric.key]}
                  onClick={() => toggleMetric(submetric)}
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
