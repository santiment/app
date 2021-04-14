import React from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './index.module.scss'

const Item = ({ name, ticker, isActive, onClick, isDisabled }) => {
  return (
    <div
      className={cx(styles.item, isDisabled && styles.disabled)}
      onClick={() => (isDisabled ? null : onClick())}
    >
      <Checkbox isActive={isActive} disabled={isDisabled} />
      <span className={styles.name}>{name}</span>
      {ticker && <span className={styles.ticker}>{ticker}</span>}
    </div>
  )
}

export default Item
