import React from 'react'
import CreateAlert from './CreateAlert'
import DatePicker from './DatePicker'
import SettingsMenu from './SettingsMenu'
import styles from './index.module.scss'

const Configurations = ({
  children,
  chartAssets,
  settings,
  isDesktop,
  changeTimePeriod,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CreateAlert
          assets={chartAssets}
          address={settings.address}
        ></CreateAlert>
        <DatePicker
          settings={settings}
          isDesktop={isDesktop}
          changeTimePeriod={changeTimePeriod}
        ></DatePicker>
        <SettingsMenu></SettingsMenu>
      </div>
      {children}
    </div>
  )
}

export default Configurations
