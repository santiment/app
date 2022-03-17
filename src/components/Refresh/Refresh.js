import React, { useState, useEffect } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import Timer from '../Timer'
import { dateDifferenceInWords } from '../../utils/dates'
import { getSavedToggle, saveToggle } from '../../utils/localStorage'
import DarkTooltip from '../Tooltip/DarkTooltip'
import styles from './Refresh.module.scss'

const KEY = 'TABLE_REFRESH'
const INTERVAL = 1000 * 60

const Refresh = ({ onRefreshClick, timestamp, isLoading }) => {
  const options = { from: new Date(timestamp) }
  const [autoRefresh, setAutoRefresh] = useState(getSavedToggle(KEY))
  const [timer, setTimer] = useState(null)

  function toggleAutoRefreshState () {
    saveToggle(KEY, !autoRefresh)
    setAutoRefresh(!autoRefresh)
  }

  useEffect(() => {
    if (!autoRefresh) {
      clearInterval(timer)
      return
    }

    const id = setInterval(onRefreshClick, INTERVAL * 3)
    setTimer(id)
    return () => clearInterval(id)
  }, [autoRefresh, onRefreshClick])

  return (
    <div className={styles.wrapper}>
      <div onClick={onRefreshClick} className={styles.refresh}>
        <DarkTooltip
          position='top'
          align='center'
          on='hover'
          className={styles.deprecated__tooltip}
          trigger={<Icon type='refresh' className={styles.icon} />}
        >
          <Timer interval={INTERVAL} syncRef={timestamp}>
            {() =>
              isLoading
                ? 'Loading...'
                : timestamp
                ? `Updated ${dateDifferenceInWords(options)}`
                : ''
            }
          </Timer>
        </DarkTooltip>
      </div>
      <div className={styles.auto} onClick={toggleAutoRefreshState}>
        <Toggle isActive={autoRefresh} className={styles.toggle} />
        Auto refresh
      </div>
    </div>
  )
}

export default Refresh
