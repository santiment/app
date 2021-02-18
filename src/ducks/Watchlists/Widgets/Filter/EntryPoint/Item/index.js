import React from 'react'
import cx from 'classnames'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import styles from './index.module.scss'

const Item = ({ name, id, slug, isActive, onClick, isDisabled, ...rest }) => {
  return (
    <div
      className={cx(styles.item, isDisabled && styles.disabled)}
      onClick={() => (isDisabled ? null : onClick())}
    >
      <Checkbox isActive={isActive} disabled={isDisabled} />
      <span className={styles.name}>{name}</span>
    </div>
  )
}

export default Item
