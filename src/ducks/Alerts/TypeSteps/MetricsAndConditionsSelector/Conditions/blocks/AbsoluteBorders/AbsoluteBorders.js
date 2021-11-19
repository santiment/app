import React from 'react'

import AbsoluteThreshold from '../AbsoluteThreshold/AbsoluteThreshold'
import LastPrice from '../../LastPrice/LastPrice'

import styles from './AbsoluteBorders.module.scss'

const AbsoluteBorders = ({
  isPriceMetric,
  absoluteBorderRight,
  absoluteBorderLeft,
  slugName,
  handleFormValueChange
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Lower border</div>
          <AbsoluteThreshold
            type='number'
            step='any'
            prefix={isPriceMetric ? '$' : ''}
            max={+absoluteBorderRight}
            placeholder='0'
            value={absoluteBorderLeft}
            handleFormValueChange={handleFormValueChange('absoluteBorderLeft')}
            className={styles.input}
          />
        </div>
        <span className={styles.divider}>and</span>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Upper border</div>
          <AbsoluteThreshold
            type='number'
            prefix={isPriceMetric ? '$' : ''}
            min={+absoluteBorderLeft}
            step='any'
            placeholder='1'
            value={absoluteBorderRight}
            handleFormValueChange={handleFormValueChange('absoluteBorderRight')}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.lastPrice}>
        {isPriceMetric && <LastPrice slugTitle={slugName} />}
      </div>
    </div>
  )
}

export default AbsoluteBorders
