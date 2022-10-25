import React, { useState, useEffect, useMemo } from 'react'
import { usdFormatter } from 'studio/metrics/formatters'
import Loader from '@santiment-network/ui/Loader/Loader'
import Canvas from './Canvas'
import HoveredValue from '../Tooltip'
import { useTimeseries } from '../../../ducks/Studio/timeseries/hooks'
import styles from '../index.module.scss'

const Chart = ({ metrics, settingMap, settings, priceTicker, onLoad, isCompact, ...props }) => {
  const [currentPoint, setCurrentPoint] = useState()
  const [data, loadings] = useTimeseries(metrics, settings, settingMap)
  const lastPrice = useMemo(() => {
    for (let i = data.length - 1; i > 0; i--) {
      const point = data[i]
      if (point.price_usd !== undefined) return point
    }
  }, [data])

  useEffect(() => {
    if (loadings.length === 0) onLoad()
  }, [loadings])

  return loadings.length > 0 ? (
    <Loader className={styles.loader} />
  ) : (
    <>
      {!isCompact && (
        <>
          {currentPoint && <HoveredValue {...currentPoint} />}

          <div className={'mrg-l mrg--l'}>
            <span className='c-green mrg-xs mrg--r'>
              {usdFormatter((currentPoint || lastPrice).price_usd)}
            </span>
            {priceTicker}/USD
          </div>
        </>
      )}
      <Canvas
        {...props}
        settings={settings}
        data={data}
        metrics={metrics}
        setCurrentPoint={setCurrentPoint}
        isCompact={isCompact}
      />
    </>
  )
}

export default Chart
