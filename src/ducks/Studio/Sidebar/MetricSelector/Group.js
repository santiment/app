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
  nodes,
  activeMetrics,
  advancedView,
  ErrorMsg,
  toggleMetric,
  toggleAdvancedView,
  toggleICOPrice,
  options,
  //Submetrics,
  isICOPriceDisabled,
  isBeta,
  setMetricSettingMap,
  project,
}) => {
  const hasGroup = title !== NO_GROUP
  const [hidden, setHidden] = useState(hasGroup)

  function onToggleClick() {
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
        {nodes.map(({ item, subitems }) => {
          if (item.hidden) {
            return null
          }

          if (item.isBeta && !isBeta) {
            return null
          }

          {
            /* const submetrics = Submetrics[metric.key] */
          }
          return (
            <Fragment key={item.key}>
              <MetricButton
                metric={item}
                label={item.label}
                onClick={() => toggleMetric(item)}
                setMetricSettingMap={setMetricSettingMap}
                project={project}
                isActive={activeMetrics.includes(item)}
              />
              {/* TODO: refactor 'ICO Price', 'advancedView' to be a submetric array [@vanguard | March 10, 2020] */}
              {/*
              {isICOPriceDisabled ||
                (item === price_usd && (
                  <MetricButton
                    className={styles.advanced}
                    label='ICO Price'
                    onClick={toggleICOPrice}
                    project={project}
                  />
                ))}
                  */}
              {/*
              {item.advancedView && (
                <MetricButton
                  className={styles.advanced}
                  label={item.advancedView}
                  onClick={() => toggleAdvancedView(item.advancedView)}
                  project={project}
                />
              )}
                */}
              {subitems &&
                subitems.map((subitem) => (
                  <MetricButton
                    metric={subitem}
                    key={subitem.key}
                    className={styles.advanced}
                    label={subitem.label}
                    onClick={() => toggleMetric(subitem)}
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

const mapStateToProps = (state) => ({
  isBeta: state.rootUi.isBetaModeEnabled,
})

export default connect(mapStateToProps)(Group)
