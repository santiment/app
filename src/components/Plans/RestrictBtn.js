import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './RestrictBtn.module.scss'

const RestrictBtn = ({ sameAsUserPlan, isSubscriptionCanceled }) => {
  const props = sameAsUserPlan
    ? { children: 'Your current plan', disabled: true }
    : isSubscriptionCanceled
      ? { children: 'Upgrade now', as: Link, to: '/account#subscription?renew' }
      : { children: 'Upgrade now', as: Link, to: '/account' }
  return (
    <Button fluid accent='blue' border className={styles.link} {...props} />
  )
}

export default RestrictBtn
