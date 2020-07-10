import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Input from '@santiment-network/ui/Input'
import OperatorMenu from './operators/OperatorMenu'
import { Operator } from './operators/index'
import styles from './FilterMetric.module.scss'

const FilterMetric = ({ metric, filter = [], toggleMetric }) => {
  const metricFilters = filter.filter(item => item.metric === metric.key)
  const operators = metricFilters.map(({ operator }) => operator)
  const thresholds = metricFilters.map(({ threshold }) => threshold)
  const isShowTimeRange = false
  const isActive = !!metricFilters.length

  const { key, label } = metric

  //   function onInputChange ({ currentTarget: { value } }) {
  //     // setThreshold(value || 0)
  //
  //     if (isActive) {
  //       toggleMetric({ key, threshold: value, type: 'update' })
  //     }
  //   }

  function onFirstInputChange () {
    console.log('first')
  }

  function onSecondInputChange () {
    console.log('second')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Checkbox
          isActive={isActive}
          onClick={() => console.log('hello')}
          className={styles.checkbox}
        />
        <span className={styles.label}>{label}</span>
      </div>
      {isActive && (
        <div className={styles.settings}>
          <OperatorMenu
            operators={operators}
            onChangeOperator={data => console.log(data)}
          />
          <Input onBlur={onFirstInputChange} defaultValue={thresholds[0]} />
          {thresholds.length === 2 && (
            <>
              <span className={styles.preposition}>to</span>
              <Input
                onBlur={onSecondInputChange}
                defaultValue={thresholds[1]}
              />
            </>
          )}
          {/* {isShowTimeRange && <TimeRangeContextMenu timeRange={metricFilters[0].from} />} */}
        </div>
      )}
    </div>
  )
}

export default FilterMetric
