import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './CookieCheckbox.module.scss'

const CookieCheckbox = ({
  title,
  content,
  hideCheckbox = true,
  onChange,
  isActive
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title} onClick={() => setIsOpen(prev => !prev)}>
          <div className={styles.iconWrapper}>
            <Icon
              type='arrow-right-big'
              className={cx(styles.icon, isOpen && styles.openIcon)}
            />
          </div>
          <span>{title}</span>
        </div>
        <div className={styles.checkbox}>
          {hideCheckbox ? (
            'Always Active'
          ) : (
            <Toggle isActive={isActive} onClick={onChange} />
          )}
        </div>
      </div>
      {isOpen && <div className={styles.content}>{content}</div>}
    </div>
  )
}

export default CookieCheckbox
