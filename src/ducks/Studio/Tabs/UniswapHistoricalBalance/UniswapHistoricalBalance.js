import React from 'react'
import cx from 'classnames'
import HistoricalBalanceChart from '../../../_HistoricalBalance/Chart'
import {
  useSettings,
  getValidInterval,
  getWalletMetrics,
} from '../../../_HistoricalBalance/hooks'
import CreateAlert from '../../../_HistoricalBalance/Configurations/CreateAlert'
import { Calendar } from '../../../_HistoricalBalance/Configurations/DatePicker'
import { toEndOfDay } from '../../../../utils/dates'
import styles from './UniswapHistoricalBalance.module.scss'

const WALLET_ASSETS = [
  {
    slug: 'uniswap',
  },
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
  to: TO.toISOString(),
}

const UniswapHistoricalBalance = ({
  className,
  headerClassName,
  xAxesTicks,
  yAxesTicks,
}) => {
  const { settings, changeTimePeriod } = useSettings(SETTINGS)

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.header, headerClassName)}>
        <CreateAlert address={ADDRESS} assets={WALLET_ASSETS}></CreateAlert>

        <Calendar
          className={styles.calendar}
          settings={settings}
          changeTimePeriod={changeTimePeriod}
        ></Calendar>
      </div>

      <HistoricalBalanceChart
        className={cx(styles.chart, className)}
        settings={settings}
        metrics={METRICS}
        yAxesTicks={yAxesTicks}
        xAxesTicks={xAxesTicks}
      ></HistoricalBalanceChart>
    </div>
  )
}

UniswapHistoricalBalance.defaultProps = {
  yAxesTicks: 4,
  xAxesTicks: 6,
}

export default UniswapHistoricalBalance
