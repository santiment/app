import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Input from '@santiment-network/ui/Input'
import { Thresholds } from './filters'
import styles from './FilterMetric.module.scss'

const FilterMetric = ({ metric, isActive, toggleMetric }) => {
  const { key, label } = metric
  const threshold = Thresholds[key]
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Checkbox
          isActive={isActive}
          onClick={() => toggleMetric({ key, threshold: threshold || 100 })}
          className={styles.checkbox}
        />
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.settings}>
        <Button className={styles.operator} border>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='none'
          >
            <rect width='16' height='16' fill='#D6F6D6' rx='2' />
            <path
              fill='#26C953'
              fillRule='evenodd'
              d='M8.31 5.84a.4.4 0 00-.62 0l-2.37 2.9a.4.4 0 00.31.64h4.74a.4.4 0 00.31-.63L8.31 5.84z'
              clipRule='evenodd'
            />
          </svg>
        </Button>
        <Input defaultValue={threshold} />
      </div>
    </div>
  )
}

export default FilterMetric
