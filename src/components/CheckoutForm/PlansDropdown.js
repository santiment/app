import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './PlansDropdown.module.scss'

// TODO: refactor to be used in general case [@vanguard | March 5, 2020]
const PlansDropdown = ({
  title,
  price,
  billing,
  yearPrice = 0,
  monthPrice = 0,
  onBillingSelect = console.log
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const isYearBilling = billing === 'year'

  useEffect(
    () => {
      if (isOpened) {
        window.addEventListener('click', closeDropdown)

        return () => window.removeEventListener('click', closeDropdown)
      }
    },
    [isOpened]
  )

  function closeDropdown () {
    setIsOpened(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.holder} onClick={() => setIsOpened(true)}>
        <div className={styles.title}>{title}</div>
        <div className={styles.icon}>
          <Icon
            type='arrow-down'
            className={cx(isOpened && styles.icon_active)}
          />
        </div>

        {isOpened && (
          <div className={styles.dropdown}>
            <div
              className={styles.option}
              onClick={() => onBillingSelect('month')}
            >
              Bill monthly -{' '}
              <span className={styles.price}>{monthPrice}/mo</span>
            </div>
            <div
              className={styles.option}
              onClick={() => onBillingSelect('year')}
            >
              Bill yearly - <span className={styles.price}>{yearPrice}/mo</span>
              <span className={cx(styles.save, styles.save_drop)}>
                Save 10% 🎉
              </span>
            </div>
          </div>
        )}
      </div>
      <span className={styles.save}>
        Save 10% {isYearBilling ? '🎉' : 'with yearly billing'}
      </span>
    </div>
  )
}

export default PlansDropdown
