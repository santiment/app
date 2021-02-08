import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { Metric } from '../../../../../../dataHub/metrics'
import MetricExplanation from '../../../../../../SANCharts/MetricExplanation'
import styles from './Column.module.scss'

const EMPTY_OBJ = {}

const Column = ({ onColumnToggle, column, isActive, className, draggable }) => {
  const [active, setActive] = useState(isActive)
  const { key, descriptionKey = key, label } = column
  const metricForDescription = Metric[descriptionKey] || EMPTY_OBJ

  const onClick = () => {
    setActive(!active)
    onColumnToggle(key, !active)
  }

  return (
    <div className={cx(styles.column, className)}>
      <div className={styles.clickableZone} onClick={onClick}>
        {draggable && (
          <svg
            className={styles.draggable}
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='12'
            viewBox='0 0 16 12'
          >
            <path
              fillRule='evenodd'
              d='M0 .5zC0 .22.23 0 .5 0h15a.5.5 0 110 1H.5A.5.5 0 010 .5zM0 6c0-.28.23-.5.5-.5h15a.5.5 0 110 1H.5A.5.5 0 010 6zm.5 5a.5.5 0 000 1H15.5a.5.5 0 100-1H.5z'
              clipRule='evenodd'
            />
          </svg>
        )}
        <Checkbox className={styles.checkbox} isActive={active} />
        <span className={styles.name}>{label}</span>
      </div>
      <MetricExplanation
        on='click'
        metric={metricForDescription}
        position='bottom'
        align='center'
      >
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    </div>
  )
}

export default Column
