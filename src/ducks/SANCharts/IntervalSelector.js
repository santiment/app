import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { dateDifference, DAY } from '../../utils/dates'
import styles from './IntervalSelector.module.scss'

export const getNewInterval = (from, to, lastInterval) => {
  const intervals = getAvailableIntervals(from, to)

  if (intervals.includes(lastInterval)) {
    return lastInterval
  }

  return intervals[intervals.length - 1]
}

const getAvailableIntervals = (from, to) => {
  const { diff } = dateDifference({
    from: new Date(from),
    to: new Date(to),
    format: DAY
  })

  if (diff < 30) {
    // NOTE(vanguard): if interval is smaller then "1h" server responds with error
    return ['1h', '6h', '12h']
  } else if (diff < 60) {
    return ['12h', '1d', '2d']
  } else if (diff < 180) {
    return ['1d', '2d', '1w']
  } else if (diff < 360) {
    return ['2d', '1w', '2w']
  }

  return ['1w', '2w']
}

const IntervalSelector = ({ from, to, interval, onIntervalChange }) => {
  const options = getAvailableIntervals(from, to)

  return (
    <ContextMenu
      passOpenStateAs='isActive'
      position='bottom'
      trigger={
        <Button border className={styles.btn} classes={styles}>
          {interval}
          <Icon type='arrow-down' className={styles.icon} />
        </Button>
      }
    >
      <Panel className={styles.dd}>
        {options.map(option => (
          <Button
            key={option}
            variant='ghost'
            fluid
            isActive={interval === option}
            onClick={() => onIntervalChange(option)}
          >
            {option}
          </Button>
        ))}
      </Panel>
    </ContextMenu>
  )
}

export default IntervalSelector
