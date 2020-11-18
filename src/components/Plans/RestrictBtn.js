import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import { useUser } from '../../stores/user'
import { PATHS } from '../../paths'
import sharedStyles from './Plans.module.scss'
import styles from './Plan.module.scss'

const getProps = ({
  isLoggedIn,
  label,
  sameAsUserPlan,
  isSubscriptionCanceled
}) => {
  if (!isLoggedIn) {
    return {
      children: label || 'Start free trial',
      as: Link,
      to: PATHS.CREATE_ACCOUNT,
      variant: 'fill'
    }
  }

  return sameAsUserPlan
    ? { children: 'Your current plan', disabled: true }
    : isSubscriptionCanceled
      ? {
        children: 'Upgrade now',
        as: Link,
        to: '/account#subscription?renew'
      }
      : { children: 'Upgrade now', as: Link, to: '/account', variant: 'fill' }
}

const RestrictBtn = ({
  showCreditMsg,
  label,
  sameAsUserPlan,
  isSubscriptionCanceled
}) => {
  const { isLoggedIn } = useUser()
  const props = getProps({
    isLoggedIn,
    label,
    sameAsUserPlan,
    isSubscriptionCanceled
  })

  return (
    <>
      <Button
        fluid
        accent='orange'
        border
        {...props}
        className={cx(sharedStyles.link, styles.restrictBtn)}
      />
      {!isLoggedIn && (
        <div className={styles.noCredit}>
          {!sameAsUserPlan && showCreditMsg ? 'No credit card required' : ' '}
          &nbsp;
        </div>
      )}
    </>
  )
}

export default RestrictBtn
