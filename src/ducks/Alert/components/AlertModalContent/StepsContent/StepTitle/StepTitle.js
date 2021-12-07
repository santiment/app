import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './StepTitle.module.scss'

function StepTitle ({ iconType, title, description, disabled, className }) {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.iconWrapper, disabled && styles.disabled)}>
        <Icon
          type={iconType}
          className={cx(styles.icon, disabled && styles.disabled)}
        />
      </div>
      <div className={cx(styles.titleWrapper, disabled && styles.disabled)}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  )
}

export default StepTitle
