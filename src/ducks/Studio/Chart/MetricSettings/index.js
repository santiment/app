import React from 'react'
import cx from 'classnames'
import TopHoldersSetting from './TopHoldersSetting'
import NodeSetting from './NodeSetting'
import ColorSetting from './ColorSetting'
import IntervalSetting from './IntervalSetting'
import ExchangeSetting from './ExchangeSetting'
import IndicatorsSetting from './IndicatorsSetting'
import { Metric } from '../../../dataHub/metrics'
import { MetricSettings } from '../../../dataHub/metrics/settings'
import { Node } from '../../../Chart/nodes'
import styles from './index.module.scss'

const SettingToComponent = {
  holdersCount: TopHoldersSetting
}

const isExchangeModifiable = metric =>
  metric === Metric.exchange_outflow || metric === Metric.exchange_inflow

const isIndicatorAssignable = metric =>
  !metric.indicator && metric !== Metric.dev_activity

const getSettings = ({ key, domainGroup }) => {
  return MetricSettings[key] || MetricSettings[domainGroup]
}

const Settings = ({ className, metric, ...props }) => {
  const settings = getSettings(metric)

  return (
    <div className={cx(styles.wrapper, className)}>
      {metric.label}:
      {metric.node !== Node.GREEN_RED_BAR && (
        <NodeSetting metric={metric} {...props} />
      )}
      <ColorSetting metric={metric} />
      {metric.node !== Node.AUTO_WIDTH_BAR && (
        <IntervalSetting metric={metric} {...props} />
      )}
      {isExchangeModifiable(metric) && (
        <ExchangeSetting metric={metric} {...props} />
      )}
      {isIndicatorAssignable(metric) && (
        <IndicatorsSetting metric={metric} {...props} />
      )}
      {settings &&
        settings.map(({ key }) => {
          const Setting = SettingToComponent[key]
          return Setting ? (
            <Setting key={key} metric={metric} {...props} />
          ) : null
        })}
    </div>
  )
}

export default Settings
