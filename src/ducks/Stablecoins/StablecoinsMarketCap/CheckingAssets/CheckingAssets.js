import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import {
  getTransformerKey,
  useTimeseries
} from '../../../Studio/timeseries/hooks'
import { Metric } from '../../../dataHub/metrics'
import styles from './CheckingAssets.module.scss'

const CHECKING_ASSETS = [
  {
    slug: 'tether',
    label: 'USDT',
    color: 'var(--jungle-green)'
  },
  {
    slug: 'binance-usd',
    label: 'BUSD',
    color: 'var(--persimmon)'
  },
  {
    slug: 'usd-coin',
    label: 'USDC',
    color: 'var(--texas-rose)'
  },
  {
    slug: 'trueusd',
    label: 'TUSD',
    color: 'var(--dodger-blue)'
  },
  {
    slug: 'gemini-dollar',
    label: 'GUSD',
    color: 'var(--lima-hover)'
  },
  {
    slug: '',
    label: 'Others',
    color: 'var(--waterloo)'
  }
]

const AssetButton = ({ children, loading }) => {
  return (
    <Button border loading={loading} className={styles.assetBtn}>
      {children}
    </Button>
  )
}

const METRICS = CHECKING_ASSETS.map(item => {
  return {
    ...item,
    key: Metric.marketcap_usd.key
  }
})

const METRIC_SETTINGS_MAP = new Map(
  METRICS.map(metric => {
    return [
      metric,
      {
        slug: metric.slug,
        market_segments: ['Stablecoin'],
        ignored_slugs: ['dai', 'sai'],
        interval: '12h'
      }
    ]
  })
)

const METRIC_TRANSFORMER = {}

METRICS.forEach(metric => {
  METRIC_TRANSFORMER[getTransformerKey(metric)] = v => {
    return v.map(item => ({
      datetime: item.datetime,
      [`marketcap_usd_${metric.slug}`]: item.marketcap_usd
    }))
  }
})

const CheckingAssets = ({ settings, disabledAssets, toggleDisabled }) => {
  console.log('CheckingAssets', settings)
  const [data, loadings, erros] = useTimeseries(
    METRICS,
    settings,
    METRIC_SETTINGS_MAP,
    METRIC_TRANSFORMER
  )

  console.log(data, erros)

  return (
    <div className={styles.container}>
      {CHECKING_ASSETS.map(({ label, slug, color }) => {
        return (
          <AssetButton loading={loadings}>
            <div className={cx(styles.btnInner, styles.icon)}>
              <svg
                width='14'
                height='10'
                viewBox='0 0 14 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5M11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5M11 5H13M3 5H1'
                  stroke={color}
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <div className={styles.divider} />

            <div className={styles.btnInner}>{label}</div>
          </AssetButton>
        )
      })}
    </div>
  )
}

export default CheckingAssets
