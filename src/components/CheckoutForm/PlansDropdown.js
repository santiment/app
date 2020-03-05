import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { formatOnlyPrice, getYearMonthPrices } from '../../utils/plans'
import styles from './PlansDropdown.module.scss'

// TODO: refactor to be used in general case [@vanguard | March 5, 2020]
const PlansDropdown = ({
  title,
  plan,
  altPlan,
  onBillingSelect = console.log
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const isYearBilling = plan.interval === 'year'

  const [, monthPrice] = getYearMonthPrices(plan.amount, plan.interval)
  const [, altMonthPrice] = getYearMonthPrices(altPlan.amount, altPlan.interval)

  const [monthPlanPrice, yearPlanPrice] = isYearBilling
    ? [altMonthPrice, monthPrice]
    : [monthPrice, altMonthPrice]

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
              <span className={styles.price}>{monthPlanPrice}/mo</span>
            </div>
            <div
              className={styles.option}
              onClick={() => onBillingSelect('year')}
            >
              Bill yearly -{' '}
              <span className={styles.price}>{yearPlanPrice}/mo</span>
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
