import React from 'react'
import cx from 'classnames'
import HistoricalBalanceChart from '../../../HistoricalBalance/Chart'
import { getValidInterval } from '../../../HistoricalBalance/utils'
import { useSettings, getWalletMetrics } from '../../../HistoricalBalance/hooks'
import CreateAlert from '../../../HistoricalBalance/Chart/CreateAlert'
import { Calendar } from '../../../HistoricalBalance/Chart/DatePicker'
import { toEndOfDay } from '../../../../utils/dates'
import styles from './UniswapHistoricalBalance.module.scss'

const WALLET_ASSETS = [
  {
    slug: 'uniswap'
  }
]
const PRICE_ASSETS = ['uniswap']
const METRICS = getWalletMetrics(WALLET_ASSETS, PRICE_ASSETS)

const ADDRESS = '0x090d4613473dee047c3f2706764f49e0821d256e'
const FROM = new Date('2020-09-16T00:00:00Z')
const TO = toEndOfDay(new Date())
const SETTINGS = {
  address: ADDRESS,
  interval: getValidInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString()
}

const UniswapHistoricalBalance = ({
  className,
  headerClassName,
  axesTicks,
  padding,
  height
}) => {
  const { settings, changeTimePeriod } = useSettings(SETTINGS)

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.header, headerClassName)}>
        <CreateAlert address={ADDRESS} assets={WALLET_ASSETS} />

        <Calendar
          className={styles.calendar}
          settings={settings}
          maxDate={TO}
          minDate={FROM}
          changeTimePeriod={changeTimePeriod}
        />
      </div>

      <HistoricalBalanceChart
        className={cx(styles.chart, className)}
        settings={settings}
        metrics={METRICS}
        axesTicks={axesTicks}
        padding={padding}
        height={height}
      />
    </div>
  )
}

UniswapHistoricalBalance.defaultProps = {
  axesTicks: {
    xTicks: 6,
    yTicks: 4
  },
  padding: {
    top: 10,
    right: 45,
    bottom: 23,
    left: 45
  }
}

export default UniswapHistoricalBalance
