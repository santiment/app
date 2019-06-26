import React from 'react'
import { Panel } from '@santiment-network/ui'
import Label from '@santiment-network/ui/Label'
import { generateWidgetData } from './totalMarketcapWidgetUtils'
import ListInfoWidgetItem from './ListInfoWidgetItem'
import styles from './ListInfoWidget.module.scss'

const ListInfoWidget = ({
  historyPrice,
  type,
  assetsAmount,
  exchangesAmount,
  top3 = [],
  ...rest
}) => {
  const {
    marketcapPrice,
    volumePrice,
    chartStats,
    volumeChanges,
    marketcapChanges
  } = generateWidgetData(historyPrice)

  return (
    <Panel className={styles.wrapper}>
      <div className={styles.top}>
        <ListInfoWidgetItem
          stats={chartStats}
          change={marketcapChanges}
          label={`${type} marketcap`}
          metric='marketcap'
          value={marketcapPrice}
          {...rest}
        />
        <ListInfoWidgetItem
          stats={chartStats}
          change={volumeChanges}
          label='Volume'
          metric='volume'
          value={volumePrice}
          {...rest}
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles.stat}>
          <Label className={styles.statName}>Assets:</Label>
          <Label className={styles.statValue}>{assetsAmount}</Label>
        </div>
        {exchangesAmount && (
          <div className={styles.stat}>
            <Label className={styles.statName}>Exchanges:</Label>
            <Label className={styles.statValue}>{exchangesAmount}</Label>
          </div>
        )}
        <div className={styles.stat}>
          <Label className={styles.statName}>Dominance:</Label>
          {top3.map(({ ticker, marketcapUsd }) => (
            <Label className={styles.statValue} key={ticker}>
              {ticker} {((marketcapUsd * 100) / marketcapPrice).toFixed(2)}%
            </Label>
          ))}
        </div>
      </div>
    </Panel>
  )
}

export default ListInfoWidget
