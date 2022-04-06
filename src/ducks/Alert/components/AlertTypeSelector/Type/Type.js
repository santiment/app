import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './Type.module.scss'

const Type = ({ iconType, title, description, onClick, isSelected }) => (
  <div className={cx(styles.wrapper, isSelected && styles.selected)} onClick={onClick}>
    <div className={styles.title}>
      <Icon type={iconType} className={styles.icon} />
      {title}
    </div>
    <div className={styles.description}>{description}</div>
  </div>
)

export default Type
