import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import Canvas from './Canvas'
import HoveredValue from '../Tooltip'
import { useTimeseries } from '../../../ducks/Studio/timeseries/hooks'
import styles from '../index.module.scss'

const Chart = ({ metrics, settingMap, settings, onLoad, ...props }) => {
  const [currentPoint, setCurrentPoint] = useState()
  const [data, loadings] = useTimeseries(metrics, settings, settingMap)

  useEffect(
    () => {
      if (loadings.length === 0) onLoad()
    },
    [loadings]
  )

  return loadings.length > 0 ? (
    <Loader className={styles.loader} />
  ) : (
    <>
      {currentPoint && <HoveredValue {...currentPoint} />}
      <Canvas
        {...props}
        settings={settings}
        data={data}
        metrics={metrics}
        setCurrentPoint={setCurrentPoint}
      />
    </>
  )
}

export default Chart
