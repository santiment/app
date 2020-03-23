import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@santiment-network/ui/Dialog'
import priceSvg from '../../../../../../assets/signals/price.svg'
import trendingWordsSvg from '../../../../../../assets/signals/trending_words.svg'
import daaSvg from '../../../../../../assets/signals/daa.svg'
import historicalBalanceSvg from '../../../../../../assets/signals/historical_balance.svg'
import priceVolumeDiffSvg from '../../../../../../assets/signals/pvd.svg'
import { getNearestTypeByMetric } from '../../../../utils/utils'
import {
  DAILY_ACTIVE_ADDRESSES,
  ETH_WALLET,
  METRICS_OPTIONS,
  PRICE,
  PRICE_VOLUME_DIFFERENCE,
  TRENDING_WORDS
} from '../../../../utils/constants'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { Metric } from '../../../../../dataHub/metrics'
import MetricsList from './MetricsList'
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
        checkPossibleTarget({
          metaFormSettings,
          setFieldValue,
          target
        })
      }
    } else {
      if (target) {
        setFieldValue('target', '')
      }
    }

    setFieldValue('metric', newMetric)

    setOpen(false)
  }

  const categories = getCategoryGraph(Object.values(Metric), [])
  const categoriesKeys = Object.keys(categories)

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
              <div className={metricStyles.listItem} key={item.value}>
                <MetricTypeRenderer
                  metric={item}
                  onClick={onSelectMetric}
                  showLabel={false}
                />
              </div>
            ))}
          </div>

          <div className={metricStyles.choose}>
            <div className={metricStyles.chooseText}>
              or choose from the group of metrics
            </div>
            <div className={metricStyles.divider} />
          </div>

          <div className={metricStyles.metrics}>
            {categoriesKeys.map(key => {
              return (
                <MetricsList
                  key={key}
                  metrikKey={key}
                  list={categories[key]}
                  onSelect={onSelectMetric}
                />
              )
            })}
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    </div>
  )
}

const iconMaps = {
  [PRICE]: priceSvg,
  [TRENDING_WORDS]: trendingWordsSvg,
  [DAILY_ACTIVE_ADDRESSES]: daaSvg,
  [PRICE_VOLUME_DIFFERENCE]: priceVolumeDiffSvg,
  [ETH_WALLET]: historicalBalanceSvg
}

const MetricTypeRenderer = ({ metric = {}, onClick, showLabel = true }) => {
  const { label, value, description } = metric
  return (
    <div onClick={() => onClick(metric)} className={metricStyles.metric}>
      <div className={metricStyles.iconBlock}>
        <img
          className={metricStyles.icon}
          src={iconMaps[value] || priceSvg}
          alt='Metric'
        />
      </div>
      <div className={metricStyles.textBlocks}>
        <div className={metricStyles.texts}>
          <div className={metricStyles.metricType}>{label}</div>
          {!showLabel && (
            <div className={metricStyles.metricDescription}>{description}</div>
          )}
        </div>
        {showLabel && (
          <div className={metricStyles.label}>Change signal type</div>
        )}
      </div>
    </div>
  )
}

TriggerFormMetricTypes.propTypes = propTypes
