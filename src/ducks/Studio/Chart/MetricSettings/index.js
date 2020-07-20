import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'
import TopHoldersSetting from './TopHoldersSetting'
import ColorSetting from './ColorSetting'
import { MetricSettings } from '../../../dataHub/metrics/settings'

const SettingToComponent = {
  holdersCount: TopHoldersSetting
}

const Settings = ({ className, metric, ...props }) => {
  const settings = MetricSettings[metric.key]

  return (
    <div className={cx(styles.wrapper, className)}>
      {metric.label}:
      <ColorSetting metric={metric} />
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
