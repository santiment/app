import React from 'react'
import cx from 'classnames'
import styles from './StepTitle.module.scss'

const StepTitle = ({ title, description, disabled, className, size }) => (
  <div className={cx(styles.wrapper, disabled && styles.disabled, className)}>
    <div className={styles.titleWrapper}>
      <div className={cx(styles.title, size === 's' && styles.smallTitle)}>
        {title}
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  </div>
)

export default StepTitle
