import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
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
  setMetricSettingMap,
  project
}) => {
  const hasGroup = title !== NO_GROUP
  const [hidden, setHidden] = useState(hasGroup)

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <>
      {hasGroup && (
        <h4 className={styles.group} onClick={onToggleClick}>
          {title}
          <Icon
            type='arrow-up'
            className={cx(styles.toggle, hidden && styles.toggle_active)}
          />
        </h4>
      )}
      <div
        className={cx(styles.group__list, hidden && styles.group__list_hidden)}
      >
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
                project={project}
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
                    project={project}
                  />
                ))}
              {metric.advancedView && (
                <MetricButton
                  className={styles.advanced}
                  label={metric.advancedView}
                  isActive={advancedView === metric.advancedView}
                  onClick={() => toggleAdvancedView(metric.advancedView)}
                  project={project}
                  metric={{
                    key: metric.anomalyKey
                  }}
                />
              )}
              {submetrics &&
                submetrics.map(submetric => (
                  <MetricButton
                    metric={submetric}
                    key={submetric.key}
                    className={styles.advanced}
                    label={submetric.label}
                    isActive={actives.includes(submetric)}
                    isError={ErrorMsg[submetric.key]}
                    onClick={() => toggleMetric(submetric)}
                    project={project}
                  />
                ))}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  isBeta: state.rootUi.isBetaModeEnabled
})

export default connect(mapStateToProps)(Group)
