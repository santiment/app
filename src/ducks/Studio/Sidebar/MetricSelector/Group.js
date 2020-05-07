import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import MetricButton from './MetricButton'
import { NO_GROUP } from '../utils'
import { Metric } from '../../../dataHub/metrics'
import styles from './index.module.scss'

const { price_usd } = Metric

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
  isICOPriceDisabled,
  isBeta,
  setMetricSettingMap
}) => {
  return (
    <>
      {title !== NO_GROUP && <h4 className={styles.group}>{title}</h4>}
      {metrics.map(metric => {
        if (metric.hidden) {
          return null
        }

        if (metric.isBeta && !isBeta) {
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
              setMetricSettingMap={setMetricSettingMap}
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

const mapStateToProps = state => ({
  isBeta: state.rootUi.isBetaModeEnabled
})

export default connect(mapStateToProps)(Group)
