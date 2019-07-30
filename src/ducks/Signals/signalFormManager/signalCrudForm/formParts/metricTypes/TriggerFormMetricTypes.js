import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@santiment-network/ui/Dialog'
import priceSvg from '../../../../../../assets/signals/price.svg'
import unionSvg from '../../../../../../assets/signals/union.svg'
import { getNearestTypeByMetric } from '../../../../utils/utils'
import {
  DAILY_ACTIVE_ADDRESSES,
  METRICS_OPTIONS,
  PRICE,
  TRENDING_WORDS
} from '../../../../utils/constants'
import styles from '../../signal/TriggerForm.module.scss'
import metricStyles from './TriggerFormMetricTypes.module.scss'

const propTypes = {
  metric: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  metaFormSettings: PropTypes.any
}

const checkPossibleTarget = ({ metaFormSettings, setFieldValue, target }) => {
  if (!target || (Array.isArray(target) && target.length === 0)) {
    setFieldValue('target', metaFormSettings.target.value)
  }
}

export const TriggerFormMetricTypes = ({
  metric,
  target,
  setFieldValue,
  metaFormSettings
}) => {
  const defaultMetric = metaFormSettings.metric

  const [open, setOpen] = useState(false)

  const onSelectMetric = newMetric => {
    metric &&
      newMetric &&
      newMetric.value !== metric.value &&
      setFieldValue('type', getNearestTypeByMetric(newMetric))

    if (newMetric) {
      if (newMetric.value !== TRENDING_WORDS) {
        if (newMetric.value === DAILY_ACTIVE_ADDRESSES) {
          setFieldValue('target', [])
        } else {
          checkPossibleTarget({
            metaFormSettings,
            setFieldValue,
            target
          })
        }
      }
    } else {
      if (target) {
        setFieldValue('target', '')
      }
    }

    setFieldValue('metric', newMetric)

    setOpen(false)
  }

  return (
    <div className={styles.row}>
      <Dialog
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        classes={metricStyles}
        trigger={<MetricTypeRenderer metric={metric || defaultMetric.value} />}
      >
        <Dialog.ScrollContent>
          <div className={metricStyles.content}>
            <div className={metricStyles.metricsHeader}>
              <div className={metricStyles.metricsTitle}>
                Choose signal type
              </div>
              <div className={metricStyles.metricsExplanation}>
                Pick one of the metrics to track market activity
              </div>
            </div>
            {METRICS_OPTIONS.map(item => (
              <div className={metricStyles.listItem}>
                <MetricTypeRenderer
                  metric={item}
                  onClick={onSelectMetric}
                  showLabel={false}
                />
              </div>
            ))}
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    </div>
  )
}

const getIconByMetric = metric => {
  switch (metric) {
    case PRICE: {
      return priceSvg
    }
    case TRENDING_WORDS: {
      return unionSvg
    }
    default: {
      return priceSvg
    }
  }
}

const MetricTypeRenderer = ({
  values: { type } = {},
  metric = {},
  onClick,
  showLabel = true
}) => {
  const { label, value } = metric
  return (
    <div onClick={() => onClick(metric)} className={metricStyles.metric}>
      <div className={metricStyles.icon}>
        <img src={getIconByMetric(value)} alt='Metric' />
      </div>
      <div className={metricStyles.value}>{label}</div>
      {showLabel && (
        <div className={metricStyles.label}>Change signal type</div>
      )}
    </div>
  )
}

TriggerFormMetricTypes.propTypes = propTypes
