import React from 'react'
import Template from './Template'
import { useHistoryStats } from './hooks'
import styles from './Widget.module.scss'

const VOLUME_LABEL = 'Volume'
const MARKETCAP_KEY = 'marketcapUsd'
const VOLUME_KEY = 'volumeUsd'

const Widget = ({ type, range, id, changeRange }) => {
  const { from, interval, value } = range
  const { loading, data, marketcap, volume, changeMarketcap, changeVolume } = useHistoryStats({
    variables: { id, from, interval },
    skip: !id,
  })

  return (
    <div className={styles.wrapper}>
      <Template
        loading={loading}
        data={data}
        change={changeMarketcap}
        label={`${type} marketcap`}
        metric={MARKETCAP_KEY}
        value={marketcap}
        period={value}
        changeRange={changeRange}
      />
      <Template
        loading={loading}
        data={data}
        change={changeVolume}
        label={VOLUME_LABEL}
        metric={VOLUME_KEY}
        value={volume}
        period={value}
        changeRange={changeRange}
      />
    </div>
  )
}

export default Widget
