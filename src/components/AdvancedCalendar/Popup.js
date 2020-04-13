import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import Calendar from '../Calendar/Calendar'
import styles from './index.module.scss'

const options = [
  {
    index: 'all',
    label: 'All time'
  },
  {
    index: '1d',
    label: 'Last day'
  },
  {
    index: '1w',
    label: 'Last week'
  },
  {
    index: '1m',
    label: 'Last month'
  },
  {
    index: '3m',
    label: 'Last 3 months'
  },
  {
    index: '6m',
    label: 'Last 6 months'
  },
  {
    index: '1y',
    label: 'Last year'
  }
]

const Option = ({ className, ...props }) => (
  <Button
    {...props}
    variant='ghost'
    fluid
    className={cx(styles.btn, className)}
  />
)

const Popup = ({
  from,
  to,
  timeRange,
  onCalendarChange,
  onTimerangeChange,
  ...props
}) => {
  return (
    <ContextMenu
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
      {...props}
    >
      <Panel variant='modal' className={styles.wrapper}>
        <Calendar
          onChange={onCalendarChange}
          value={[from, to]}
          selectRange
          className={styles.calendar}
        />

        <div className={styles.right}>
          {options.map(({ index, label }) => (
            <Option
              key={index}
              isActive={timeRange === index}
              onClick={() => onTimerangeChange(index)}
            >
              {label}
            </Option>
          ))}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default Popup
