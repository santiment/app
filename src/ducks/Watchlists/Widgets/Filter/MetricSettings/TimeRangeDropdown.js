import React from 'react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './TimeRangeDropdown.module.scss'

const TimeRangeDropdown = ({ timeRange, timeRanges, onChange }) => (
  <Tooltip
    on='click'
    trigger={
      <Button className={styles.trigger} border variant='flat'>
        {timeRange}
      </Button>
    }
    position='bottom'
    align='end'
    className={styles.tooltip}
  >
    <Panel className={styles.panel}>
      {timeRanges.map(item => (
        <Button
          key={item.type}
          variant='ghost'
          fluid
          className={styles.button}
          onClick={() => onChange(item.type)}
        >
          {item.label}
        </Button>
      ))}
    </Panel>
  </Tooltip>
)

export default TimeRangeDropdown
