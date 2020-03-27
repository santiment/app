import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import priceSvg from '../../../../../../assets/signals/price.svg'
import trendingWordsSvg from '../../../../../../assets/signals/trending_words.svg'
import daaSvg from '../../../../../../assets/signals/daa.svg'
import historicalBalanceSvg from '../../../../../../assets/signals/historical_balance.svg'
import { getNearestTypeByMetric } from '../../../../utils/utils'
import {
  DAILY_ACTIVE_ADDRESSES,
  ETH_WALLET,
  METRICS_OPTIONS,
  PRICE,
  TRENDING_WORDS
} from '../../../../utils/constants'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { Metric } from '../../../../../dataHub/metrics'
import MetricsList from './MetricsList'
import Search from './../../../../../Studio/Sidebar/Search'
import HelpTooltip from '../../../../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import styles from '../../signal/TriggerForm.module.scss'
import metricStyles from './TriggerFormMetricTypes.module.scss'

const checkPossibleTarget = ({ metaFormSettings, setFieldValue, target }) => {
  if (!target || (Array.isArray(target) && target.length === 0)) {
    setFieldValue('target', metaFormSettings.target.value)
  }
}

export const SIGNAL_SUPPORTED_METRICS = [
  Metric.social_volume_total,
  Metric.volume_usd,
  Metric.age_destroyed,
  Metric.exchange_balance,
  Metric.nvt
]

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

  const categories = getCategoryGraph(SIGNAL_SUPPORTED_METRICS, [])
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
              <div className={metricStyles.metricsTitle}>Choose alert type</div>
              <div className={metricStyles.metricsExplanation}>
                Pick one of the most popular metrics
              </div>
            </div>

            <div className={metricStyles.baseTypes}>
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

            <Search
              iconPosition='left'
              placeholder='Search for a Metric'
              toggleMetric={onSelectMetric}
              className={metricStyles.search}
              categories={categories}
            />

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
          <div className={metricStyles.type}>{label}</div>
          {!showLabel && (
            <HelpTooltip
              withDesc={false}
              position='bottom'
              align='end'
              onAction='hover'
              classes={styles}
            >
              {description}
            </HelpTooltip>
          )}
        </div>
        {showLabel && (
          <div className={metricStyles.label}>Change signal type</div>
        )}
      </div>
    </div>
  )
}
