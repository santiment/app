import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import PercentChanges from '../PercentChanges'
import styles from './PriceChangesWidget.module.scss'

const PriceChangesWidget = ({
  className,
  changes7d,
  changes24h,
  minPrice = '8 085.65',
  maxPrice = '8 085.65'
}) => (
  <section className={cx(styles.wrapper, className)}>
    <div className={styles.top}>
      <PercentChanges changes={changes24h} />
      <Label className={styles.period}>24h</Label>
    </div>
    <div className={styles.progress}>
      <span className={styles.line} />
      <span className={styles.min}>{minPrice}</span>
      <span className={styles.max}>{maxPrice}</span>
    </div>
  </section>
)

export default PriceChangesWidget
