import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { getNearestTypeByMetric } from '../../../../utils/utils'
import { METRICS_OPTIONS, TRENDING_WORDS } from '../../../../utils/constants'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { Metric } from '../../../../../dataHub/metrics'
import MetricsList from './MetricsList'
import Search from './../../../../../Studio/Sidebar/Search'
import HelpTooltip from '../../../../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import MetricIcons from './MetricIcons'
import styles from '../../signal/TriggerForm.module.scss'
import metricStyles from './TriggerFormMetricTypes.module.scss'

const checkPossibleTarget = ({ metaFormSettings, setFieldValue, target }) => {
  if (!target || (Array.isArray(target) && target.length === 0)) {
    setFieldValue('target', metaFormSettings.target.value)
  }
}

const makeSignalMetric = (key, label, category, node = 'line') => {
  return {
    key,
    label,
    category,
    node
  }
}

export const SIGNAL_SUPPORTED_METRICS = [
  Metric.social_volume_total,
  makeSignalMetric(
    'social_volume_discord',
    'Social volume (discord)',
    'Social'
  ),
  makeSignalMetric(
    'social_volume_professional_traders_chat',
    'Social volume (pro traders chat)',
    'Social'
  ),
  makeSignalMetric('social_volume_reddit', 'Social volume (reddit)', 'Social'),
  makeSignalMetric(
    'social_volume_telegram',
    'Social volume (telegram)',
    'Social'
  ),
  makeSignalMetric(
    'social_volume_twitter',
    'Social volume (twitter)',
    'Social'
  ),

  Metric.volume_usd,
  Metric.age_destroyed,
  Metric.exchange_balance,
  makeSignalMetric('price_btc', 'Price BTC', 'Financial'),
  Metric.marketcap_usd,

  makeSignalMetric(
    'community_messages_count_total',
    'Community messages count(total)',
    'Social'
  ),
  makeSignalMetric(
    'community_messages_count_telegram',
    'Community messages count(telegram)',
    'Social'
  ),
  // makeSignalMetric('community_messages_count_discord', 'Community messages count(discord)', 'Social'),

  makeSignalMetric(
    'social_dominance_total',
    'Social dominance (total)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_discord',
    'Social dominance (discord)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_professional_traders_chat',
    'Social dominance (pro traders chat)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_reddit',
    'Social dominance (reddit)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_telegram',
    'Social dominance (telegram)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_twitter',
    'Social dominance (twitter)',
    'Social'
  ),

  Metric.transaction_volume,
  makeSignalMetric('exchange_inflow', 'Exchange Inflow', 'On-chain', 'bar'),
  makeSignalMetric('exchange_outflow', 'Exchange Outflow', 'On-chain', 'bar'),
  Metric.dev_activity,
  makeSignalMetric('github_activity', 'Github Activity', 'Development')
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
              inputProps={{
                placeholder: 'Search for a Metric'
              }}
              toggleMetric={onSelectMetric}
              className={metricStyles.search}
              categories={categories}
            />

            <div className={metricStyles.metrics}>
              {categoriesKeys.map(key => (
                <MetricsList
                  key={key}
                  metrikKey={key}
                  list={categories[key]}
                  onSelect={onSelectMetric}
                />
              ))}
            </div>
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    </div>
  )
}

const MetricTypeRenderer = ({ metric = {}, onClick, showLabel = true }) => {
  const { label, description } = metric

  const [isHovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onClick(metric)}
      className={metricStyles.metric}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={metricStyles.iconBlock}>
        <MetricIcons metric={metric} isActive={isHovered} />
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
          <div className={metricStyles.label}>Change alert type</div>
        )}
      </div>
    </div>
  )
}
