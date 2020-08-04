import React from 'react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Input from '@santiment-network/ui/Input'
import Tooltip from '@santiment-network/ui/Tooltip'
import { useDebounce } from '../../../../../../hooks'
import styles from './TimeRangeDropdown.module.scss'

const TimeRangeDropdown = ({ timeRange, timeRanges, withInput, onChange }) => {
  const onChangeDebounced = useDebounce(value => onChange(value), 500)

  return (
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
        {withInput && (
          <div className={styles.input__wrapper}>
            <Input
              className={styles.input}
              onChange={({ currentTarget: { value } }) => {
                const transformedValue = isNaN(parseInt(value))
                  ? `1d`
                  : `${parseInt(value)}d`
                onChangeDebounced(transformedValue)
              }}
            />
            <span className={styles.input__badge}>day(s)</span>
          </div>
        )}
      </Panel>
    </Tooltip>
  )
}

export default TimeRangeDropdown
