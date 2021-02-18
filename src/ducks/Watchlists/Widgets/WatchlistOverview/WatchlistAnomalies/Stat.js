import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Loader from '@santiment-network/ui/Loader/Loader'
import styles from './Stat.module.scss'

const Stat = ({ name, values = [], className, isLoading }) => (
  <div className={cx(styles.stat, className)}>
    <Label className={styles.statName}>{name}</Label>
    {values.map((value, idx) => (
      <Label
        key={idx}
        className={cx(styles.statValue, isLoading && styles.loading)}
      >
        {value}
        {isLoading && <Loader className={styles.loader} />}
      </Label>
    ))}
  </div>
)

export default Stat
