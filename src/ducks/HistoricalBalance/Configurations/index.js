import React from 'react'
import cx from 'classnames'
import CreateAlert from './CreateAlert'
import DatePicker from './DatePicker'
import SettingsMenu from './SettingsMenu'
import styles from './index.module.scss'

const Configurations = ({
  children,
  chartAssets,
  priceAssets,
  settings,
  isLog,
  isPhone,
  togglePriceAsset,
  changeTimePeriod,
  setIsLog
}) => (
  <div className={styles.wrapper}>
    <div className={cx(styles.header, isPhone && styles.header_phone)}>
      <CreateAlert assets={chartAssets} address={settings.address} />
      <div className={styles.left}>
        <DatePicker
          settings={settings}
          isPhone={isPhone}
          changeTimePeriod={changeTimePeriod}
        />
        <SettingsMenu
          isLog={isLog}
          settings={settings}
          chartAssets={chartAssets}
          priceAssets={priceAssets}
          togglePriceAsset={togglePriceAsset}
          setIsLog={setIsLog}
        />
      </div>
    </div>
    {children}
  </div>
)

export default Configurations
