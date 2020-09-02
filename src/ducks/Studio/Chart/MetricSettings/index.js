import React from 'react'
import cx from 'classnames'
import TopHoldersSetting from './TopHoldersSetting'
import ColorSetting from './ColorSetting'
import IntervalSetting from './IntervalSetting'
import ExchangeSetting from './ExchangeSetting'
import { MetricSettings } from '../../../dataHub/metrics/settings'
import styles from './index.module.scss'

const SettingToComponent = {
  holdersCount: TopHoldersSetting,
  exchange: ExchangeSetting
}

const Settings = ({ className, metric, ...props }) => {
  const settings = MetricSettings[metric.key]

  return (
    <div className={cx(styles.wrapper, className)}>
      {metric.label}:
      <ColorSetting metric={metric} />
      {metric.node !== 'autoWidthBar' && (
        <IntervalSetting metric={metric} {...props} />
      )}
      <ExchangeSetting metric={metric} {...props} />
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
