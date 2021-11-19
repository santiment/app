import React from 'react'

import AbsoluteThreshold from '../AbsoluteThreshold/AbsoluteThreshold'
import LastPrice from '../../LastPrice/LastPrice'

import styles from './PercentThresholdByBorders.module.scss'

const PercentThresholdByBorders = ({
  isPriceMetric,
  percentThresholdLeft,
  percentThresholdRight,
  slugName,
  handleFormValueChange
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Moving up %</div>
          <AbsoluteThreshold
            type='number'
            prefix='%'
            placeholder='%'
            value={percentThresholdLeft}
            handleFormValueChange={handleFormValueChange(
              'percentThresholdLeft'
            )}
            className={styles.input}
          />
        </div>
        <span className={styles.divider}>or</span>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Moving down %</div>
          <AbsoluteThreshold
            type='number'
            prefix='%'
            placeholder='%'
            value={percentThresholdRight}
            handleFormValueChange={handleFormValueChange(
              'percentThresholdRight'
            )}
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

export default PercentThresholdByBorders
