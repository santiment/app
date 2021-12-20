import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './StepTitle.module.scss'

const StepTitle = ({ iconType, title, description, disabled, className }) => (
  <div className={cx(styles.wrapper, disabled && styles.disabled, className)}>
    <div className={styles.iconWrapper}>
      <Icon type={iconType} className={styles.icon} />
    </div>
    <div className={styles.titleWrapper}>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  </div>
)

export default StepTitle
